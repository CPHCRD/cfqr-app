// @flow
import { CHANGE_LOCALE } from '../actions/locale';
import i18n from '../config/i18n.json';

export default function locale(state: String = i18n.defaultLocale, action: Object) {
  switch (action.type) {
    case CHANGE_LOCALE:
      return action.data;
    default:
      return state;
  }
}
