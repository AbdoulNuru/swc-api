import { Router } from "express";

const router = Router();

router.get("/", (req, res)=>{
    res.status(200).json({
        status: 200,
        message: "You are welcome to Strong Women Corner"
    });
});

export default router