import { ContactsCollection } from '../db/models/Contacts.js';

export const getAllContactsServies = () => ContactsCollection.find();

export const getContactById = (contactId) =>
  ContactsCollection.findById(contactId);

export const createContactServies = (payload) =>
  ContactsCollection.create(payload);

export const deleteContactServies = (contactId) =>
  ContactsCollection.findByIdAndDelete(contactId);

export const updateContactServies = async (contactId, payload, option = {}) => {
  const result = await ContactsCollection.findByIdAndUpdate(
    { _id: contactId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...option,
    },
  );

  if (!result || !result.value) return null;

  return {
    contact: result.value,
    isNew: Boolean(result?.lastErrorObject?.upserted),
  };
};

// export const updateContactServies = (contactId, contact) =>
//   ContactsCollection.findByIdAndUpdate(contactId, contact, { new: true });

// export const patchContactServies = (contactId, contact) =>
//   ContactsCollection.findByIdAndUpdate(contactId, contact, { new: true });
