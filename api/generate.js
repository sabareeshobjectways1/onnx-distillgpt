import { pipeline } from '@xenova/transformers';

let generator;

export default async function handler(req, res) {
  const prompt = req.query.prompt || 'Hello, world!';

  try {
    if (!generator) {
      generator = await pipeline('text-generation', 'Xenova/distilgpt2');
    }

    const output = await generator(prompt, {
      max_new_tokens: 50,
      do_sample: true,
      temperature: 0.7,
    });

    res.status(200).json({ result: output[0].generated_text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate text' });
  }
}
