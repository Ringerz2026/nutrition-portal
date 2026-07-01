import Nav from '@/components/Nav';
import LanguageSwitch from '@/components/LanguageSwitch';
import { getPublishedContent, localized } from '@/lib/content-db';
import { getLang, dictionary } from '@/lib/i18n';
import { requireActiveSubscriber } from '@/lib/supabase-server';
import Link from 'next/link';

export default async function Dashboard({ searchParams }: { searchParams?: { lang?: string } }) {
  await requireActiveSubscriber();
  const lang = getLang(searchParams);
  const t = dictionary[lang];
  const items = await getPublishedContent();

  const copy = lang === 'ru'
    ? { title: 'Кабинет подписчика', lead: 'Доступ к вводным и основным материалам по питанию.' }
    : { title: 'Subscriber dashboard', lead: 'Access introductory and primary nutrition materials.' };

  const renderCards = (category: string) => items.filter(i => category === 'primary' ? i.category !== 'intro' : i.category === category).map(item => {
    const text = localized(item, lang);
    return (
      <div className="card" key={item.id}>
        <span className="badge">{item.category}</span>
        <h3>{text.title}</h3>
        <p className="muted">{text.summary}</p>
        <Link className="button secondary" href={`/content/${item.slug}?lang=${lang}`}>{t.view}</Link>
      </div>
    );
  });

  return (
    <>
      <Nav lang={lang} />
      <main className="container">
        <LanguageSwitch lang={lang} path="/dashboard" />
        <h1>{copy.title}</h1>
        <p className="lead">{copy.lead}</p>
        <h2>{t.intro}</h2>
        <section className="grid">{renderCards('intro')}</section>
        <h2 style={{ marginTop: 40 }}>{t.primary}</h2>
        <section className="grid">{renderCards('primary')}</section>
      </main>
    </>
  );
}
