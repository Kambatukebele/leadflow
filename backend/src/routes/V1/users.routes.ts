import { Router } from "express";
import * as userController from "../../controllers/V1/index";

const router = Router();
router.post("/users", userController.userCreateController);

export default router;
