"""
Extracts, structures, and expands the 1000+ benchmark dataset into JSON splits for gpr/benchmarks/data.
"""

import json
import os

all_countries = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia",
    "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan",
    "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde",
    "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros",
    "Congo (Democratic Republic of)", "Congo (Republic of)", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic",
    "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea",
    "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany",
    "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary",
    "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan",
    "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia",
    "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta",
    "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro",
    "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger",
    "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea",
    "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis",
    "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia",
    "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia",
    "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland",
    "Syria", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia",
    "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "UAE", "United Kingdom", "United States", "Uruguay",
    "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
]

us_states = [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia",
    "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland",
    "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey",
    "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina",
    "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
]

in_states = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana",
    "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
    "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
    "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
]

in_uts = [
    "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
]

elements = [
    "Hydrogen", "Helium", "Lithium", "Beryllium", "Boron", "Carbon", "Nitrogen", "Oxygen", "Fluorine", "Neon",
    "Sodium", "Magnesium", "Aluminum", "Silicon", "Phosphorus", "Sulfur", "Chlorine", "Argon", "Potassium", "Calcium",
    "Titanium", "Chromium", "Manganese", "Iron", "Cobalt", "Nickel", "Copper", "Zinc", "Gallium", "Germanium",
    "Arsenic", "Selenium", "Bromine", "Krypton", "Rubidium", "Strontium", "Silver", "Cadmium", "Tin", "Iodine",
    "Xenon", "Cesium", "Barium", "Tungsten", "Platinum", "Gold", "Mercury", "Lead", "Radon", "Uranium"
]

factual_queries = [
    "indias national animal", "national bird of india", "national flower of india",
    "national anthem of india", "national song of india", "national tree of india",
    "national animal of usa", "national animal of china", "national animal of australia", "national animal of canada",
    "national animal of united kingdom", "national animal of russia", "national animal of japan",
    "how many talukas are there in the state of GOA", "how many districts in goa",
    "aldona bardez goa history", "panaji capital of goa", "who was lord rams wife",
    "how many bones in the human body", "largest bone in human body", "smallest bone in human body",
    "largest organ in the human body", "powerhouse of the cell", "what does DNA stand for", "universal donor blood group",
    "how many planets in solar system", "what is the hottest planet in solar system",
    "what is the largest planet in solar system", "what is the smallest planet in solar system",
    "what is the speed of light in vacuum", "earth gravitational acceleration",
    "who founded google", "who founded apple", "who founded microsoft", "who founded amazon", "who founded tesla",
    "what is the highest mountain on earth", "what is the longest river in the world",
    "how many continents are there on earth", "how many oceans in the world",
    "who wrote the ramayana", "who wrote the mahabharata", "who wrote hamlet",
    "who wrote gitanjali", "who wrote war and peace", "who wrote the odyssey",
    "when did world war 1 begin", "when did world war 2 end", "when did india get independence",
    "when is republic day of india", "who was the first prime minister of india",
    "who was the first president of india", "who is the father of the indian constitution",
    "who was the first person to walk on the moon", "who was the first human in space",
    "taj mahal agra history", "great wall of china length", "colosseum rome history",
    "eiffel tower height and architect", "great pyramid of giza pharaoh",
    "who invented the telephone", "who invented the light bulb", "who invented the airplane",
    "who invented the world wide web", "who discovered penicillin", "what is the boiling point of water",
    "what connects the suez canal", "what connects the panama canal",
    "what is the nearest galaxy to milky way", "where were 2024 olympic games held",
    "who won 2022 fifa world cup", "who has the most olympic gold medals"
]

