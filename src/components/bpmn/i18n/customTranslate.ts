
import translations from "./translations";

const customTranslate = (template: string, replacements?: Record<string, any>) => {
  template = translations[template] || template;

  return template.replace(/{([^}]+)}/g, function(_: any, key: string) {
    return replacements?.[key] || "{" + key + "}";
  });
};

export default customTranslate;