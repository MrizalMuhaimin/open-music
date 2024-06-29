const InvariantError = require('../../exceptions/InvariantError');
const { AddPlaylistSongsPayloadSchema, GetPlaylistSongsPayloadSchema } = require('./schema');

const PlaylistSongsValidator = {
  validateAddPlaylistSongsPayload: (payload) => {
    const validationResult = AddPlaylistSongsPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validateGetPlaylistSongsPayload: (payload) => {
    const validationResult = GetPlaylistSongsPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = PlaylistSongsValidator;