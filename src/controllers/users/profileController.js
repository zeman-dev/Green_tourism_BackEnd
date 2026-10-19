import { User } from '../../models/user.js';

export const updateUser = async (req, res) => {
  const { name } = req.body;
  const user = await User.findByIdAndUpdate(
    req.user._id,
    { name },
    {
      returnDocument: 'after',
      runValidators: true,
    },
  );
  res.status(200).json(user);
};
