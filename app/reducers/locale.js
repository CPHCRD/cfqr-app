import { CHANGE_LOCALE } from '../actions/locale';
import i18n from '../config/i18n.json';

export default function locale(state = i18n.defaultLocale, action) {
  switch (action.type) {
    case CHANGE_LOCALE:
      return action.data;
    default:
      return state;
  }
}
