import { Router } from "express";
import auth from "../middleware/auth";

const router = Router();

router.get("/", (req, res) => {
    res.json({ msg: "Entered without auth" });
});

router.post("/", auth, (req, res) => {
    res.json({ msg: `${req.user} entered with auth` });
});

export default router;
