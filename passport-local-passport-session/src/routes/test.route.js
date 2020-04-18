import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.json({ msg: "Entered without auth" });
});

router.post("/", isLoggedIn, (req, res) => {
    return res.json({ msg: "Entered with auth" });
});

function isLoggedIn(req, res, next) {
    // TODO: move this middleware to custom module obv
    if (req.isAuthenticated()) {
        return next();
    }

    res.send(
        "Session authorization required. This would normally be a redirect to login page."
    );
}

export default router;
