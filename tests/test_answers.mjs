globalThis.localStorage = { getItem: () => null, setItem: () => {} };

async function main() {
  const { INITIAL_SINGULARITIES } = await import('../docs/js/constants.js');
  const { ClientEmbedder } = await import('../docs/js/embedder.js');
  const { GravitationalEngine } = await import('../docs/js/physics.js');
  const { ModelResponseGenerator } = await import('../docs/js/generator.js');

  const engine = new GravitationalEngine(new ClientEmbedder(128, 42));
  engine.setSingularities(INITIAL_SINGULARITIES);
  const generator = new ModelResponseGenerator();

  async function test(p) {
    const evalResult = engine.evaluatePrompt(p);
    console.log('\n========================================');
    console.log('QUERY:', p);
    console.log('PRIMARY:', evalResult.primary.singularity.name, `(${evalResult.primary.sharePercent.toFixed(1)}%)`);
    let res = '';
    await new Promise(resolve => {
      generator.generateResponse(evalResult, chunk => { res = chunk; }, resolve);
    });
    console.log('GENERATED RESPONSE:\n' + res);
  }

  await test('square root of 49 is what?');
  await test('what is 25 percent of 800');
  await test('who was lord rams wife?');
  await test('how many talukas are there in the state of GOA');
  await test('write me a code to find prime number');
  await test('how to center a div in css');
  await test('write a poem about thunderstorms');
}
main();
