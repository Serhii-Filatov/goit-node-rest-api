import { Contact } from '../schemas/contactsSchemas.js';
import HttpError from '../helpers/HttpError.js';
import ctrlWrapper from '../helpers/ctrlWrapper.js';

export const getAllContacts = ctrlWrapper(async (req, res) => {
  const result = await Contact.find();
  res.send(result);
});

export const getOneContact = ctrlWrapper(async (req, res) => {
  const { id } = req.params;
  const contact = await Contact.findById(id);

  if (contact === null) {
    throw HttpError(404, 'Not Found');
  }

  res.status(200).json(contact);
});

export const deleteContact = ctrlWrapper(async (req, res) => {
  const { id } = req.params;
  const contact = await Contact.findByIdAndDelete(id);

  if (contact === null) {
    throw HttpError(404, 'Not Found');
  }

  res.send({ message: `Deleted successfully ${id}` });
});

export const createContact = ctrlWrapper(async (req, res) => {
  const newContact = await Contact.create(req.body);
  res.status(201).json(newContact);
});

export const updateContact = ctrlWrapper(async (req, res) => {
  const hasAtLeastOneField = Object.keys(req.body).length > 0;
  if (!hasAtLeastOneField) {
    throw HttpError(400, 'Body must have at least one field');
  }

  const { id } = req.params;
  const updatedContact = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (updatedContact === null) {
    throw HttpError(404, 'Not found');
  }
  return res.status(200).json(updatedContact);
});

export const updateStatusContact = ctrlWrapper(async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(
    id,
    {
      favorite: req.body.favorite,
    },
    { new: true }
  );

  if (req.body.favorite === undefined) {
    return res.status(400).json({ message: 'missing field favorite' });
  }
  if (result === null) {
    return res.status(404).json({ message: 'Not found' });
  }
  res.send(result);
});

