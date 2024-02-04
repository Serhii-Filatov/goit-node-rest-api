import express from 'express';
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateFavorite,
} from '../controllers/contactsControllers.js';

import { schemas } from '../schemas/contactsSchemas.js';

import validateBody from '../middlewares/validateBody.js';

import isValidId from '../middlewares/isValidId.js';

const contactsRouter = express.Router();

contactsRouter.get('/', getAllContacts);

contactsRouter.get('/:id', getOneContact);

contactsRouter.delete('/:id', deleteContact);

contactsRouter.post(
  '/',
  validateBody(schemas.createContactSchema),
  createContact
);

contactsRouter.put(
  '/:id',
  validateBody(schemas.updateContactSchema),
  updateContact
);

contactsRouter.patch(
  '/:id/favorite',
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  updateFavorite
);

export default contactsRouter;
