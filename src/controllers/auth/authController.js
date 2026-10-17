import bcrypt from "bcrypt";
import createHttpError from "http-errors";
import { User } from "../../models/user.js";


export const registerUser = async (req, res) => {
  const { name, email, password, avatar } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw createHttpError(409, 'Email is use');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    avatar: avatar || "https://ac.goit.global/fullstack/react/default-avatar.jpg",
  });


res.status(201).json({
  user: {
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    avatar: newUser.avatar,
    savedArticles: newUser.savedArticles,
  },
});
};


export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    throw createHttpError(401, 'Invalid credentials');
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    throw createHttpError(401, 'Invalid credentials');
  }

  res.status(200).json({
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      savedArticles: user.savedArticles,
    },
  });
};