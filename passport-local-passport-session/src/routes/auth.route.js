import { Router } from "express";
import passport from "passport";

const router = Router();

router.get("/login", (req, res) => {
    res.json({ msg: "failed to login, this should be a login view" });
});

router.get("/signup", (req, res) => {
    res.json({ msg: "failed to register, this should be a signup view" });
});

router.post(
    "/login",
    passport.authenticate("local-login", {
        failureRedirect: "/api/auth/login",
    }),
    (req, res) => {
        res.send("logged in with passport");
    }
);
router.post(
    "/signup",
    passport.authenticate("local-signup", {
        failureRedirect: "/api/auth/signup",
    }),
    (req, res) => {
        res.send("signed up in with passport");
    }
);

router.post("/signup2", (req, res) => {
    passport.authenticate("local-signup", (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: info ? info.msg : "Login failed",
                user: user,
            });
        }
        return res.json({ user, msg: "signed up in with passport" });
    })(req, res);
});

export default router;
