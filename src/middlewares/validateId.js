import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export const validateId = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    next(createHttpError(404, 'Not found'));
    return;
  }
  next();
};
