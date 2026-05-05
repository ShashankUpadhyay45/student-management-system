const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();

app.use(cors());
app.use(express.json());

// 🔐 LOGIN
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "1234") {
    const token = jwt.sign({ username }, "secretkey", { expiresIn: "1h" });
    return res.json({ token });
  }

  res.status(401).json({ message: "Invalid credentials" });
});

// ROUTES
const studentRoutes = require("./routes/studentRoutes");
app.use("/api/students", studentRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));