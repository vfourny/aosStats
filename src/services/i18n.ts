import { createI18n } from "vue-i18n";
import fr from "../../locales/fr.json";

enum Locales {
  FR = "fr",
}

const messages = {
  [Locales.FR]: fr,
};

const defaultLocale = Locales.FR;

export const i18n = createI18n({
  fallbackLocale: defaultLocale, 
  legacy: false,
  
locale: defaultLocale,
  // use Composition API
messages,
});

export const t = i18n.global.t;
