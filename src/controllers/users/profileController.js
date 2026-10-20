import { readFile } from 'node:fs/promises';
import path from 'node:path';
import createHttpError from 'http-errors';
import handlebars from 'handlebars';
import jwt from 'jsonwebtoken';
import { User } from '../../models/user.js';
import { sendEmail } from '../../utils/sendEmail.js';

export const updateUser = async (req, res) => {
  const { name, email } = req.body;
  const userId = req.user._id;

  const isEmailChange = Boolean(email) && email !== req.user.email;

  if (isEmailChange) {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw createHttpError(409, 'Email in use');
    }
  }

  let user = req.user;

  if (name !== undefined) {
    user = await User.findByIdAndUpdate(
      userId,
      { name },
      {
        returnDocument: 'after',
        runValidators: true,
      },
    );
  }
  if (isEmailChange) {
    const token = jwt.sign(
      { sub: userId.toString(), email, purpose: 'email-change' },
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
    );
    const link = `${process.env.FRONTEND_DOMAIN}/confirm-email?token=${token}`;

    const templatePath = path.resolve(
      'src',
      'templates',
      'confirm-email-change.html',
    );
    const templateSource = await readFile(templatePath, 'utf-8');
    const html = handlebars.compile(templateSource)({
      name: user.name,
      newEmail: email,
      link,
    });

    const recipient = req.user.email;

    try {
      await sendEmail({
        to: recipient,
        subject: 'Підтвердження зміни email',
        html,
      });
    } catch (error) {
      req.log.error(error, error.message);
      throw createHttpError(
        500,
        'Failed to send the email, please try again later.',
      );
    }
  }
  res.status(200).json({ user, emailVerificationSent: isEmailChange });
};

export const confirmEmailChange = async (req, res) => {
  const { token } = req.body;

  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    throw createHttpError(401, 'Token is expired or invalid');
  }

  if (payload.purpose !== 'email-change') {
    throw createHttpError(401, 'Token is expired or invalid');
  }

  const { sub: userId, email } = payload;

  const existingUser = await User.findOne({ email, _id: { $ne: userId } });
  if (existingUser) {
    throw createHttpError(409, 'Email in use');
  }

  let user;
  try {
    user = await User.findByIdAndUpdate(
      userId,
      { email },
      {
        returnDocument: 'after',
        runValidators: true,
      },
    );
  } catch (error) {
    if (error.code === 11000) {
      throw createHttpError(409, 'Email in use');
    }
    throw error;
  }

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  res.status(200).json({ message: 'Email changed successfully' });
};
