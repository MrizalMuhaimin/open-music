const InvariantError = require('../../exceptions/InvariantError');
const { AddSongsPayloadSchema } = require('./schema');

const SongsValidator = {
  validateAddSongPayload: (payload) => {
    const validationResult = AddSongsPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = SongsValidator;