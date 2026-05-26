const express =
require("express");

const router =
express.Router();

const protect =
require("../middleware/authMiddleware");

const {
  getQuestions,
  submitInterview
} =
require("../controllers/interviewController");

router.get(
  "/questions/:role",
  protect,
  getQuestions
);

router.post(
  "/submit",
  protect,
  submitInterview
);

module.exports =
router;