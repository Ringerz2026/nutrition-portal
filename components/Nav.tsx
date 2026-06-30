import Link from 'next/link';
import { Lang, dictionary } from '@/lib/i18n';

export default function Nav({ lang = 'en' }: { lang?: Lang }) {
  const t = dictionary[lang];
  const toggleLang = lang === 'en' ? 'ru' : 'en';

  return (
    <nav className="nav">
      <Link className="logo" href={`/?lang=${lang}`}>
        Nutrition Portal
      </Link>

      <div className="navlinks">
        <Link href={`/dashboard?lang=${lang}`}>{t.dashboard}</Link>
        <Link href={`/account?lang=${lang}`}>Account</Link>
        <Link href={`/admin/users?lang=${lang}`}>{t.admin}</Link>

        <Link className="button ghost" href={`?lang=${toggleLang}`}>
          {toggleLang.toUpperCase()}
        </Link>

        <Link className="button" href="/api/auth/signout">
          Logout
        </Link>
      </div>
    </nav>
  );
}