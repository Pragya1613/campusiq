const express = require("express");
const router = express.Router();

const { testEmail } = require("../controllers/emailController");

router.get("/test", testEmail);

module.exports = router;