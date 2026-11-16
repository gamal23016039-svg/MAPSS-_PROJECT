/**
 * - Clinics module request rules: validate clinic identifiers, fields, status changes, and
 *   filters for required data, types, formats, allowed values, and boundaries before
 *   controller/service processing.
 */
const Joi = require("joi");

const objectId = Joi.string()
  .hex()
  .length(24)
  .messages({
    "string.hex": "{{#label}} must be a valid id",
    "string.length": "{{#label}} must be a valid id",
  });

const name = Joi.string().trim().min(2).max(100).messages({
  "string.empty": "Clinic name is required",
  "string.min": "Clinic name must be at least 2 characters",
  "string.max": "Clinic name must be at most 100 characters",
});

const specialtyIds = Joi.array().items(objectId).min(1).unique().messages({
  "array.min": "At least one specialty is required",
  "array.unique": "specialtyIds must not contain duplicates",
});

const idParams = Joi.object({
  id: objectId.required().label("clinic id"),
});

const listQuery = Joi.object({
  page: Joi.number().integer().min(1),
  limit: Joi.number().integer().min(1).max(100),
  q: Joi.string().trim().max(100).allow(""),
  specialtyId: objectId.label("specialtyId"),
  isActive: Joi.boolean(),
});

const createBody = Joi.object({
  name: name.required(),
  specialtyIds: specialtyIds.required(),
});

const updateBody = Joi.object({
  name,
  specialtyIds,
}).min(1);

const statusBody = Joi.object({
  isActive: Joi.boolean().required(),
});

module.exports = { 
    idParams, 
    listQuery, 
    createBody, 
    updateBody, 
    statusBody 
};
