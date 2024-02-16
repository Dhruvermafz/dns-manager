const express = require("express");
const router = express.Router();
const { login, signup } = require("../controllers/authControllers");
const verifyAccessToken = require("../middlewares/index");
// Routes beginning with /api/auth
router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
