const Joi = require('joi');

const AddAlbumsPayloadSchema = Joi.object({
  name: Joi.string().required(),
  year: Joi.number().required(),
});

module.exports = { AddAlbumsPayloadSchema };