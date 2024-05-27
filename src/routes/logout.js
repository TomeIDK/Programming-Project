const express = require("express");
const router = express.Router();
const path = require("path");

// middleware specific to this router



// define the home page route
router.delete("/", (req, res) => {
    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                res.status(400).send("Kan niet uitloggen");
            } else {
                res.send("Uitloggen succesvol");
            }
        });
    } else {
        res.end();
    }
});

module.exports = router;
