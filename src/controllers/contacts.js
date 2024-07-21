import createHttpError from 'http-errors';
import { getAllContactsServies, getContactById } from '../services/contacts.js';

export const getAllContactsController = async (req, res, next) => {
  const contacts = await getAllContactsServies();

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

  // якщо не знайдено контакт
  if (!contact) {
    next(createHttpError(404, 'Sorry, we don`t have find a contact!'));
    return;
  }
  // якщо знайдено контакт
  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};
