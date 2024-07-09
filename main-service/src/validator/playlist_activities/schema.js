const Joi = require('joi');

const AddPlaylistActivitiesPayloadSchema = Joi.object({
  username: Joi.string().required(),
  title: Joi.string().required(),
  action: Joi.string().required(),
});

module.exports = { AddPlaylistActivitiesPayloadSchema };