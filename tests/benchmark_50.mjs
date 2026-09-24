// 50-Prompt Comprehensive Routing Benchmark Suite
globalThis.localStorage = { getItem: () => null, setItem: () => {} };

import('../docs/js/constants.js?v=6.5').then(async c => {
  const { ClientEmbedder } = await import('../docs/js/embedder.js?v=6.5');
  const { GravitationalEngine } = await import('../docs/js/physics.js?v=6.5');

  const engine = new GravitationalEngine(new ClientEmbedder(128, 42));
  engine.setSingularities(c.INITIAL_SINGULARITIES);

  const testSuite = [
    // 1. Math & Theoretical Physics (Target: omnireasoner-405b)
    { p: "square root of 49 is what?", expected: "omnireasoner-405b", category: "Math" },
    { p: "solve 3x + 12 = 45 for x", expected: "omnireasoner-405b", category: "Math" },
    { p: "what is 25 percent of 800?", expected: "omnireasoner-405b", category: "Math" },
    { p: "derive the quadratic formula from ax^2 + bx + c = 0", expected: "omnireasoner-405b", category: "Math" },
    { p: "calculate the derivative of sin(x) * e^x", expected: "omnireasoner-405b", category: "Math" },
    { p: "what is the integral of 1/x dx?", expected: "omnireasoner-405b", category: "Math" },
    { p: "prove by induction that sum of first n integers is n(n+1)/2", expected: "omnireasoner-405b", category: "Math" },
    { p: "calculate the probability of rolling two sixes on fair dice", expected: "omnireasoner-405b", category: "Math" },
    { p: "what is the speed of light in vacuum in m/s?", expected: "omnireasoner-405b", category: "Physics" },
    { p: "explain Heisenberg uncertainty principle and Planck constant", expected: "omnireasoner-405b", category: "Physics" },
    { p: "calculate 15 percent tip on a 120 dollar restaurant bill", expected: "omnireasoner-405b", category: "Math" },
    { p: "what is the hypotenuse of a right triangle with legs 3 and 4?", expected: "omnireasoner-405b", category: "Math" },
    { p: "what is the area of a circle with radius 7 meters?", expected: "omnireasoner-405b", category: "Math" },

    // 2. Software Engineering & Systems (Target: deepcoder-70b)
    { p: "write a python function to reverse a linked list", expected: "deepcoder-70b", category: "Code" },
    { p: "how to fix TypeError: cannot read properties of undefined in javascript", expected: "deepcoder-70b", category: "Code" },
    { p: "write a sql query to find the second highest salary", expected: "deepcoder-70b", category: "Code" },
    { p: "implement binary search algorithm in C++", expected: "deepcoder-70b", category: "Code" },
    { p: "how does async await work in Node.js event loop?", expected: "deepcoder-70b", category: "Code" },
    { p: "write a Dockerfile for a FastAPI python application", expected: "deepcoder-70b", category: "Code" },
    { p: "optimize this postgresql index for query latency", expected: "deepcoder-70b", category: "Code" },
    { p: "implement lock-free atomic queue in Rust", expected: "deepcoder-70b", category: "Code" },
    { p: "how to configure kubernetes ingress controller with nginx", expected: "deepcoder-70b", category: "Code" },
    { p: "write a bash script to backup directory to s3", expected: "deepcoder-70b", category: "Code" },
    { p: "write a git command to undo the last local commit", expected: "deepcoder-70b", category: "Code" },
    { p: "how do I center a div using CSS flexbox?", expected: "deepcoder-70b", category: "Code" },
    { p: "how to sort an array of objects by date in javascript", expected: "deepcoder-70b", category: "Code" },

    // 3. World Knowledge & General QA (Target: atlas-omni-70b)
    { p: "who is the chief minister of goa?", expected: "atlas-omni-70b", category: "Knowledge" },
    { p: "who was lord rams wife?", expected: "atlas-omni-70b", category: "Knowledge" },
    { p: "how many medals did india win in asian games latest edition", expected: "atlas-omni-70b", category: "Knowledge" },
    { p: "what is the capital of Australia?", expected: "atlas-omni-70b", category: "Knowledge" },
    { p: "who was the first president of the United States?", expected: "atlas-omni-70b", category: "Knowledge" },
    { p: "in what year did World War II end?", expected: "atlas-omni-70b", category: "Knowledge" },
    { p: "what is the largest ocean in the world?", expected: "atlas-omni-70b", category: "Knowledge" },
    { p: "who painted the Mona Lisa?", expected: "atlas-omni-70b", category: "Knowledge" },
    { p: "what is the official currency of Japan?", expected: "atlas-omni-70b", category: "Knowledge" },
    { p: "who founded Microsoft and when was it established?", expected: "atlas-omni-70b", category: "Knowledge" },
    { p: "what is the boiling point of water in fahrenheit and celsius?", expected: "atlas-omni-70b", category: "Knowledge" },
    { p: "how many continents are there on earth?", expected: "atlas-omni-70b", category: "Knowledge" },

    // 4. Creative Prose, Songs, & Literature (Target: hermes-prose-8b)
    { p: "write me a poem about the sea and the stars", expected: "hermes-prose-8b", category: "Creative" },
    { p: "compose lyrics for a melancholic acoustic folk ballad", expected: "hermes-prose-8b", category: "Creative" },
    { p: "tell me a fantasy story about a lost kingdom in the clouds", expected: "hermes-prose-8b", category: "Creative" },
    { p: "write an emotional soliloquy of an old sailor saying goodbye to his ship", expected: "hermes-prose-8b", category: "Creative" },
    { p: "write a bedtime lullaby for a sleeping child", expected: "hermes-prose-8b", category: "Creative" },
    { p: "draft a dramatic noir dialogue between two detectives at midnight", expected: "hermes-prose-8b", category: "Creative" },
    { p: "write a romantic sonnet about autumn leaves falling", expected: "hermes-prose-8b", category: "Creative" },
    { p: "compose a tragic monologue about an artist losing their sight", expected: "hermes-prose-8b", category: "Creative" },
    { p: "write a haiku about morning rain on green tea leaves", expected: "hermes-prose-8b", category: "Creative" },
    { p: "tell an evocative fable about a wolf who loved the moon", expected: "hermes-prose-8b", category: "Creative" },
    { p: "who wrote Romeo and Juliet and Hamlet?", expected: "atlas-omni-70b", category: "Knowledge" },
    { p: "write a sweet birthday greeting card message for my sister", expected: "hermes-prose-8b", category: "Creative" }
  ];

  let correct = 0;
  const failures = [];

  for (const item of testSuite) {
    const res = engine.evaluatePrompt(item.p);
    const actual = res.primary.singularity.id;
    if (actual === item.expected) {
      correct++;
    } else {
      failures.push({
        prompt: item.p,
        category: item.category,
        expected: item.expected,
        actual: actual,
        share: res.primary.sharePercent.toFixed(1) + "%"
      });
    }
  }

  const accuracy = (correct / testSuite.length) * 100;
  console.log("==================================================================");
  console.log("             GPR 50-PROMPT BENCHMARK REPORT                      ");
  console.log("==================================================================");
  console.log(`Total Prompts Evaluated : ${testSuite.length}`);
  console.log(`Correctly Routed        : ${correct}`);
  console.log(`Incorrectly Routed      : ${failures.length}`);
  console.log(`Routing Accuracy Rate   : ${accuracy.toFixed(1)}%`);
  console.log("==================================================================");

  if (failures.length > 0) {
    console.log("\n--- MISROUTED PROMPTS ---");
    failures.forEach((f, idx) => {
      console.log(`[${idx + 1}] "${f.prompt}"`);
      console.log(`    Expected: ${f.expected} | Actual: ${f.actual} (${f.share})\n`);
    });
  }
});
