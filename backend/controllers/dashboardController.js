const Resume = require("../models/Resume");
const InterviewResult = require("../models/InterviewResult");

exports.getDashboardData = async (req, res) => {

  try {

    const resumes = await Resume.find({
      userId: req.user.id
    }).sort({ createdAt: -1 });

    const interviews = await InterviewResult.find({
      userId: req.user.id
    }).sort({ createdAt: -1 });

    const latestResume = resumes[0];
    const latestInterview = interviews[0];

    res.json({
      latestResume,
      latestInterview,
      resumeCount: resumes.length,
      interviewCount: interviews.length
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};