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
import { validateBody } from '../middlewares/validateBody.js';
import { validateId } from '../middlewares/validateId.js';
import { createContactSchema } from '../validation/createContactSchema.js';
import { updateContactSchema } from '../validation/updateContactSchema.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();
const jsonParser = express.json();

router.use(authenticate);

router.get('/', ctrlWrapper(getAllContactsController));

router.get('/:contactId', validateId, ctrlWrapper(getContactByIdController));

router.post(
  '/',
  jsonParser,
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

router.delete('/:contactId', validateId, ctrlWrapper(deleteContactController));

router.put(
  '/:contactId',
  validateId,
  jsonParser,
  ctrlWrapper(updateContactController),
);

router.patch(
  '/:contactId',
  validateId,
  jsonParser,
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);

export default router;
