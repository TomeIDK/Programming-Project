const express = require('express');
const router = express.Router();
const path = require('path');

// middleware specific to this router

// define the home page route
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "..", 'public', 'product.html'));
});

module.exports = router;
