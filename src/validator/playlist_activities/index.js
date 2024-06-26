const InvariantError = require('../../exceptions/InvariantError');
const { AddPlaylistActivitiesPayloadSchema } = require('./schema');

const PlaylistActivitiesValidator = {
  validateAddPlaylistActivitiesPayload: (payload) => {
    const validationResult = AddPlaylistActivitiesPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = PlaylistActivitiesValidator;