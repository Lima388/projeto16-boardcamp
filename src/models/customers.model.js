import joi from "joi";

export const customersSchema = joi.object({
  name: joi.string().required(),
  phone: joi.string().min(10).max(11).pattern(/^\d+$/).required(),
  cpf: joi.string().length(11).pattern(/^\d+$/).required(),
  birthday: joi.date().greater("1-1-1920").required(),
});
