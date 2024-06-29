const Joi = require('joi');

const AddPlaylistSongsPayloadSchema = Joi.object({
  songId: Joi.string().required(),
});

const GetPlaylistSongsPayloadSchema = Joi.object({
  playlistId: Joi.string().required(),
});

module.exports = { AddPlaylistSongsPayloadSchema, GetPlaylistSongsPayloadSchema };