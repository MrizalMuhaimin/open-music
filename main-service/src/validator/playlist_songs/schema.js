const Joi = require('joi');

const AddPlaylistSongsPayloadSchema = Joi.object({
  songId: Joi.string().required(),
});

const DeletePlaylistSongsPayloadSchema = Joi.object({
  songId: Joi.string().required(),
});

module.exports = { AddPlaylistSongsPayloadSchema, DeletePlaylistSongsPayloadSchema };