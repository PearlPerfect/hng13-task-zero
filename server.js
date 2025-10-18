const express = require("express")
const axios = require("axios")
require('dotenv').config();

app = express();
PORT = process.env.PORT

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/me', async (req, res) => {
    try{
const timestamp = new Date().toISOString();

 let catFact;
    try {
      const response = await axios.get('https://catfact.ninja/fact', {
        timeout: 5000
      });
      catFact = response.data.fact;
    } catch (error) {
      catFact = "Cats sleep for 70% of their lives. (Fallback fact)";
    }

     const responseData = {
      status: "success",
      user: {
        email: process.env.USER_EMAIL,
        name: process.env.USER_NAME,
        stack: process.env.USER_STACK
      },
      timestamp: timestamp,
      fact: catFact
    };
    res.json(responseData);
    }
    catch(error){
res.status(500).json({
      status: "error",
      message: "Something went wrong"
    });
    }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Test your endpoint: http://localhost:${PORT}/me`);
});