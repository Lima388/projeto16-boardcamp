import { categoriesSchema } from "../models/categories.model.js";

export async function categoriesSchemaValidation(req, res, next) {
  try {
    const { error } = categoriesSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return res.status(400).send(errors);
    }
    next();
  } catch (err) {
    console.log(egg);
    return res.sendStatus(500);
  }
}
