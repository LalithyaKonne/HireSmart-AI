const InterviewResult =
require("../models/InterviewResult");

  const questions = {

  Java: [
    "What is Java?",
    "What is JVM?",
    "Difference between JDK and JRE?",
    "What is JIT Compiler?",
    "What is OOP?",
    "Explain Encapsulation.",
    "Explain Inheritance.",
    "Explain Polymorphism.",
    "Explain Abstraction.",
    "What is a Constructor?",
    "Difference between Constructor and Method?",
    "What is Method Overloading?",
    "What is Method Overriding?",
    "What is Exception Handling?",
    "What are Checked and Unchecked Exceptions?",
    "What is Multithreading?",
    "What is Synchronization?",
    "What is Collection Framework?",
    "Difference between ArrayList and LinkedList?",
    "Difference between HashMap and HashSet?",
    "What is JDBC?",
    "What is Spring Boot?",
    "What is Hibernate?",
    "What is Maven?",
    "Difference between == and equals()?"
  ],

  MERN: [
    "What is React?",
    "What is JSX?",
    "What is Virtual DOM?",
    "Difference between Props and State?",
    "What is useState?",
    "What is useEffect?",
    "What are React Hooks?",
    "What is Redux?",
    "What is Context API?",
    "What is Node.js?",
    "What is Express.js?",
    "What is Middleware?",
    "What is JWT?",
    "What is Authentication vs Authorization?",
    "What is MongoDB?",
    "Difference between SQL and MongoDB?",
    "What is Mongoose?",
    "What is REST API?",
    "What is Axios?",
    "What is CORS?",
    "What is CRUD?",
    "What is MVC Architecture?",
    "What is bcrypt?",
    "What is Async/Await?",
    "Explain the MERN Architecture."
  ],

  Frontend: [
    "What is HTML?",
    "What is Semantic HTML?",
    "What is CSS?",
    "What is Flexbox?",
    "What is CSS Grid?",
    "Difference between Inline, Block and Inline-Block?",
    "What is Responsive Design?",
    "What is JavaScript?",
    "Difference between var, let and const?",
    "What is Hoisting?",
    "What is Closure?",
    "What is Event Bubbling?",
    "What is DOM?",
    "What is ES6?",
    "What is Arrow Function?",
    "What is Promise?",
    "What is Async/Await?",
    "What is React?",
    "What is JSX?",
    "What is Virtual DOM?",
    "Difference between Props and State?",
    "What are React Hooks?",
    "What is useState?",
    "What is useEffect?",
    "What is Tailwind CSS?"
  ],

  DSA: [

"What is Time Complexity?",
"What is Space Complexity?",
"Difference between Array and Linked List?",
"What is Binary Search?",
"What is Linear Search?",
"What is Recursion?",
"What is Stack?",
"What is Queue?",
"What is Tree?",
"What is Binary Search Tree?",
"What is Graph?",
"What is BFS?",
"What is DFS?",
"What is Dynamic Programming?",
"What is Greedy Algorithm?",
"What is Hashing?",
"What is Heap?",
"What is Merge Sort?",
"What is Quick Sort?",
"What is Two Pointer Technique?"

],

HR: [

"Tell me about yourself.",

"Why should we hire you?",

"What are your strengths?",

"What are your weaknesses?",

"Why do you want this job?",

"Where do you see yourself in 5 years?",

"What motivates you?",

"Describe a challenge you faced.",

"How do you handle pressure?",

"What are your career goals?",

"Tell me about your final year project.",

"Why should we select you?",

"What is your biggest achievement?",

"Are you willing to relocate?",

"Do you have any questions for us?"

]


};
exports.getQuestions =
(req, res) => {

  const role = req.params.role;

  const shuffled =
    questions[role]
      .sort(() => 0.5 - Math.random())
      .slice(0, 10);

  res.json(shuffled);
};

exports.submitInterview =
async (req, res) => {

  try {

    const {
      role,
      answers
    } = req.body;

    let score = 0;

    answers.forEach(
      answer => {

        if (
          answer.length > 20
        ) {
          score += 10;
        }

      }
    );

    const feedback =
      score > 20
      ? "Good Performance"
      : "Needs Improvement";

    await InterviewResult.create({

      userId:
        req.user.id,

      role,

      score,

      feedback

    });

    res.json({

      score,
      feedback

    });

  } catch (error) {

    res.status(500).json({
      message:
      error.message
    });

  }
};