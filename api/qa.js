import { pipeline } from '@xenova/transformers';

let questionAnswering;

export default async function handler(req, res) {
  const question = req.query.question || 'What is AI?';
  const context = req.query.context || 'Artificial intelligence (AI) is the simulation of human intelligence processes by machines, especially computer systems.';

  try {
    if (!questionAnswering) {
      questionAnswering = await pipeline('question-answering', 'Xenova/distilbert-base-cased-distilled-squad');
    }

    const output = await questionAnswering({ question, context });

    res.status(200).json({ answer: output.answer, score: output.score });
  } catch (err) {
    console.error('QA error:', err.message, err.stack);
    res.status(500).json({ error: 'Failed to answer question', detail: err.message });
  }
}
