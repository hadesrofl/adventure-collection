import { Dictionary } from "@dictionaries/helpers/getDictionaries";
import { Language } from "@prisma/client";
import Joi from "joi";

export const createAdventureSchema = (dictionary: Dictionary) =>
  Joi.object({
    name: Joi.string().required().label(dictionary.Models.adventures.name),
    summary: Joi.string()
      .required()
      .label(dictionary.Models.adventures.summary),
    language: Joi.string()
      .valid(...Object.keys(Language))
      .required()
      .label(dictionary.Models.adventures.language),

    systemId: Joi.number()
      .required()
      .greater(0)
      .label(dictionary.Models.adventures.systemId),
    system: Joi.object().required().label(dictionary.Models.adventures.system),
    genres: Joi.array().required().label(dictionary.Models.adventures.genres),
    tags: Joi.array().required().label(dictionary.Models.adventures.tags),
    alreadyPlayed: Joi.boolean()
      .required()
      .label(dictionary.Models.adventures.alreadyPlayed),

    id: Joi.alternatives()
      .try(Joi.number().positive(), Joi.optional())
      .label(dictionary.Models.adventures.id),
    createdAt: Joi.alternatives()
      .try(Joi.date(), Joi.optional())
      .label(dictionary.Models.adventures.createdAt),
    updatedAt: Joi.alternatives()
      .try(Joi.date(), Joi.optional())
      .label(dictionary.Models.adventures.UpdatedAt),

    seriesId: Joi.alternatives()
      .try(Joi.optional(), Joi.number().positive())
      .label(dictionary.Models.adventures.seriesId),
    series: Joi.alternatives()
      .try(Joi.optional(), Joi.object())
      .label(dictionary.Models.adventures.series),
    minLevel: Joi.number()
      .positive()
      .allow(null, 0)
      .label(dictionary.Models.adventures.minLevel),
    maxLevel: Joi.number()
      .positive()
      .min(Joi.ref("minLevel"))
      .allow(null)
      .label(dictionary.Models.adventures.maxLevel),
    pageCount: Joi.number()
      .positive()
      .allow(null)
      .label(dictionary.Models.adventures.pageCount),
    image: Joi.string()
      .regex(
        new RegExp(
          "https://(www.)?system-matters.de/(.+|/)*(\\w|\\d)+\\.(png|jpeg|jpg|bmp)"
        )
      )
      .allow(null, "")
      .label(dictionary.Models.adventures.image),
  });
