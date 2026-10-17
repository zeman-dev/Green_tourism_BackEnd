import bcrypt from "bcrypt";
import createHttpError from "http-errors";
import { User } from "../../models/user.js";


export const registerUser = async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw createHttpError(400, 'Email is use');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    email,
    password: hashedPassword,
  });


  res.status(201).json(newUser);
};
