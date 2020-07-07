var express = require("express");
var router = express.Router();
let User = require("../models/user");
let Post = require("../models/post");
let userCtrl = require("../controllers/user");
/* GET users listing. */
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);

module.exports = router;
