const db = require("../config/db");

exports.getAllStudents = (cb) => {
  db.query("SELECT * FROM students", cb);
};

exports.addStudent = (student, cb) => {
  db.query(
    "INSERT INTO students (name, email, age) VALUES (?, ?, ?)",
    [student.name, student.email, student.age],
    cb
  );
};

exports.updateStudent = (id, student, cb) => {
  db.query(
    "UPDATE students SET name=?, email=?, age=? WHERE id=?",
    [student.name, student.email, student.age, id],
    cb
  );
};

exports.deleteStudent = (id, cb) => {
  db.query("DELETE FROM students WHERE id=?", [id], cb);
};