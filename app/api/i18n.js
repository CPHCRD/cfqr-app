import cfqrData from 'cfqr-data';
import i18nConfig from '../config/i18n.json';

const localeFiles = import.meta.glob('../i18n/*.json', { eager: true, import: 'default' });
const cfqrDataTranslations = cfqrData.translations;

const i18n = {};

Object.keys(localeFiles).forEach(filePath => {
  const locale = filePath.replace('../i18n/', '').replace('.json', '');
  i18n[locale] = localeFiles[filePath];
  const translationObjects = cfqrDataTranslations[locale]
    || cfqrDataTranslations[i18nConfig.defaultLocale];

  Object.keys(translationObjects).forEach(qstKey => {
    Object.assign(i18n[locale], translationObjects[qstKey]);
  });
});

export default i18n;
