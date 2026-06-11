import Link from 'next/link';
import Nav from '@/components/Nav';
import LanguageSwitch from '@/components/LanguageSwitch';
import { getContentBySlug, localized } from '@/lib/content-db';
import { getLang } from '@/lib/i18n';
import { notFound } from 'next/navigation';
import { requireActiveSubscriber } from '@/lib/supabase-server';

export default async function ContentPage({ params, searchParams }: { params: { slug: string }; searchParams?: { lang?: string } }) {
  await requireActiveSubscriber();
  const lang = getLang(searchParams);
  const item = await getContentBySlug(params.slug);
  if (!item) notFound();
  const text = localized(item, lang);

  const copy = lang === 'ru'
    ? { back: 'Назад в кабинет', viewOnly: 'Материал только для просмотра.' }
    : { back: 'Back to dashboard', viewOnly: 'View-only subscriber material.' };

  return (
    <>
      <Nav lang={lang} />
      <main className="container article no-select">
        <LanguageSwitch lang={lang} path={`/content/${item.slug}`} />
        <p><Link className="muted" href={`/dashboard?lang=${lang}`}>← {copy.back}</Link></p>
        <span className="badge">{copy.viewOnly}</span>
        <h1>{text.title}</h1>
        <p style={{ whiteSpace: 'pre-wrap' }}>{text.body}</p>
      </main>
    </>
  );
}
import Reveal from '@/components/Reveal';
<Reveal>
  <div className="card">
    ...
  </div>
</Reveal>