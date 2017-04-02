/**
 * Created by serge on 26.02.2017.
 */
import { OpaqueToken  } from '@angular/core';


// import translations
import { LANG_EN_NAME,LANG_EN_TRANS } from './lang-en';
import { LANG_UKR_NAME,LANG_UKR_TRANS } from './lang-ukr';
import { LANG_RUS_NAME,LANG_RUS_TRANS } from './lang-rus';

// translation token
export const TRANSLATIONS = new OpaqueToken('translations');

// all translations

const dictionary = {
  [LANG_EN_NAME]: LANG_EN_TRANS,
  [LANG_UKR_NAME]: LANG_UKR_TRANS,
  [LANG_RUS_NAME]: LANG_RUS_TRANS,

};

// providers
export const TRANSLATION_PROVIDERS = [
  { provide: TRANSLATIONS, useValue : dictionary },
];

