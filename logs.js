const express = require('express');
const app = express();
const port = 3000;

// Middleware to log time for every request
app.use((req, res, next) => {
    const currentTime = new Date().toLocaleString(); // get current time in readable format
    console.log(`Request received at: ${currentTime}`);
    next(); // pass control to the next handler
});
