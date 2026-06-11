export type ContentItem = {
  slug: string;
  category: 'intro' | 'primary' | 'recipe' | 'supplements';
  title: { en: string; ru: string };
  summary: { en: string; ru: string };
  body: { en: string; ru: string };
};

export const contentItems: ContentItem[] = [
  {
    slug: 'getting-started',
    category: 'intro',
    title: { en: 'Getting Started', ru: 'С чего начать' },
    summary: {
      en: 'A simple overview of how to use the nutrition platform.',
      ru: 'Краткий обзор того, как пользоваться платформой питания.'
    },
    body: {
      en: 'Welcome to the nutrition platform. Start with the introductory guidance, then move into the primary materials. This area can contain your prepared nutrition principles, onboarding guidance, disclaimers, and how subscribers should use the resources.',
      ru: 'Добро пожаловать на платформу питания. Начните с вводных материалов, затем переходите к основному контенту. Здесь можно разместить ваши принципы питания, инструкции для новых подписчиков, предупреждения и правила использования материалов.'
    }
  },
  {
    slug: 'nutrition-principles',
    category: 'primary',
    title: { en: 'Core Nutrition Principles', ru: 'Основные принципы питания' },
    summary: {
      en: 'The primary nutrition framework for subscribers.',
      ru: 'Основная система питания для подписчиков.'
    },
    body: {
      en: 'This page is a placeholder for your main subscriber content. Add your prepared material here: macronutrient guidance, meal timing, food quality principles, hydration, weight management, muscle gain, digestion, and adherence strategy.',
      ru: 'Эта страница является шаблоном для вашего основного контента. Добавьте сюда подготовленные материалы: рекомендации по макронутриентам, времени приёма пищи, качеству продуктов, гидратации, управлению весом, набору мышечной массы, пищеварению и стратегии соблюдения режима.'
    }
  },
  {
    slug: 'supplement-basics',
    category: 'supplements',
    title: { en: 'Supplement Basics', ru: 'Основы добавок' },
    summary: {
      en: 'A view-only supplement guidance section.',
      ru: 'Раздел рекомендаций по добавкам только для просмотра.'
    },
    body: {
      en: 'Use this section for supplement guidance. Include safety notes, evidence level, dosing ranges where appropriate, and clear warnings to consult a qualified clinician where relevant.',
      ru: 'Используйте этот раздел для рекомендаций по добавкам. Добавьте заметки по безопасности, уровень доказательности, диапазоны дозировок при необходимости и предупреждения о консультации с квалифицированным специалистом.'
    }
  }
];

export function getContentItem(slug: string) {
  return contentItems.find((item) => item.slug === slug);
}
