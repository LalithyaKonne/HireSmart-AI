const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const dashboardRoutes =
require("./routes/dashboardRoutes");
const resumeRoutes =
require("./routes/resumeRoutes");
const interviewRoutes =
require("./routes/interviewRoutes");

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use(
  "/api/dashboard",
  dashboardRoutes
);
app.use(
  "/api/resume",
  resumeRoutes
);
app.use(
  "/api/interview",
  interviewRoutes
);


app.get("/", (req, res) => {
  res.send("HireSmart AI Backend Running");
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => {
      console.log(`Server Running on ${PORT}`);
    });
  })
  .catch((err) => console.log(err));