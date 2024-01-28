import {
  listContacts,
  getContactById,
  removeContactById,
  addContact,
  updateContactById,
} from '../services/contactsServices.js';

import HttpError from '../helpers/HttpError.js';
import ctrlWrapper from '../helpers/ctrlWrapper.js';

export const getAllContacts = ctrlWrapper(async (req, res) => {
  const result = await listContacts();
  res.status(200).json(result);
});

export const getOneContact = ctrlWrapper(async (req, res) => {
  const { id } = req.params;
  const contact = await getContactById(id);

  if (!contact) {
    throw HttpError(404, 'Not Found');
  }

  res.status(200).json(contact);
});

export const deleteContact = ctrlWrapper(async (req, res) => {
  const { id } = req.params;

  const contact = await removeContactById(id);

  if (!contact) {
    throw HttpError(404, 'Not Found');
  }

  res.status(200).json(contact);
});

export const createContact = ctrlWrapper(async (req, res) => {
  const newContact = await addContact(req.body);

  res.status(201).json(newContact);
});

export const updateContact = ctrlWrapper(async (req, res) => {
  const hasAtLeastOneField = Object.keys(req.body).length > 0;
  if (!hasAtLeastOneField) {
    throw HttpError(400, 'Body must have at least one field');
  }

  const { id } = req.params;
  const updatedContact = await updateContactById(id, req.body);

  if (!updatedContact) {
    throw HttpError(404, 'Not found');
  }

  return res.status(200).json(updatedContact);
});

