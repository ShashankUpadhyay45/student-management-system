const model = require("../models/studentModel");

exports.getStudents = (req, res) => {
  model.getAllStudents((err, data) => {
    if (err) return res.status(500).send(err);
    res.json(data);
  });
};

exports.createStudent = (req, res) => {
  const { name, email, age } = req.body;

  if (!name || !email || !age)
    return res.status(400).json({ message: "All fields required" });

  model.addStudent(req.body, (err) => {
    if (err) return res.status(500).send(err);
    res.json({ message: "Added" });
  });
};

exports.updateStudent = (req, res) => {
  model.updateStudent(req.params.id, req.body, (err) => {
    if (err) return res.status(500).send(err);
    res.json({ message: "Updated" });
  });
};

exports.deleteStudent = (req, res) => {
  model.deleteStudent(req.params.id, (err) => {
    if (err) return res.status(500).send(err);
    res.json({ message: "Deleted" });
  });
};