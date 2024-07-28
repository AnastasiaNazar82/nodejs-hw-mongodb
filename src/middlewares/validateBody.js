import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

export const validateBody = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    next(createHttpError(404, 'Not found'));
    return;
  }
  next();
};
