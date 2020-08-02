var express = require("express");
var router = express.Router();
let commentCtrl = require("../controllers/comment");
let auth = require("../middleware/auth");

router.use(auth);
router.get("/user/:userid", commentCtrl.commentUser);
router.delete("/:id", commentCtrl.delete);
router.put("/:id", commentCtrl.modify);
router.post("/", commentCtrl.create);
router.get("/", commentCtrl.getAll);

module.exports = router;
