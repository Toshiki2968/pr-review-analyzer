const express = require('express');
const { getPRComments } = require('./githubService');
const { classifyComments } = require('./nlpService');
const app = express();

app.get('/api/analyze', async (req, res) => {
  const comments = await getPRComments();
  const result = classifyComments(comments);
  res.json(result);
});

app.listen(3001, () => console.log('Server running on port 3001'));
