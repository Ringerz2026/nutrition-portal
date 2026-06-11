'use client';

import Link from 'next/link';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function HomeContent() {
  const params = useSearchParams();
  const lang = params.get('lang') === 'ru' ? 'ru' : 'en';

  const copy =
    lang === 'ru'
      ? {
          title: 'Maria Nutrition',
          subtitle:
            'Персональное питание для здоровья, энергии и долгосрочного благополучия.',
          signup: 'Регистрация',
          login: 'Вход',
          switch: 'English',
        }
      : {
          title: 'Maria Nutrition',
          subtitle:
            'Personalised nutrition guidance for long-term health and wellbeing.',
          signup: 'Sign Up',
          login: 'Login',
          switch: 'Русский',
        };

  const nextLang = lang === 'ru' ? 'en' : 'ru';

  return (
    <main
      style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '80px 24px',
      }}
    >
      <nav
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '60px',
        }}
      >
        <h2>{copy.title}</h2>

        <div style={{ display: 'flex', gap: '16px' }}>
          <Link href={`/?lang=${nextLang}`}>{copy.switch}</Link>
          <Link href={`/login?lang=${lang}`}>{copy.login}</Link>
          <Link href={`/signup?lang=${lang}`}>{copy.signup}</Link>
        </div>
      </nav>

      <section style={{ textAlign: 'center', padding: '80px 0' }}>
        <h1
          style={{
            fontSize: '56px',
            marginBottom: '24px',
          }}
        >
          {copy.title}
        </h1>

        <p
          style={{
            fontSize: '22px',
            maxWidth: '700px',
            margin: '0 auto 40px',
          }}
        >
          {copy.subtitle}
        </p>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '16px',
            flexWrap: 'wrap',
          }}
        >
          <Link href={`/signup?lang=${lang}`}>
            {copy.signup}
          </Link>

          <Link href={`/login?lang=${lang}`}>
            {copy.login}
          </Link>
        </div>
      </section>

      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))',
          gap: '24px',
          marginTop: '60px',
        }}
      >
        <div className="card">
          <h3>Gut Health</h3>
          <p>Evidence-based guidance and nutrition education.</p>
        </div>

        <div className="card">
          <h3>Weight Management</h3>
          <p>Sustainable strategies for long-term results.</p>
        </div>

        <div className="card">
          <h3>Bilingual Content</h3>
          <p>Available in English and Russian.</p>
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