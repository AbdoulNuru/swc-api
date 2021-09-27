import { Router } from "express";
import auth from "./auth.routes";

const router = Router();

// endpoints routes
router.use(auth);

export default router;
