import { Router } from "express";
import { sendSms } from "../controllers/sms.controller.js";

const router = Router();

router.post("/", sendSms);

export default router;
