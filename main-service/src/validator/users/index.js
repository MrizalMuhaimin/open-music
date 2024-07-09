const InvariantError = require('../../exceptions/InvariantError');
const { AddUsersPayloadSchema } = require('./schema');

const UsersValidator = {
  validateAddUsersPayload: (payload) => {
    const validationResult = AddUsersPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = UsersValidator;