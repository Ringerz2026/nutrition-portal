import Nav from '@/components/Nav';
import LanguageSwitch from '@/components/LanguageSwitch';
import { requireUser } from '@/lib/auth';
import { getLang } from '@/lib/i18n';

export default async function SubscribePage({ searchParams }: { searchParams?: { lang?: string } }) {
  const lang = getLang(searchParams);
  await requireUser(lang);

  const copy = lang === 'ru'
    ? { title: 'Активируйте подписку', lead: 'Оформите подписку, чтобы открыть доступ к материалам.', cta: 'Оплатить подписку', note: 'После оплаты Stripe вернёт вас в кабинет.' }
    : { title: 'Activate your subscription', lead: 'Subscribe to unlock the nutrition materials.', cta: 'Subscribe now', note: 'After payment, Stripe returns you to the dashboard.' };

  return (
    <>
      <Nav lang={lang} />
      <main className="container">
        <LanguageSwitch lang={lang} path="/subscribe" />
        <div className="card" style={{ maxWidth: 620 }}>
          <span className="badge">Subscription required</span>
          <h1>{copy.title}</h1>
          <p className="lead">{copy.lead}</p>
          <form action="/api/stripe/checkout" method="POST">
            <input type="hidden" name="lang" value={lang} />
            <button type="submit">{copy.cta}</button>
          </form>
          <p className="muted">{copy.note}</p>
        </div>
      </main>
    </>
  );
}
