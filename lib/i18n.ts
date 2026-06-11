export type Lang = 'en' | 'ru';

export function getLang(searchParams?: { lang?: string }): Lang {
  return searchParams?.lang === 'ru' ? 'ru' : 'en';
}

export const dictionary = {
  en: {
    login: 'Login',
    logout: 'Logout',
    dashboard: 'Dashboard',
    contentLibrary: 'Content Library',
    admin: 'Admin',
    view: 'View',
    intro: 'Introductory information',
    primary: 'Primary nutrition materials'
  },
  ru: {
    login: 'Войти',
    logout: 'Выйти',
    dashboard: 'Панель',
    contentLibrary: 'Библиотека материалов',
    admin: 'Админ',
    view: 'Открыть',
    intro: 'Вводная информация',
    primary: 'Основные материалы по питанию'
  }
};
