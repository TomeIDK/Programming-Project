const express = require("express");
const router = express.Router();
const path = require("path");

// middleware specific to this router



// define the home page route
router.get("/", (req, res) => {
    res.render("admin-dashboard", {  });
});

router.get("/dashboard", (req, res) => {
    res.render("admin-dashboard", {  });
});

router.get("/retourbeheer", (req, res) => {
    res.render("admin-retourbeheer", {  });
});

router.get("/retourbeheer/:UitleningID", (req, res) => {
    res.render("admin-retourbeheer-uitlening", {  });
});

module.exports = router;
