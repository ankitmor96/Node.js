import express from "express";

import StudentController from "../controller/StudentController.js";

const router = express.Router();

router.post("/add", StudentController.add);

router.get("/getAllStudents", StudentController.getAllStudentData);

router.delete("/deleteAll", StudentController.deleteAllData);

router.get("/:id", StudentController.getStudentById);

router.delete("/:id", StudentController.deleteStudent);

router.patch("/:id", StudentController.updateDataManually);



export default router;