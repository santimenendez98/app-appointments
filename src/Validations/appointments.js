import Joi from "joi";

const appointmentSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .pattern(/^[A-Za-z\s]+$/)
    .messages({
      "string.pattern.base": "Name must contains only letters.",
      "string.min": "Name should have 3 characters",
      "string.empty": "Name is required",
    })
    .required(),
  lastName: Joi.string()
    .min(3)
    .pattern(/^[A-Za-z\s]+$/)
    .messages({
      "string.pattern.base": "Last Name must contains only letters.",
      "string.min": "Last Name should 3 characters",
      "string.empty": "Last Name is required",
    })
    .required(),
  address: Joi.string()
    .min(3)
    .messages({
      "string.min": "Address should have a 3 characters",
      "string.empty": "Address is required",
    })
    .required(),
  phone: Joi.string()
    .pattern(/^\d+$/)
    .min(8)
    .max(9)
    .messages({
      "string.pattern.base": "Phone contains only numbers",
      "string.min": "Phone should have a 8 characters",
      "string.max": "Phone should have a of 9 characters",
      "string.empty": "Phone is required",
    })
    .required(),
  clientID: Joi.string()
    .pattern(/^\d+$/)
    .min(8)
    .max(8)
    .when("isClient", {
      is: true,
      then: Joi.string().required(),
      otherwise: Joi.string().allow("No Client", ""),
    })
    .messages({
      "string.empty": "Client ID is required",
      "string.min": "Client ID should have a 8 characters",
      "string.max": "Client ID should have a 8 characters",
      "string.pattern.base": "Client ID contains only numbers",
    }),
  date: Joi.date()
    .messages({
      "date.base": "Date is required",
    })
    .required(),
  paidMonth: Joi.string().when("isClient", {
    is: true,
    then: Joi.string().required().invalid("No Client").messages({
      "string.empty": "Last Paid Month is required",
      "any.invalid": "Last Paid Month is required",
    }),
    otherwise: Joi.string().allow("No Client", ""),
  }),

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
  isClient: Joi.boolean(),
});

export default appointmentSchema;
