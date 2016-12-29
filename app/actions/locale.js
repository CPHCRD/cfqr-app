// @flow
export const CHANGE_LOCALE = 'CHANGE_LOCALE';
export function changeLocale(locale: string = 'en') {
  return {
    type: CHANGE_LOCALE,
    data: locale
  };
}
