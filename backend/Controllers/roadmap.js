const asyncErrorWrapper = require("express-async-handler")

require('dotenv').config();

const generateRoadmap = asyncErrorWrapper (async  (req,res,next) => {

        const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
    }

    try {
        const response = await axios.post(
        'https://api.openai.com/v1/completions',
        {
            prompt: `Create a personalized roadmap for the domain: ${prompt}`,
            max_tokens: 1000,
            model: 'text-davinci-003',
        },
        {
            headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            },
        }
        );

        const roadmapText = response.data.choices[0].text;
        return res.status(200).json({
            success: true,
            data: roadmapText
    
        })
    } catch (error) {
        console.error('Error generating roadmap:', error);
        res.status(500).json({ error: 'Failed to generate roadmap' });
    }

    })

module.exports ={
    generateRoadmap
}