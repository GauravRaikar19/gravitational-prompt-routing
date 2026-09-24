import http.server
import socketserver
import urllib.request
import urllib.error
import json
import sys
import os

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
DOCS_DIR = os.path.abspath("docs")

def load_env():
    env_path = os.path.join(os.path.dirname(__file__), ".env")
    if os.path.exists(env_path):
        with open(env_path, "r", encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith("#") and "=" in line:
                    k, v = line.split("=", 1)
                    os.environ[k.strip()] = v.strip()

load_env()

class ProxyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DOCS_DIR, **kwargs)

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "*")
        self.end_headers()

    def do_GET(self):
        if self.path.startswith("/api/config"):
            self.send_response(200)
            self.send_header("Access-Control-Allow-Origin", "*")
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            payload = {
                "key": os.environ.get("GROQ_API_KEY", ""),
                "model": "openai/gpt-oss-120b"
            }
            self.wfile.write(json.dumps(payload).encode("utf-8"))
        else:
            super().do_GET()

    def do_POST(self):
        if self.path.startswith("/api/proxy"):
            # Proxy request to Groq / target API to bypass browser CORS
            content_length = int(self.headers.get("Content-Length", 0))
            body = self.rfile.read(content_length)

            auth_header = self.headers.get("Authorization", "")
            if not auth_header or len(auth_header.strip()) < 15 or "undefined" in auth_header:
                default_key = os.environ.get("GROQ_API_KEY", "")
                if default_key:
                    auth_header = f"Bearer {default_key}"

            target_url = self.headers.get("X-Target-URL", "https://api.groq.com/openai/v1/chat/completions")

            req = urllib.request.Request(
                target_url,
                data=body,
                headers={
                    "Content-Type": "application/json",
                    "Authorization": auth_header,
                    "User-Agent": "GPR-Proxy/1.0"
                },
                method="POST"
            )

            try:
                with urllib.request.urlopen(req) as response:
                    self.send_response(response.status)
                    self.send_header("Access-Control-Allow-Origin", "*")
                    self.send_header("Content-Type", response.headers.get("Content-Type", "text/event-stream"))
                    self.end_headers()

                    # Stream bytes back to client
                    while True:
                        chunk = response.read(1024)
                        if not chunk:
                            break
                        self.wfile.write(chunk)
                        self.wfile.flush()
            except urllib.error.HTTPError as e:
                err_data = e.read()
                self.send_response(e.code)
                self.send_header("Access-Control-Allow-Origin", "*")
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(err_data)
            except Exception as e:
                self.send_response(500)
                self.send_header("Access-Control-Allow-Origin", "*")
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps({"error": {"message": str(e)}}).encode("utf-8"))
        else:
            super().do_POST()

if __name__ == "__main__":
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), ProxyHTTPRequestHandler) as httpd:
        print(f"GPR Server & CORS Proxy running at http://localhost:{PORT}")
        httpd.serve_forever()
