import { pipeline } from '@xenova/transformers';

// Cache the generator pipeline across invocations
let generator;

export default async function handler(req, res) {
  const prompt = req.query.prompt || 'Hello, world!';

  try {
    // Load the model only once (cold start)
    if (!generator) {
      generator = await pipeline('text-generation', 'Xenova/gpt2-medium');
    }

    // Generate text
    const output = await generator(prompt, {
      max_new_tokens: 50,
      do_sample: true,
      temperature: 0.7,
    });

    // Return the generated result
    res.status(200).json({ result: output[0].generated_text });
  } catch (err) {
    console.error('Text generation error:', err);
    res.status(500).json({ error: 'Failed to generate text' });
  }
}
