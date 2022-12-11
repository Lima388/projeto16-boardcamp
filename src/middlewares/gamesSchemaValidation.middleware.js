import { gamesSchema } from "../models/games.model.js";

export async function gamesSchemaValidation(req, res, next) {
  try {
    const { error } = gamesSchema.validate(req.body, {
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
