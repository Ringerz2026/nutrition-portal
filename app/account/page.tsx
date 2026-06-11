import Nav from '@/components/Nav';
import { requireUser } from '@/lib/auth';
import { getLang } from '@/lib/i18n';

export default async function AccountPage({ searchParams }: { searchParams?: { lang?: string } }) {
  const lang = getLang(searchParams);
  const { user, profile } = await requireUser(lang);

  const copy = lang === 'ru'
    ? { title: 'Аккаунт', status: 'Статус подписки', billing: 'Управлять оплатой' }
    : { title: 'Account', status: 'Subscription status', billing: 'Manage billing' };

  return (
    <>
      <Nav lang={lang} />
      <main className="container">
        <div className="card" style={{ maxWidth: 620 }}>
          <h1>{copy.title}</h1>
          <p className="muted">{user.email}</p>
          <p><strong>{copy.status}:</strong> {profile?.subscription_status || 'inactive'}</p>
          <form action="/api/stripe/portal" method="POST">
            <button type="submit">{copy.billing}</button>
          </form>
        </div>
      </main>
    </>
  );
}
