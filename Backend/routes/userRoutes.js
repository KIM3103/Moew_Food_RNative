const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const upload = require("../middlewares/multerConfig");

router.get("/:userId", userController.getUserProfile);
router.put("/:userId", upload.single("avatar"), userController.updateUserProfile);

module.exports = router;
