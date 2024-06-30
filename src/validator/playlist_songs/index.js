const InvariantError = require('../../exceptions/InvariantError');
const { AddPlaylistSongsPayloadSchema, DeletePlaylistSongsPayloadSchema } = require('./schema');

const PlaylistSongsValidator = {
  validateAddPlaylistSongsPayload: (payload) => {
    const validationResult = AddPlaylistSongsPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validateDeletePlaylistSongsPayload: (payload) => {
    const validationResult = DeletePlaylistSongsPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = PlaylistSongsValidator;