math_queries = [
    "square root of 49 is what?", "square root of 144", "square root of 625", "square root of 100", "square root of 81",
    "what is 25 percent of 800", "what is 15 percent of 200", "what is 30 percent of 1500", "what is 20 percent of 500",
    "solve 3x + 12 = 45 for x", "solve 5x - 15 = 35 for x", "solve 2x + 8 = 20 for x", "solve 4x + 20 = 100 for x",
    "what is the area of a circle with radius 7 meters?", "what is the area of a circle with radius 14",
    "what is the hypotenuse of a right triangle with legs 3 and 4?", "hypotenuse with legs 5 and 12", "hypotenuse with legs 8 and 15",
    "derive the quadratic formula from ax^2 + bx + c = 0",
    "calculate the derivative of sin(x) * e^x", "calculate the derivative of ln(x) + x^3",
    "what is the integral of 1/x dx?", "what is the integral of cos(x) dx",
    "prove by induction that sum of first n integers is n(n+1)/2",
    "calculate the probability of rolling two sixes on fair dice",
    "what is the mathematical value of pi", "what is euler constant e approximation",
    "derive the Christoffel symbols and Riemann curvature tensor for a black hole",
    "derive the Euler-Lagrange equations of motion in Hamiltonian mechanics",
    "solve nonlinear differential equations with Navier-Stokes approximations",
    "prove the Riemann hypothesis for non-trivial zeros and analytic continuation",
    "explain Heisenberg uncertainty principle and Planck constant in quantum physics",
    "what is the formula for kinetic energy and potential energy",
    "calculate 15 percent tip on a 120 dollar restaurant bill",
    "calculate standard deviation and variance of a distribution",
    "calculate the eigenvalues of a 2x2 identity matrix",
    "prove that the square root of 2 is an irrational number",
    "derive the Taylor series expansion of e^x at x=0",
    "calculate the dot product of vectors [1, 2, 3] and [4, 5, 6]",
    "what is Bayes theorem and conditional probability formula",
    "solve the system of linear equations 2x + y = 5 and x - y = 1",
    "what is the limit of sin(x)/x as x approaches 0",
    "calculate the volume of a sphere with radius r",
    "explain the divergence theorem and Gauss law in vector calculus",
    "derive the wave equation from Maxwell equations",
    "what is the definition of a compact manifold in topology",
    "prove Fermat little theorem using modular arithmetic",
    "calculate the determinant of a 3x3 matrix",
    "derive the binomial distribution formula from Bernoulli trials",
    "explain entropy and the second law of thermodynamics"
]

code_queries = [
    "write me a code to find prime number", "write python code to check if number is prime",
    "write a python function to reverse a linked list", "how to center a div in css",
    "how do I center a div using CSS flexbox?", "how to fix TypeError: cannot read properties of undefined in javascript",
    "write a sql query to find the second highest salary", "implement binary search algorithm in C++",
    "how does async await work in Node.js event loop?", "write a Dockerfile for a FastAPI python application",
    "optimize this postgresql index for query latency", "implement lock-free atomic queue in Rust",
    "how to configure kubernetes ingress controller with nginx", "write a bash script to backup directory to s3",
    "write a git command to undo the last local commit", "how to sort an array of objects by date in javascript",
    "implement fibonacci sequence using dynamic programming in python",
    "write a rust function for zero allocation ring buffer",
    "implement quicksort algorithm in python with median of three pivot",
    "write a regex to validate email address format",
    "how to implement rate limiting middleware in Express js",
    "implement a thread pool with work stealing deque in C++",
    "write a python script to parse JSON file and aggregate metrics",
    "how to implement debounce and throttle in javascript",
    "explain ACID properties in relational database systems",
    "what is the difference between git merge and git rebase",
    "what is the difference between REST and GraphQL APIs",
    "explain the CSS box model with margin border padding",
    "write a python function to detect cycle in linked list using floyd algorithm",
    "how to resolve cross-origin resource sharing CORS error in fastapi",
    "write a python script to scrape web pages using beautifulsoup",
    "implement a LRU cache in python using OrderedDict",
    "write a SQL query to join orders and customers table",
    "how to implement JWT authentication in Node.js",
    "write a golang program for concurrent web crawler with worker pool",
    "how to prevent SQL injection in backend applications",
    "write a bash script to monitor CPU and memory usage",
    "implement merge sort algorithm in Java",
    "how to use React useEffect hook and avoid infinite loops",
    "write a terraform script to deploy AWS EC2 instance",
    "explain the difference between process and thread in operating systems",
    "write a python function for depth first search DFS on graph",
    "how to configure Redis cache for session storage in Node.js",
    "write a rust program implementing a custom iterator",
    "how to handle database transactions and rollbacks in postgres",
    "write a python decorator to measure function execution time",
    "implement trie data structure for autocomplete in javascript",
    "how to containerize a fullstack application with docker-compose",
    "write a typescript interface for strongly typed API responses",
    "how to optimize webpack bundle size with code splitting"
]

