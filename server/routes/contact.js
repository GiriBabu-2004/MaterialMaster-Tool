const express = require("express");
const router = express.Router();
const { sendContactForm } = require("../controllers/contactController");

router.post("/send", sendContactForm);

module.exports = router;
