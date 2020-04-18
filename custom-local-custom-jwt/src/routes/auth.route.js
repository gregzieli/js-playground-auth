import { Router } from "express";
import jwt from "jsonwebtoken";

import auth from "../middleware/auth";
import { getUserById, saveUser, getUser } from "../services/user.service";

const createToken = ({ id }) => {
    const token = jwt.sign(
        {
            id,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1h",
        }
    );

    return token;
};

const loginAsync = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ msg: "All fields required" });
    }

    const user = await getUser(email);

    if (!user) {
        return res.status(400).json({ msg: "User does not exist" });
    }

    if (!(await user.validatePassword(password))) {
        return res.status(400).json({ msg: "Invalid credentials" });
    }

    const token = createToken(user);
    return res.json({
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
        },
    });
};

const registerAsync = async (req, res, next) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ msg: "All fields required" });
    }

    if (await getUser(email)) {
        return res.status(400).json({ msg: "User already exists" });
    }

    const user = await saveUser(name, email, password);
    const token = createToken(user);

    return res.json({
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
        },
    });
};

const getUserRoute = async (req, res) => {
    const user = await getUserById(req.user.id);
    return res.json(user);
};

const router = Router();

router.post("/login", loginAsync);
router.post("/register", registerAsync);
router.get("/user", auth, getUserRoute);

export default router;
