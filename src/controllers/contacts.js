import createHttpError from 'http-errors';
import {
  getAllContactsServies,
  getContactById,
  createContactServies,
  deleteContactServies,
  updateContactServies,
} from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { env } from '../utils/env.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

// =======================================================
export const getAllContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);
  const userId = req.user._id;

  const contacts = await getAllContactsServies({
    userId,
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

// =======================================================
export const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId, req.user._id);

  // якщо не знайдено контакт
  if (!contact) {
    throw createHttpError(404, 'Sorry, we don`t have find a contact!');
  }
  // якщо знайдено контакт
  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

// =======================================================
export const createContactController = async (req, res) => {
  const userId = req.user._id;
  const contact = await createContactServies({ ...req.body, userId });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
};

// =======================================================
export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const userId = req.user._id;

  const removedContact = await deleteContactServies(contactId, userId);

  if (!removedContact) {
    next(createHttpError(404, 'Contact not found!'));
    return;
  }
  res.status(204).send();
};

// =======================================================
export const updateContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const userId = req.user._id;

  const resultContact = await updateContactServies(
    contactId,
    userId,
    req.body,
    {
      upsert: true,
    },
  );

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

// =======================================================
export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;

  // ---------------------------------

  const photo = req.file;

  let photoUrl;

  if (photo) {
    if (env('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

  const result = await updateContactServies(contactId, {
    ...req.body,
    photo: photoUrl,
  });

  if (!result) {
    next(createHttpError(404, 'Contact not found!'));
    return;
  }

  res.json({
    status: 200,
    message: 'Successfully patch a contact!',
    data: result.contact,
  });
};
