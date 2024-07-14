import { Contact } from '../db/models/Contacts.js';

export const getAllContactsServies = () => Contact.find();
export const getContactById = (contactId) => Contact.findById(contactId);
