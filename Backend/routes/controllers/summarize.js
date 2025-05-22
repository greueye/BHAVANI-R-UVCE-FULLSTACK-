const { Configuration, OpenAIApi } = require('openai');
const axios = require('axios');
const Todo = require('../models/todo');
const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// @route   POST api/summarize
// @desc    Summarize todos and send to Slack
exports.summarizeTodos = async (req, res) => {
  try {
    // Get pending todos
  const todos = await Todo.find({ completed: false });
    
    if (todos.length === 0) {
      return res.status(400).json({ msg: 'No pending todos to summarize' });
    }

    // Prepare text for LLM
    const todoTexts = todos.map(todo => `- ${todo.text}`).join('\n');
    const prompt = `Summarize the following to-do items into a concise, motivational paragraph:\n\n${todoTexts}`;

    // Call OpenAI API
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0.7,
      max_tokens: 150,
    });

    const summary = response.data.choices[0].text.trim();

    // Send to Slack
    await axios.post(slackWebhookUrl, {
      text: `*To-Do Summary*\n${summary}`
    });

    res.json({ msg: 'Summary sent to Slack successfully', summary });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
