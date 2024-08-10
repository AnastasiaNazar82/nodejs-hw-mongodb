import { registerUser } from '../services/auth.js';

export const registerUserControiier = async (req, res) => {
  const user = await registerUser(req.body);

  res.json({
    status: 201,
    massage: 'Successfully registered a user!',
    data: user,
  });
};
