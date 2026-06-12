'use client';

import Link from 'next/link';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Reveal from '@/components/Reveal';

function HomeContent() {
  const params = useSearchParams();
  const lang = params.get('lang') === 'ru' ? 'ru' : 'en';
  const nextLang = lang === 'ru' ? 'en' : 'ru';

  const copy = lang === 'ru'
    ? {
        brand: 'Maria Nutrition',
        switch: 'English',
        login: 'Вход',
        signup: 'Получить доступ',
        hero: 'Персональное питание для здоровья, энергии и долгосрочного благополучия.',
        intro: 'Закрытая платформа с протоколами питания, рецептами и образовательными материалами на русском и английском языке.',
        about: 'О подходе',
        aboutText: 'Практичные рекомендации, основанные на нутрициологии, образе жизни и устойчивых привычках. Платформа помогает клиентам лучше понимать питание и применять знания в повседневной жизни.',
        gut: 'Здоровье кишечника',
        weight: 'Контроль веса',
        hormones: 'Гормоны и энергия',
        family: 'Семейное питание',
        content: 'Закрытая библиотека',
        contentText: 'Участники получают доступ к материалам, статьям, рецептам и протоколам в удобном личном кабинете.',
        cta: 'Перейти в личный кабинет',
        cardText: 'Практичные рекомендации, которые легко применять в реальной жизни.'
      }
    : {
        brand: 'Maria Nutrition',
        switch: 'Русский',
        login: 'Login',
        signup: 'Access member area',
        hero: 'Personalised nutrition guidance for long-term health, energy and wellbeing.',
        intro: 'A private platform with structured nutrition protocols, recipes and educational content in English and Russian.',
        about: 'The approach',
        aboutText: 'Practical, evidence-informed guidance focused on nutrition, lifestyle and sustainable habits. The platform helps clients understand nutrition and apply it in daily life.',
        gut: 'Gut Health',
        weight: 'Weight Management',
        hormones: 'Hormones & Energy',
        family: 'Family Nutrition',
        content: 'Private content library',
        contentText: 'Members can access articles, recipes, protocols and programme materials through a secure dashboard.',
        cta: 'Go to dashboard',
        cardText: 'Structured guidance designed to be practical, realistic and easy to follow.'
      };

  return (
    <main className="premiumHome">
      <header className="premiumNav">
        <Link href={`/?lang=${lang}`} className="premiumBrand">
          {copy.brand}
        </Link>

        <nav>
          <Link href={`/?lang=${nextLang}`}>{copy.switch}</Link>
          <Link href={`/login?lang=${lang}`}>{copy.login}</Link>
          <Link className="button small" href={`/signup?lang=${lang}`}>
            {copy.signup}
          </Link>
        </nav>
      </header>

      <Reveal>
       <div className="heroImageWrap">
  <img src="/images/maria-hero.jpg" alt="Maria Nutrition" className="heroImage" />
</div>
            <p className="eyebrow">Premium Nutrition Platform</p>
            <h1>{copy.hero}</h1>
            <p>{copy.intro}</p>

            <div className="heroButtons">
              <Link className="button" href={`/signup?lang=${lang}`}>
                {copy.signup}
              </Link>
              <Link className="button secondary" href={`/login?lang=${lang}`}>
                {copy.login}
              </Link>
            </div>
          </div>

          <div className="heroCard">
            <p>Gut health</p>
            <p>Metabolism</p>
            <p>Energy</p>
            <p>Lifestyle</p>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="homeSection">
          <p className="eyebrow">{copy.about}</p>
          <h2>{copy.aboutText}</h2>
        </section>
      </Reveal>

      <section className="serviceGrid">
        {[copy.gut, copy.weight, copy.hormones, copy.family].map((item) => (
          <Reveal key={item}>
            <div className="premiumCard">
              <h3>{item}</h3>
              <p>{copy.cardText}</p>
            </div>
          </Reveal>
        ))}
      </section>

      <Reveal>
        <section className="homeSection alt">
          <div>
            <p className="eyebrow">{copy.content}</p>
            <h2>{copy.contentText}</h2>
            <Link className="button" href={`/dashboard?lang=${lang}`}>
              {copy.cta}
            </Link>
          </div>
        </section>
      </Reveal>
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