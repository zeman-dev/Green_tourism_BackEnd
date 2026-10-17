import { User } from '../../models/user.js';

export const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;

    console.log('ID:', userId);
    console.log('Database:', User.db.name);
    console.log('Collection:', User.collection.name);

    const user = await User.findById(userId);

    console.log('User found:', Boolean(user));

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Server error',
    });
  }
};
