import { customersSchema } from "../models/customers.model.js";
export async function customersSchemaValidation(req, res, next) {
  const customer = req.body;
  try {
    const { error } = customersSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return res.status(400).send(errors);
    }

    next();
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}
