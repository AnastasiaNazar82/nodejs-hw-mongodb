import { Router } from 'express';
import { getAllContactsServies, getContactById } from '../services/contacts.js';

const router = Router();

router.get('/contacts', async (req, res) => {
  const contacts = await getAllContactsServies();
  res.json({
    status: 200,
    message: 'Successfull found contacts!',
    data: contacts,
  });
});

router.get('/contacts/:contactId', async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (!contactId) {
    res.status(404).json({
      message: 'Sorry, we don`t have find a student!',
    });
    return;
  }
  res.json({
    status: 200,
    message: `Successfully found contact with id {contactId}!`,
    data: contact,
  });
});

export default router;
