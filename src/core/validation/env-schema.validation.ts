import * as Joi from 'joi';

export default (): Joi.ObjectSchema => {
  const config: Joi.SchemaMap = {
    NODE_ENV: Joi.string().valid('development.local', 'production.local').default('development.local'),
    NEST_PORT: Joi.number().default(3002),
  };

  const validationSchema = Joi.object(config);

  return validationSchema;
};
