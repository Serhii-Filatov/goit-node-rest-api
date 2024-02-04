import { Schema, model } from 'mongoose';
import Joi from 'joi';
import handleMongooseError from '../middlewares/handleMongooseError.js';

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false }
);

contactSchema.post('save', handleMongooseError);

const createContactSchema = Joi.object({
  name: Joi.string()
    .max(50)
    .required()
    .messages({ 'any.required': 'Missing required name field' }),
  email: Joi.string()
    .email()
    .required()
    .messages({ 'any.required': 'Missing required email field' }),
  phone: Joi.string()
    .min(3)
    .max(50)
    .required()
    .messages({ 'any.required': 'Missing required phone field' }),
});

const updateContactSchema = Joi.object({
  name: Joi.string().max(50),
  email: Joi.string().email(),
  phone: Joi.string().min(3).max(50),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean()
    .required()
    .messages({ 'any.required': 'Missing required favorite field' }),
});

export const Contact = model('contact', contactSchema);
export const schemas = {
  createContactSchema,
  updateFavoriteSchema,
  updateContactSchema,
};
