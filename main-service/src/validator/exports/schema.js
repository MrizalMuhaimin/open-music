const Joi = require('joi');
 
const ExporPlaylistPayloadSchema = Joi.object({
  targetEmail: Joi.string().email({ tlds: true }).required(),
});
 
module.exports = ExporPlaylistPayloadSchema;