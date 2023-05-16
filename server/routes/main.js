const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const authenticateToken = require("../middleware/auth");


router.get("/", homeController.getIndex);
router.post("/login", authController.postLogin);
router.get("/getUser", authenticateToken, authController.getUser);
router.post("/signup", authController.postSignup);

module.exports = router;