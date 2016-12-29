import cfqrData from 'cfqr-data';
import i18nConfig from '../config/i18n.json';

const requireContext = require.context('../i18n', true, /\.json$/);
const cfqrDataTranslations = cfqrData.translations;

const i18n = {};

requireContext.keys().forEach(filePath => {
  const locale = filePath.replace('./', '').replace('.json', '');
  i18n[locale] = requireContext(filePath);
  const translationObjects = cfqrDataTranslations[locale]
    || cfqrDataTranslations[i18nConfig.defaultLocale];

  Object.keys(translationObjects).forEach(qstKey => {
    Object.assign(i18n[locale], translationObjects[qstKey]);
  });
});

export default i18n;
