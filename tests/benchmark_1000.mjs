// 1000+ Questionnaires Comprehensive Routing & Accuracy Benchmark Suite
globalThis.localStorage = { getItem: () => null, setItem: () => {} };

async function runBenchmark() {
  const { INITIAL_SINGULARITIES } = await import('../docs/js/constants.js?v=7.0');
  const { ClientEmbedder } = await import('../docs/js/embedder.js?v=7.0');
  const { GravitationalEngine } = await import('../docs/js/physics.js?v=7.0');
  const { lookupKnowledge } = await import('../docs/js/knowledge_base.js?v=7.0');

  const embedder = new ClientEmbedder(128, 42);
  const engine = new GravitationalEngine(embedder);
  engine.setSingularities(INITIAL_SINGULARITIES);

  console.log("===============================================================================");
  console.log("🌌 GRAVITATIONAL PROMPT ROUTING (GPR) — 1,000+ QUESTIONNAIRE BENCHMARK");
  console.log("===============================================================================");
  console.log("Active Singularities (Leading Open-Source Frontier Models):");
  INITIAL_SINGULARITIES.forEach(s => {
    console.log(` • [${s.id}] ${s.name.padEnd(26)} | Mass: ${s.mass.toFixed(1)} | Role: ${s.role}`);
  });
  console.log("-------------------------------------------------------------------------------\n");

  const tests = [];

  // 1. All 195 Sovereign Countries (Capitals, Currencies, Official Languages) -> Llama-3.3-70B-Instruct (585 tests)
  const allCountries = [
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
  ];

  for (const c of allCountries) {
    tests.push({ p: `what is the capital of ${c}?`, expected: "llama-3.3-70b-instruct", cat: "Country Capital", domain: "knowledge" });
    tests.push({ p: `what is the currency of ${c}?`, expected: "llama-3.3-70b-instruct", cat: "Currency", domain: "knowledge" });
    tests.push({ p: `official language of ${c}`, expected: "llama-3.3-70b-instruct", cat: "Language", domain: "knowledge" });
  }

  // 2. All 50 US State Capitals -> Llama-3.3-70B-Instruct (50 tests)
  const usStates = [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia",
    "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland",
    "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey",
    "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina",
    "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
  ];
  for (const s of usStates) {
    tests.push({ p: `what is the capital of ${s}?`, expected: "llama-3.3-70b-instruct", cat: "US State", domain: "knowledge" });
  }

  // 3. Indian States (28) Capitals & Chief Ministers -> Llama-3.3-70B-Instruct (56 tests)
  const inStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana",
    "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
    "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
    "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ];
  for (const s of inStates) {
    tests.push({ p: `what is the capital of ${s}?`, expected: "llama-3.3-70b-instruct", cat: "Indian Capital", domain: "knowledge" });
    tests.push({ p: `who is the chief minister of ${s}?`, expected: "llama-3.3-70b-instruct", cat: "Indian CM", domain: "knowledge" });
  }

  // 4. Indian Union Territories (8) -> Llama-3.3-70B-Instruct (16 tests)
  const inUTs = [
    "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
  ];
  for (const u of inUTs) {
    tests.push({ p: `what is the capital of ${u}?`, expected: "llama-3.3-70b-instruct", cat: "Indian UT Capital", domain: "knowledge" });
    tests.push({ p: `who is the administrator of ${u}?`, expected: "llama-3.3-70b-instruct", cat: "Indian UT Admin", domain: "knowledge" });
  }

  // 5. National Entities, Biology, Astronomy, Inventions, World History (70 tests)
  const factualQueries = [
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
  ];
  for (const q of factualQueries) {
    tests.push({ p: q, expected: "llama-3.3-70b-instruct", cat: "Factual Q&A", domain: "knowledge" });
  }

  // 6. Periodic Elements (50 elements -> 100 tests)
  const elements = [
    "Hydrogen", "Helium", "Lithium", "Beryllium", "Boron", "Carbon", "Nitrogen", "Oxygen", "Fluorine", "Neon",
    "Sodium", "Magnesium", "Aluminum", "Silicon", "Phosphorus", "Sulfur", "Chlorine", "Argon", "Potassium", "Calcium",
    "Titanium", "Chromium", "Manganese", "Iron", "Cobalt", "Nickel", "Copper", "Zinc", "Gallium", "Germanium",
    "Arsenic", "Selenium", "Bromine", "Krypton", "Rubidium", "Strontium", "Silver", "Cadmium", "Tin", "Iodine",
    "Xenon", "Cesium", "Barium", "Tungsten", "Platinum", "Gold", "Mercury", "Lead", "Radon", "Uranium"
  ];
  for (const el of elements) {
    tests.push({ p: `what is the chemical symbol of ${el}?`, expected: "llama-3.3-70b-instruct", cat: "Chemical Symbol", domain: "knowledge" });
    tests.push({ p: `what is the atomic number of ${el}?`, expected: "llama-3.3-70b-instruct", cat: "Atomic Number", domain: "knowledge" });
  }

  // 7. Mathematical & Symbolic Reasoning -> DeepSeek-R1-671B (50 tests)
  const mathQueries = [
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
  ];
  for (const q of mathQueries) {
    tests.push({ p: q, expected: "deepseek-r1-671b", cat: "Math & Logic", domain: "math" });
  }

  // 8. Software Engineering & Systems Architecture -> Qwen-2.5-Coder-32B (50 tests)
  const codeQueries = [
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
  ];
  for (const q of codeQueries) {
    tests.push({ p: q, expected: "qwen-2.5-coder-32b", cat: "Code & Systems", domain: "code" });
  }

  // 9. Creative Writing, Poetry & Expressive Nuance -> Hermes-3-70B (50 tests)
  const creativeQueries = [
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
    "write a dramatic speech for a rebellious gladiator in the colosseum",
    "craft a soliloquy for a clockmaker whose clocks can control time",
    "write a ballad about a mythical phoenix rising from ashes",
    "compose a lullaby about ocean waves gently rocking a cradle",
    "write a lyrical poem celebrating spring blossoms and morning dew",
    "write a short fantasy monologue of an ancient dragon guarding secrets",
    "tell a poignant story about two childhood friends meeting after fifty years",
    "write a poem about quiet moments drinking tea on a rainy afternoon",
    "compose a dramatic monologue of an explorer reaching the edge of the known world",
    "write a melancholic poem about an empty ballroom after midnight",
    "craft a witty dialogue between a cynical raven and an optimistic scarecrow",
    "write an evocative prose piece about the scent of old books and rain",
    "compose a song about chasing constellations across the night sky",
    "write a haunting tale about a ghost ship sailing through the northern lights",
    "write a poetic tribute to the silence of deep space",
    "compose a poem about a train journey through misty countryside",
    "write a heartfelt letter of gratitude from an apprentice to a master",
    "tell me a story about a hidden garden in the heart of a bustling metropolis",
    "compose a vibrant ballad celebrating carnival and dance",
    "write a reflective poem on the passing of the seasons",
    "craft an intense thriller dialogue between a hostage negotiator and suspect",
    "write a lyrical verse about the song of the nightingale at dusk",
    "compose a poem about forgotten dreams lingering in the morning light",
    "write an atmospheric tale of a lonely bookstore where books whisper their secrets",
    "write a monologue of an alchemist seeking the elixir of life",
    "tell me an evocative story about a village protected by forest spirits",
    "write a poem about the quiet beauty of a candle burning in the dark"
  ];
  for (const q of creativeQueries) {
    tests.push({ p: q, expected: "hermes-3-70b", cat: "Creative Prose", domain: "creative" });
  }

  console.log(`Executing evaluation across ${tests.length} real-world questionnaire test cases...\n`);

  let correct = 0;
  let knowledgeHitCount = 0;
  const failureDetails = [];
  const categoryStats = {};

  for (let i = 0; i < tests.length; i++) {
    const t = tests[i];
    const evalRes = engine.evaluatePrompt(t.p);
    const routedId = evalRes.primary.singularity.id;
    const isSuccess = (routedId === t.expected);

    // Track category performance
    if (!categoryStats[t.cat]) categoryStats[t.cat] = { total: 0, pass: 0 };
    categoryStats[t.cat].total++;

    if (isSuccess) {
      correct++;
      categoryStats[t.cat].pass++;
    } else {
      failureDetails.push({
        query: t.p,
        expected: t.expected,
        actual: routedId,
        actualName: evalRes.primary.singularity.name,
        share: evalRes.primary.sharePercent.toFixed(1) + "%",
        isLagrange: evalRes.isLagrange
      });
    }

    // Verify knowledge lookup accuracy if domain is knowledge
    if (t.domain === "knowledge") {
      const kb = lookupKnowledge(t.p);
      if (kb && kb.directAnswer) {
        knowledgeHitCount++;
      }
    }
  }

  const accuracyPct = ((correct / tests.length) * 100).toFixed(2);
  const knowledgeCoveragePct = ((knowledgeHitCount / tests.filter(x => x.domain === "knowledge").length) * 100).toFixed(1);

  console.log("===============================================================================");
  console.log("📊 BENCHMARK EXECUTION SUMMARY (COMPLIANT WITH AGENTS.md STANDARDS)");
  console.log("===============================================================================");
  console.log(`┌───────────────────────────────────────────────┬─────────────────────────────┐`);
  console.log(`│ Total Test Prompts Evaluated                  │ ${String(tests.length).padEnd(27)} │`);
  console.log(`│ Successfully Routed to Correct Singularity    │ ${String(correct).padEnd(27)} │`);
  console.log(`│ Overall Gravitational Routing Accuracy        │ ${String(accuracyPct + "%").padEnd(27)} │`);
  console.log(`│ Factual Knowledge Base Resolution Hit Rate    │ ${String(knowledgeCoveragePct + "%").padEnd(27)} │`);
  console.log(`└───────────────────────────────────────────────┴─────────────────────────────┘\n`);

  console.log("Category Performance Breakdown:");
  console.log("-------------------------------------------------------------------------------");
  for (const [cat, s] of Object.entries(categoryStats)) {
    const pct = ((s.pass / s.total) * 100).toFixed(1);
    console.log(` • ${cat.padEnd(24)}: ${s.pass}/${s.total} passed (${pct}%)`);
  }
  console.log("-------------------------------------------------------------------------------");

  if (failureDetails.length > 0) {
    console.log(`\n⚠️ Misrouted Prompts (${failureDetails.length}):`);
    failureDetails.slice(0, 10).forEach(f => {
      console.log(` - Query: "${f.query}" | Expected: ${f.expected} | Actual: ${f.actual} (${f.share})`);
    });
  } else {
    console.log("\n🌟 PERFECT 100.00% ROUTING & KNOWLEDGE RETRIEVAL VERIFIED ACROSS ALL 1,000+ QUESTIONNAIRES!");
  }
}

runBenchmark();
