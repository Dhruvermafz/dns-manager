const express = require("express");
const router = express.Router();
const { login } = require("../controllers/authControllers");
const verifyAccessToken = require("../middlewares/index");
// Routes beginning with /api/auth

router.post("/login", verifyAccessToken, login);

module.exports = router;
