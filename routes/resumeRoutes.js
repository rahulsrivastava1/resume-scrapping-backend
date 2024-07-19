const express = require("express");
const multer = require("multer");
const { processResume } = require("../controllers/resumeController");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), processResume);

module.exports = router;
