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
    .messages({
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

  pet: Joi.object(),
  isClient: Joi.boolean(),
});

export default appointmentSchema;
