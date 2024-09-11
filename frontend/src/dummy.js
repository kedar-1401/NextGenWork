const axios = require('axios');

const generateRoadmap = async (studentPrompt) => {
  const response = await axios.post('https://api.openai.com/v1/completions', {
    prompt: studentPrompt,
    max_tokens: 1000,
    model: 'text-davinci-003',
  }, {
    headers: {
      'Authorization': `Bearer YOUR_OPENAI_API_KEY`,
    }
  });

  return response.data.choices[0].text;
};
