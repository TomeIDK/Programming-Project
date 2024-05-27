const express = require('express');
const router = express.Router();

// middleware specific to this router

// define the home page route
router.get('/', (req, res) => {
    res.render("info");
});

module.exports = router;
