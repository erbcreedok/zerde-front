import _ru from "../_dictionaries/_ru";
import _kk from "../_dictionaries/_kk";
import _qq from "../_dictionaries/_qq";

export const defaultLocale = 'ru';

export const locales = [
  {
    code: 'ru',
    name: 'Русский',
    dir: 'ltr',
    dictionary: _ru,
  },
  {
    code: 'kk',
    name: 'Қазақша',
    dir: 'ltr',
    dictionary: _kk,
  },
  {
    code: 'qq',
    name: 'Qazaqsha',
    dir: 'ltr',
    dictionary: _qq,
  },
];
