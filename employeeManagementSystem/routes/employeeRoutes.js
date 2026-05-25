import express from 'express';
import employeeController from "../controller/employeeController.js";

const router = express.Router();

router.post("/add", employeeController.add);

router.get("/getAllEmployee", employeeController.getAllEmployee);

router.delete("/deleteAllEmployee",employeeController.deleteAllEmployee);

router.get("/:id",employeeController.getEmployeeById);

router.delete("/:id",employeeController.deleteEmployee);

// router.patch("/:id",employeeController.updateEmployee);

router.patch("/:id",employeeController.updateEmployeeManually);

export default router;