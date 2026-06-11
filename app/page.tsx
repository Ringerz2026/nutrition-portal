'use client';

import Link from 'next/link';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Reveal from '@/components/Reveal';
'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Reveal from '@/components/Reveal';

function HomeContent() {
  const params = useSearchParams();
  const lang = params.get('lang') === 'ru' ? 'ru' : 'en';
  const toggleLang = lang === 'ru' ? 'en' : 'ru';

  const copy = lang === 'ru'
    ? {
        eyebrow: 'Премиальная нутрициологическая платформа',
        title: 'Персональное питание для здоровья, энергии и долгосрочного благополучия.',
        intro: 'Получайте доступ к протоколам питания, рецептам и образовательным материалам на русском и английском языке в закрытой зоне для участников.',
        signup: 'Получить доступ',
        login: 'Войти',
        panelSmall: 'Научный подход к питанию',
        panelTitle: 'Кишечник · Метаболизм · Энергия · Образ жизни',
        panelBadge: 'Закрытая библиотека материалов',
        included: 'Что включено',
        includedTitle: 'Понятные рекомендации, практические инструменты и структурированное обучение.',
        c1: 'Протоколы питания',
        c1p: 'Рекомендации по воде, пищеварению, сахару, кишечнику и устойчивым пищевым привычкам.',
        c2: 'Рецепты и идеи питания',
        c2p: 'Простые блюда и рецепты, которые помогают питаться здорово без усложнений.',
        c3: 'Два языка',
        c3p: 'Основные материалы доступны на русском и английском языке.',
        member: 'Для участников',
        memberTitle: 'Закрытая библиотека питания для обучения и регулярности.',
        memberText: 'Участники могут безопасно входить в личный кабинет, читать материалы и проходить программу в удобном темпе.',
        dashboard: 'Перейти в кабинет'
      }
    : {
        eyebrow: 'Premium Nutrition Platform',
        title: 'Personalised nutrition guidance for long-term health and wellbeing.',
        intro: 'Access structured nutrition protocols, recipes and educational content in English and Russian through a secure member area.',
        signup: 'Access member area',
        login: 'Login',
        panelSmall: 'Evidence-based nutrition',
        panelTitle: 'Gut health · Metabolism · Energy · Lifestyle',
        panelBadge: 'Members-only content library',
        included: 'What’s included',
        includedTitle: 'Clear guidance, practical tools and structured learning.',
        c1: 'Nutrition Protocols',
        c1p: 'Structured guidance for hydration, digestion, blood sugar, gut health and sustainable eating habits.',
        c2: 'Recipes & Meal Ideas',
        c2p: 'Simple meals and recipes designed to make healthy eating consistent, realistic and enjoyable.',
        c3: 'Bilingual Content',
        c3p: 'All key materials can be accessed in English and Russian for a complete bilingual experience.',
        member: 'For members',
        memberTitle: 'A private nutrition library designed around education and consistency.',
        memberText: 'Subscribers can log in securely, access published materials, read articles and follow the programme at their own pace.',
        dashboard: 'Go to dashboard'
      };

  return (
    <main>
      <header className="premiumTopbar">
        <Link className="premiumLogo" href={`/?lang=${lang}`}>
          Maria Nutrition
        </Link>

        <nav className="premiumTopnav">
          <Link href={`/?lang=${toggleLang}`}>{toggleLang.toUpperCase()}</Link>
          <Link href={`/login?lang=${lang}`}>{copy.login}</Link>
          <Link className="button small" href={`/signup?lang=${lang}`}>{copy.signup}</Link>
        </nav>
      </header>

      <section className="premiumHero">
        <div className="container premiumHeroGrid">
          <Reveal>
            <div>
              <p className="eyebrow">{copy.eyebrow}</p>
              <h1>{copy.title}</h1>
              <p className="heroText">{copy.intro}</p>
              <div className="heroButtons">
                <Link className="button" href={`/signup?lang=${lang}`}>{copy.signup}</Link>
                <Link className="button secondary" href={`/login?lang=${lang}`}>{copy.login}</Link>
                <Link className="button ghost" href={`/?lang=${toggleLang}`}>{toggleLang.toUpperCase()}</Link>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="heroPanel">
              <p>{copy.panelSmall}</p>
              <h2>{copy.panelTitle}</h2>
              <span>{copy.panelBadge}</span>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="premiumSection">
        <div className="container">
          <Reveal>
            <p className="eyebrow">{copy.included}</p>
            <h2>{copy.includedTitle}</h2>
          </Reveal>

          <div className="premiumGrid">
            <Reveal>
              <div className="premiumCard">
                <h3>{copy.c1}</h3>
                <p>{copy.c1p}</p>
              </div>
            </Reveal>

            <Reveal>
              <div className="premiumCard">
                <h3>{copy.c2}</h3>
                <p>{copy.c2p}</p>
              </div>
            </Reveal>

            <Reveal>
              <div className="premiumCard">
                <h3>{copy.c3}</h3>
                <p>{copy.c3p}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="premiumSection alt">
        <div className="container premiumSplit">
          <Reveal>
            <div>
              <p className="eyebrow">{copy.member}</p>
              <h2>{copy.memberTitle}</h2>
            </div>
          </Reveal>

          <Reveal>
            <div className="premiumCard">
              <p>{copy.memberText}</p>
              <Link className="button" href={`/dashboard?lang=${lang}`}>{copy.dashboard}</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
export default function HomePage() {
  return (
    <Suspense fallback={null}>
      <HomeContent />
    </Suspense>
  );
}