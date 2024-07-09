const InvariantError = require('../../exceptions/InvariantError');
const { AddAlbumsPayloadSchema } = require('./schema');

const AlbumsValidator = {
  validateAddAlbumsPayload: (payload) => {
    const validationResult = AddAlbumsPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = AlbumsValidator;