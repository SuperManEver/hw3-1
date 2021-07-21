const Joi = require('joi')

const schema = Joi.object({
  age: Joi.number().integer().min(5).max(90),
  concerts: Joi.number().integer().min(1).max(90),
  cities: Joi.number().integer().min(1).max(90),
  years: Joi.number().integer().min(1).max(40),
})

module.exports = {
  schema,
}
