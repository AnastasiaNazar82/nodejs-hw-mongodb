import { ContactsCollection } from '../db/models/Contacts.js';

export const getAllContactsServies = () => ContactsCollection.find();
export const getContactById = (contactId) =>
  ContactsCollection.findById(contactId);
