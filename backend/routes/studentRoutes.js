const express = require("express");
const router = express.Router();
const controller = require("../controllers/studentController");
const auth = require("../middleware/auth");

router.get("/", auth, controller.getStudents);
router.post("/", auth, controller.createStudent);
router.put("/:id", auth, controller.updateStudent);
router.delete("/:id", auth, controller.deleteStudent);

module.exports = router;