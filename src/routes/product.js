const express = require("express");
const router = express.Router();
const path = require("path");

// middleware specific to this router

// define the home page route
router.get("/:productID", (req, res) => {
  const productID = req.params.productID;
  res.render("product", { productID });
});

module.exports = router;
