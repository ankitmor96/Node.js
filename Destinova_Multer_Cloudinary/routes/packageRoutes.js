import express from "express";
import uploads from "../middleware/multer.js";
import packageController from "../controller/packageController.js";

const router = express.Router();

router.post("/add",uploads.single("Images"), packageController.add);

router.get("/getAllPackages", packageController.getAllPackages);

router.get("/getPackagesById/:id", packageController.getPackagesById);

export default router;