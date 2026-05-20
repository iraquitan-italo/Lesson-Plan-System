const Joi = require('joi');

const planoSchema = Joi.object({
  titulo: Joi.string().required().max(255),
  objetivo: Joi.string().required(),
  ementa: Joi.string().required(),
  data_prevista: Joi.date().required(),
  disciplina: Joi.string().required().max(100),
  conteudos: Joi.string().allow(''),
  recursos_apoio: Joi.string().allow(''),
  tags: Joi.string().allow('')
});

const validarPlano = (req, res, next) => {
  const { error } = planoSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

module.exports = { validarPlano };