const Joi = require(`joi`);

const propertySchemaJOI = Joi.object({
  agentCode: Joi.string(),
  title: Joi.string().required(),
  image: Joi.string(),
  type: Joi.string(),
  rent: Joi.number().required().min(0),
  area: Joi.string(),
  city: Joi.string(),
  postcode: Joi.string(),
  bedrooms: Joi.number(),
  bathrooms: Joi.number(),
  latitude: Joi.number(),
  longitude: Joi.number(),
  // features: Joi.array().items(Joi.string()),
  features: Joi.array(),
  description: Joi.string(),
  agent: Joi.string().alphanum(),
});

const agentSchemaJOI = Joi.object({
  agentCode: Joi.string(),
  name: Joi.string(),
  logo: Joi.string(),
  address: Joi.string(),
  phone: Joi.string(),
  properties: Joi.array(),
});

module.exports.propertySchemaJOI = propertySchemaJOI;
module.exports.agentSchemaJOI = agentSchemaJOI;
