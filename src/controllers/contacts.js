import createHttpError from 'http-errors';
import {
  getAllContactsServies,
  getContactById,
  createContactServies,
  deleteContactServies,
  updateContactServies,
} from '../services/contacts.js';

export const getAllContactsController = async (req, res, next) => {
  const contacts = await getAllContactsServies();

  res.status(200).json({
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
  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const createContactController = async (req, res) => {
  const newContact = await createContactServies(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: newContact,
  });
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const removedContact = await deleteContactServies(contactId);

  if (!removedContact) {
    next(createHttpError(404, 'Contact not found!'));
    return;
  }
  res.status(204).send();
};

export const updateContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const resultContact = await updateContactServies(contactId, req.body, {
    upsert: true,
  });

  if (!resultContact) {
    next(createHttpError(404, 'Contact not found!'));
    return;
  }
  const status = resultContact.isNew ? 201 : 200;
  res.status(status).json({
    status,
    message: 'Contact update!',
    data: resultContact.contact,
  });
};

export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await updateContactServies(contactId, req.body);

  if (!result) {
    next(createHttpError(404, 'Contact not found!'));
  }

  res.json({
    status: 200,
    message: 'Successfully patch a contact!',
    data: result.contact,
  });
};
