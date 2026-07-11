const Resume = require("../models/Resume");
const pdfParse = require("pdf-parse");
const fs = require("fs");

exports.getResumeHistory =
async (req, res) => {

  try {

    const resumes =
      await Resume.find({

        userId: req.user.id

      })
      .sort({
        createdAt: -1
      });

    res.json(resumes);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

exports.uploadResume =
async (req, res) => {

  try {

    const role =
      req.body.role;

    const dataBuffer =
      fs.readFileSync(
        req.file.path
      );

    const pdfData =
      await pdfParse(
        dataBuffer
      );

    const resumeText =
      pdfData.text.toLowerCase();

    let requiredSkills = [];

    if (role === "MERN") {

      requiredSkills = [

        "react",
        "node",
        "mongodb",
        "express",
        "javascript",
        "jwt",
        "git",
        "github",
        "api",
        "dsa"

      ];

    }

    else if (
      role === "Java"
    ) {

      requiredSkills = [

        "java",
        "spring boot",
        "hibernate",
        "jdbc",
        "mysql",
        "oop",
        "dsa",
        "git",
        "github"

      ];

    }

    else if (
      role === "Fresher"
    ) {

      requiredSkills = [

        "communication",
        "teamwork",
        "problem solving",
        "dsa",
        "java",
        "sql",
        "github",
        "projects",
        "internship",
        "computer networks"

      ];

    }
    else if(role === "DSA") {

 requiredSkills = [
   "dsa",
   "array",
   "linked list",
   "stack",
   "queue",
   "tree",
   "graph",
   "sorting",
   "searching",
   "recursion"
 ];

}
else if(role === "HR") {

 requiredSkills = [
   "communication",
   "leadership",
   "teamwork",
   "presentation",
   "problem solving",
   "project",
   "internship"
 ];

}

    else {

      requiredSkills = [

        "html",
        "css",
        "javascript",
        "react",
        "tailwind",
        "github"

      ];

    }

    const foundSkills = [];

    requiredSkills.forEach(
      (skill) => {

        if (
          resumeText.includes(
            skill
          )
        ) {

          foundSkills.push(
            skill
          );

        }

      }
    );

    const missingSkills =
      requiredSkills.filter(
        skill =>
          !foundSkills.includes(
            skill
          )
      );

    const atsScore =
      Math.round(
        (
          foundSkills.length /
          requiredSkills.length
        ) * 100
      );

    const placementReadiness =
      Math.min(
        100,
        atsScore + 15
      );

    const resumeStrength =
      atsScore >= 85
      ? "Excellent"
      : atsScore >= 70
      ? "Good"
      : atsScore >= 50
      ? "Average"
      : "Needs Improvement";

    const suggestions = [];

    if (
      missingSkills.includes(
        "dsa"
      )
    ) {

      suggestions.push(
        "Practice DSA regularly on LeetCode or HackerRank"
      );

    }

    if (
      missingSkills.includes(
        "github"
      )
    ) {

      suggestions.push(
        "Add GitHub profile link to showcase projects"
      );

    }

    if (
      missingSkills.includes(
        "projects"
      )
    ) {

      suggestions.push(
        "Add 2-3 academic or personal projects"
      );

    }

    if (
      missingSkills.includes(
        "internship"
      )
    ) {

      suggestions.push(
        "Include internship experience if available"
      );

    }

    if (
      missingSkills.includes(
        "sql"
      )
    ) {

      suggestions.push(
        "Improve SQL and Database skills"
      );

    }

    if (
      missingSkills.includes(
        "communication"
      )
    ) {

      suggestions.push(
        "Improve communication and presentation skills"
      );

    }

    if (
      missingSkills.includes(
        "react"
      )
    ) {

      suggestions.push(
        "Learn React and build frontend projects"
      );

    }

    if (
      missingSkills.includes(
        "mongodb"
      )
    ) {

      suggestions.push(
        "Learn MongoDB basics and CRUD operations"
      );

    }

    if (
      suggestions.length === 0
    ) {

      suggestions.push(
        "Excellent Resume. Keep it updated."
      );

    }

    await Resume.create({

      userId:
        req.user.id,

      fileName:
        req.file.filename,

      role,

      atsScore,

      placementReadiness,

      resumeStrength,

      missingSkills,

      suggestions

    });

    res.json({

      success: true,

      atsScore,

      placementReadiness,

      resumeStrength,

      foundSkills,

      missingSkills,

      suggestions

    });

  }

  catch (error) {

    console.log(error);

    res.status(500).json({

      message:
        error.message

    });

  }

};