creative_queries = [
    "write a poem about thunderstorms", "write a poem about the sea and the stars",
    "compose a lyrical ballad in iambic pentameter about moonlight reflecting on still water",
    "write me a song about love and heartbreak under the moonlight",
    "craft a tense noir detective dialogue in the pouring midnight rain",
    "narrate an atmospheric fantasy tale of an ancient kingdom fading into myth",
    "write an emotional, melancholic soliloquy of a weary artisan watching time slip away",
    "compose a lullaby for a baby falling asleep under the stars",
    "tell me a story about a dragon who befriends a lonely child",
    "write a haiku about autumn leaves falling on a quiet stream",
    "write a dramatic dialogue between two rival kings before battle",
    "compose a sonnet about eternal love transcending time and space",
    "write a fantasy short story about an enchanted library of forgotten memories",
    "craft an emotional letter from an astronaut gazing at Earth from the void",
    "write a poetic monologue of an old oak tree witnessing centuries of human history",
    "compose an evocative poem about dawn breaking over snow-capped mountains",
    "write a humorous song about a cat that thinks it rules the universe",
    "write a gothic story about a haunted lighthouse on a stormy coast",
    "compose a romantic verse about wandering through Parisian cobblestone alleys",
    "write a monologue for a retired detective reflecting on their hardest unsolved case",
    "write a poem about winter frost creeping over windowpanes",
    "tell me an atmospheric tale of a desert wanderer searching for a lost oasis",
    "compose a song about a wandering musician finding solace in the rain",
    "draft a philosophical dialogue between an immortal philosopher and a child",
    "write a poem capturing the bittersweet feeling of returning to childhood home",
    "compose a heroic ballad about a forgotten knight defending a quiet bridge",
    "tell an emotional story of two estranged friends reuniting after thirty years",
    "write an expressive soliloquy of an orchestra conductor before their final performance",
    "craft a whimsical tale about a teacup that longed to sail the seven seas",
    "write an evocative poem about the constellations dancing across a desert sky",
    "compose a melancholy song about letters never sent and unspoken truths",
    "write a fantasy legend about a weaver who spun threads of golden sunrise",
    "craft a gritty noir detective monologue about a foggy waterfront murder",
    "tell a fable about an ancient owl teaching a young hawk the song of the wind",
    "write a dramatic monologue of a queen facing the downfall of her empire with dignity",
    "compose a folk ballad celebrating the harvest and the changing of seasons",
    "write a poetic description of a thunderstorm awakening a dormant forest",
    "craft a dialogue between two travelers meeting at the edge of the world",
    "write a haunting poem about forgotten footprints on an abandoned beach",
    "tell an evocative fantasy story about a clockmaker who could pause solitary moments",
    "write an emotional letter of gratitude to an old mentor across the sea",
    "compose a lyrical verse about the rhythm of raindrops on a tin roof",
    "draft a mystery dialogue between a vintage bookstore owner and a curious stranger",
    "write a poem about the quiet beauty of twilight settling over a snowy valley",
    "tell an inspiring tale about an apprentice glassblower creating a prism of sunlight",
    "write a melancholic blues song about midnight trains passing through empty stations",
    "craft a monologue of an astronomer discovering a new constellation in deep solitude",
    "write a gentle bedtime story about a sleepy bear and a glowing firefly",
    "compose a celebratory anthem of resilience and triumph against the odds",
    "write a sonnet celebrating the fleeting perfection of a summer sunset"
]

