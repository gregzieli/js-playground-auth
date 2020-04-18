import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

import { User } from "../models";

const verifyLogin = async (email, password, done) => {
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return done(null, false, { message: "Incorrect email." });
        }

        if (!(await user.verifyPassword(password))) {
            return done(null, false, { message: "Incorrect password." });
        }

        return done(null, user);
    } catch (error) {
        done(error);
    }
};

const verifySignUp = async (req, email, password, done) => {
    try {
        const dbUser = await User.findOne({ email });

        if (dbUser) {
            return done(null, false, { msg: "User already exists." });
        }

        const user = new User({ name: req.body.name, email });
        await user.encryptPassword(password);
        await user.save();

        return done(null, user);
    } catch (error) {
        done(error);
    }
};

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (error, user) => done(error, user));
});

passport.use(
    "local-login",
    new LocalStrategy({ usernameField: "email" }, verifyLogin)
);

passport.use(
    "local-signup",
    new LocalStrategy(
        { usernameField: "email", passReqToCallback: true },
        (req, email, password, done) => {
            process.nextTick(
                async () => await verifySignUp(req, email, password, done)
            );
        }
    )
);

export default passport;
