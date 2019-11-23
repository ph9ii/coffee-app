import Joi from "@hapi/joi";
Joi.objectId = require('joi-objectid')(Joi);

export default machine => {
  const schema = Joi.object({
    sku: Joi.string()
      .min(3)
      .max(255)
      .required(),
    description: Joi.string()
      .min(3)
      .max(255)
      .required(),
    water_line_compatible: Joi.bool(),
    product_type_id: Joi.objectId().required(),
    product_type: Joi.string().required()
  });

  return Joi.validate(machine, schema);
};