def build_datasets():
    knowledge_list = []
    math_list = []
    code_list = []
    creative_list = []

    # Knowledge
    idx = 1
    for c in all_countries:
        knowledge_list.append({
            "id": f"know-{idx:04d}",
            "prompt": f"what is the capital of {c}?",
            "expected_model": "llama-3.3-70b-instruct",
            "domain": "knowledge",
            "category": "Country Capital",
            "difficulty": "easy"
        })
        idx += 1
        knowledge_list.append({
            "id": f"know-{idx:04d}",
            "prompt": f"what is the currency of {c}?",
            "expected_model": "llama-3.3-70b-instruct",
            "domain": "knowledge",
            "category": "Currency",
            "difficulty": "easy"
        })
        idx += 1
        knowledge_list.append({
            "id": f"know-{idx:04d}",
            "prompt": f"official language of {c}",
            "expected_model": "llama-3.3-70b-instruct",
            "domain": "knowledge",
            "category": "Language",
            "difficulty": "easy"
        })
        idx += 1

    for s in us_states:
        knowledge_list.append({
            "id": f"know-{idx:04d}",
            "prompt": f"what is the capital of {s}?",
            "expected_model": "llama-3.3-70b-instruct",
            "domain": "knowledge",
            "category": "US State Capital",
            "difficulty": "easy"
        })
        idx += 1

    for s in in_states:
        knowledge_list.append({
            "id": f"know-{idx:04d}",
            "prompt": f"what is the capital of {s}?",
            "expected_model": "llama-3.3-70b-instruct",
            "domain": "knowledge",
            "category": "Indian State Capital",
            "difficulty": "easy"
        })
        idx += 1
        knowledge_list.append({
            "id": f"know-{idx:04d}",
            "prompt": f"who is the chief minister of {s}?",
            "expected_model": "llama-3.3-70b-instruct",
            "domain": "knowledge",
            "category": "Indian Chief Minister",
            "difficulty": "easy"
        })
        idx += 1

    for u in in_uts:
        knowledge_list.append({
            "id": f"know-{idx:04d}",
            "prompt": f"what is the capital of {u}?",
            "expected_model": "llama-3.3-70b-instruct",
            "domain": "knowledge",
            "category": "Indian UT",
            "difficulty": "easy"
        })
        idx += 1

    for q in factual_queries:
        knowledge_list.append({
            "id": f"know-{idx:04d}",
            "prompt": q,
            "expected_model": "llama-3.3-70b-instruct",
            "domain": "knowledge",
            "category": "Factual General QA",
            "difficulty": "easy"
        })
        idx += 1

    for el in elements:
        knowledge_list.append({
            "id": f"know-{idx:04d}",
            "prompt": f"what is the chemical symbol of {el}?",
            "expected_model": "llama-3.3-70b-instruct",
            "domain": "knowledge",
            "category": "Chemistry",
            "difficulty": "easy"
        })
        idx += 1
        knowledge_list.append({
            "id": f"know-{idx:04d}",
            "prompt": f"what is the atomic number of {el}?",
            "expected_model": "llama-3.3-70b-instruct",
            "domain": "knowledge",
            "category": "Chemistry",
            "difficulty": "easy"
        })
        idx += 1

    # Math
    m_idx = 1
    for q in math_queries:
        diff = "hard" if any(k in q.lower() for k in ["derive", "prove", "einstein", "christoffel", "riemann", "hamiltonian", "navier-stokes"]) else "medium"
        math_list.append({
            "id": f"math-{m_idx:04d}",
            "prompt": q,
            "expected_model": "deepseek-r1-671b",
            "domain": "math",
            "category": "Math & Reasoning",
            "difficulty": diff
        })
        m_idx += 1

    # Code
    c_idx = 1
    for q in code_queries:
        diff = "hard" if any(k in q.lower() for k in ["lock-free", "concurrency", "thread pool", "kernel", "floyd"]) else "medium"
        code_list.append({
            "id": f"code-{c_idx:04d}",
            "prompt": q,
            "expected_model": "qwen-2.5-coder-32b",
            "domain": "code",
            "category": "Software Engineering",
            "difficulty": diff
        })
        c_idx += 1

    # Creative
    cr_idx = 1
    for q in creative_queries:
        diff = "medium"
        creative_list.append({
            "id": f"creat-{cr_idx:04d}",
            "prompt": q,
            "expected_model": "hermes-3-70b",
            "domain": "creative",
            "category": "Creative Prose & Nuance",
            "difficulty": diff
        })
        cr_idx += 1

    full_list = knowledge_list + math_list + code_list + creative_list

    out_dir = os.path.abspath("gpr/benchmarks/data")
    os.makedirs(out_dir, exist_ok=True)

    with open(os.path.join(out_dir, "world_knowledge.json"), "w", encoding="utf-8") as f:
        json.dump(knowledge_list, f, indent=2)

    with open(os.path.join(out_dir, "math_reasoning.json"), "w", encoding="utf-8") as f:
        json.dump(math_list, f, indent=2)

    with open(os.path.join(out_dir, "code_systems.json"), "w", encoding="utf-8") as f:
        json.dump(code_list, f, indent=2)

    with open(os.path.join(out_dir, "creative_prose.json"), "w", encoding="utf-8") as f:
        json.dump(creative_list, f, indent=2)

    with open(os.path.join(out_dir, "full_benchmark.json"), "w", encoding="utf-8") as f:
        json.dump(full_list, f, indent=2)

    print(f"Generated datasets in {out_dir}:")
    print(f" - world_knowledge.json : {len(knowledge_list)} queries")
    print(f" - math_reasoning.json  : {len(math_list)} queries")
    print(f" - code_systems.json    : {len(code_list)} queries")
    print(f" - creative_prose.json  : {len(creative_list)} queries")
    print(f" - full_benchmark.json  : {len(full_list)} total queries")

if __name__ == "__main__":
    build_datasets()
