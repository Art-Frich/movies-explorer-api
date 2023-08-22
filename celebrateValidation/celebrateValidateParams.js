const { Joi } = require('celebrate');
// eslint-disable-next-line object-curly-newline
const { regExpEmail, regExpUrl, regExpUserId, minLen, maxLen } = require('../helpers/constants');

// Общие правила валидации
module.exports.nameSchema = Joi.string().min(minLen).max(maxLen);
module.exports.emailSchema = Joi.string().required().pattern(regExpEmail);
module.exports.reqStrSchema = Joi.string().required();
module.exports.reqNumSchema = Joi.number().required();
module.exports.linkSchema = Joi.string().required().pattern(regExpUrl);
module.exports.userIdSchema = Joi.string().pattern(regExpUserId);
