import Joi from "joi";

const user = Joi.object({
  name: Joi.string()
    .pattern(/^[A-Za-z\s]+$/)
    .min(3)
    .messages({
      "string.pattern.base": "Name must contains only letters.",
      "string.empty": "Name is required",
      "string.min": "Name should have a 3 characters",
    })
    .required(),
  lastName: Joi.string()
    .pattern(/^[A-Za-z\s]+$/)
    .min(3)
    .messages({
      "string.pattern.base": "Last Name must contains only letters.",
      "string.empty": "Last Name is required",
      "string.min": "Last Name should have a 3 characters",
    })
    .required(),
  dni: Joi.number()
    .min(11111111)
    .max(99999999)
    .messages({
      "number.empty": "DNI is required",
      "number.min": "DNI must contain 8 characters",
      "number.max": "DNI must contain 8 characters",
    })
    .required(),
  email: Joi.string()
    .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    .messages({
      "string.empty": "Email is required",
      "string.pattern.base": "The email must be: example@example.com",
    })
    .required(),
  password: Joi.string()
    .min(6)
    .messages({
      "string.empty": "Password is required",
      "string.min": "Password must contain 6 characters or more",
    })
    .required(),
});

export default user;
