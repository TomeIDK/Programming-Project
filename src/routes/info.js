const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

app.get('/info', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'info.html'));
});

