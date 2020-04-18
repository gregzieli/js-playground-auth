import { User } from "../models";

const getUserById = async (id) => {
    const user = await User.findById(id).select("-password");
    return user;
};

const getUser = async (email) => {
    const user = await User.findOne({ email });
    return user;
};

const saveUser = async (name, email, password) => {
    const user = new User({ name, email });
    await user.encryptPassword(password);
    return await user.save();
};

export { getUserById, getUser, saveUser };
