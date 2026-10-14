import { Router } from "express";
import * as leads from "../../controllers/V1/index";

const router = Router();
router.post("/leads", leads.createLeadController);
router.get("/leads", leads.getAllLeadsController);
router.get("/leads/:leadId", leads.getLeadController);
router.patch("/leads/:leadId", leads.updateLeadController);
router.delete("/leads/:leadId", leads.deleteLeadController);

export default router;
