import { Dictionary } from "./getDictionaries";

export function setJoiErrorMessages(dictionary: Dictionary) {
  return {
    messages: { en: { ...dictionary.Errors.Joi } },
    errors: { language: "en" },
    abortEarly: false,
  };
}
