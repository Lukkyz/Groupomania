var express = require("express");
var router = express.Router();
let commentCtrl = require("../controllers/comment");

router.delete("/:id", commentCtrl.delete);
router.put("/:id", commentCtrl.modify);

module.exports = router;
