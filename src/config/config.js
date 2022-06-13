"use strict";
exports.__esModule = true;
var dotenv = require("dotenv");
var path = require("path");
var Joi = require("joi");
dotenv.config({ path: path.join(__dirname, '../../../.env') });
var envVarsSchema = Joi.object()
    .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number()["default"](3000),
    MONGODB_URL: Joi.string().required().description('Mongo DB url')
})
    .unknown();
var _a = envVarsSchema.validate(process.env, { errors: { label: 'key' } }), envVars = _a.value, error = _a.error;
if (error) {
    throw new Error("Config validation error: ".concat(error.message));
}
exports["default"] = {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    mongoose: {
        url: envVars.MONGODB_URL,
        options: {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    }
};
