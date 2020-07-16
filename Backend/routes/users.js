var express = require("express");
var router = express.Router();
let userCtrl = require("../controllers/user");
let auth = require("../middleware/auth");
/* GET users listing. */
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.post("/refresh_token", userCtrl.refreshToken);
router.post("/logout", userCtrl.logOut);

module.exports = router;
