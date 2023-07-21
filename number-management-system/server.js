const express = require('express');
const axios = require('axios');
const querystring = require('querystring')
const cors =require('cors')

const app = express();

const port = process.env.PORT || 5000;
app.use(cors({ origin: 'http://localhost:3000' }));


app.get('/numbers', async (req, res) => {
    const urls = req.query.url;

  if (!urls) {
    return res.status(400).json({ error: 'Missing URL parameter.' });
  }

  const urlList = Array.isArray(urls) ? urls : [urls];
  const validURLs = [];

  for (const url of urlList) {
    try {
      const response = await axios.get(url);
      const { numbers } = response.data;
      if (Array.isArray(numbers)) {
        validURLs.push({ url, numbers });
      }
    } catch (error) {
      
    }
  }

  res.json(validURLs);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
