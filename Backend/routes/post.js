var express = require("express");
var router = express.Router();
let auth = require("../middleware/auth");
let postCtrl = require("../controllers/post");
/* GET users listing. */
router.use(auth);
router.get("/user/:userid", postCtrl.postUser);
router.post("/", postCtrl.create);
router.get("/:id", postCtrl.getOne);
router.get("/", postCtrl.getAll);
router.put("/:id", postCtrl.modify);
router.delete("/:id", postCtrl.delete);
router.post("/:id/like", postCtrl.manageLike);
router.get("/disliked/:userId", postCtrl.getDisliked);
router.get("/liked/:userId", postCtrl.getLiked);

module.exports = router;
