// util for jwt generation

import jwt from 'jsonwebtoken';

const generateToken = (res, id, role) => {
  const token = jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production only
    sameSite: 'strict', // Prevent CSRF attacks
    maxAge: 24 * 60 * 60 * 1000,
  });
};

export default generateToken;
