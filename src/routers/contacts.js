import express from 'express';
import { Router } from 'express';
import {
  createContactController,
  getAllContactsController,
  getContactByIdController,
  deleteContactController,
  updateContactController,
  patchContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();
const jsonParser = express.json();

router.get('/contacts', ctrlWrapper(getAllContactsController));

router.get('/contacts/:contactId', ctrlWrapper(getContactByIdController));

router.post('/contacts', jsonParser, ctrlWrapper(createContactController));

router.delete('/contacts/:contactId', ctrlWrapper(deleteContactController));

router.put(
  '/contacts/:contactId',
  jsonParser,
  ctrlWrapper(updateContactController),
);

router.patch(
  '/contacts/:contactId',
  jsonParser,
  ctrlWrapper(patchContactController),
);

export default router;
