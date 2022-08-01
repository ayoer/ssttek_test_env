import jwt from 'jsonwebtoken';
import errors from 'enums/errors';
import ErrorResponse from 'helpers/errorResponse';
import User from 'models/User';

// Protect routes
export const protect = async (req, res, next) => {
  let token;
  const {authorization} = req.headers;

  if (authorization && authorization.startsWith('Bearer ')) {
    token = authorization.split(' ')[1];
  }

  // Make sure token exists
  if (!token) throw new ErrorResponse(errors.UN_AUTHORIZED);

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sessionUser = await User.findByPk(decoded.id);

    if (!sessionUser.validated) {
      throw new ErrorResponse(errors.USER_NOT_ACTIVE);
    }
    req.user = sessionUser;

    next();
  } catch (err) {
    throw new ErrorResponse(errors.UN_AUTHORIZED);
  }
};
