
const Joi = require('joi')

const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .allow(['development', 'production', 'test'])
    .default('development'),
  PORT: Joi.number()
    .default(4040),
  MONGO_HOST: Joi.string().required()
    .description("Mongo DB host url"),
  MONGO_PORT: Joi.number()
    .default(27017)
}).unknown().required()

const { error, value: envVars } = Joi.validate(process.env, envVarsSchema);

console.log(envVars);

if(error) {
  throw new Error(`Config validation error: ${error.message}`)
}

const config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongo: {
    host: envVars.MONGO_HOST,
    port: envVars.MONGO_PORT
  }
}

module.exports = config
