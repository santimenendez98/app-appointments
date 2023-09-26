import Joi from "joi";

const pet = Joi.object({
  kind: Joi.string()
    .pattern(/^[A-Za-z\s]+$/)
    .min(3)
    .messages({
      "string.pattern.base": "Kind must contains only letters.",
      "string.empty": "Kind is required",
      "string.min": "Kind should have a 3 characters",
    })
    .required(),
  breed: Joi.string()
    .pattern(/^[A-Za-z\s]+$/)
    .min(3)
    .messages({
      "string.pattern.base": "Breed must contains only letters.",
      "string.empty": "Breed is required",
      "string.min": "Breed should have a 3 characters",
    })
    .required(),
  petName: Joi.string()
    .pattern(/^[A-Za-z\s]+$/)
    .min(3)
    .messages({
      "string.pattern.base": "Pet Name must contains only letters.",
      "string.empty": "Pet Name is required",
      "string.min": "Pet Name should have a 3 characters",
    })
    .required(),
  age: Joi.number()
    .min(1)
    .max(20)
    .messages({
      "number.min": "Age cannot be less than 1",
      "number.max": "Age cannot be more than 20",
      "any.required": "Age is required",
      "number.base": "Age must contains only numbers",
    })
    .required(),
  sex: Joi.string()
    .min(1)
    .messages({
      "string.empty": "Sex is required",
      "string.min": "Sex should have a 1 characters",
    })
    .required(),
  color: Joi.string()
    .pattern(/^[A-Za-z\s]+$/)
    .min(3)
    .messages({
      "string.pattern.base": "Color must contains only letters.",
      "string.empty": "Color is required",
      "string.min": "Color should have a 3 characters",
    })
    .required(),
  history: Joi.string()
    .min(1)
    .messages({
      "string.empty": "History is required",
      "string.min": "History should have a 1 characters",
    })
    .required(),
});

export default pet;
