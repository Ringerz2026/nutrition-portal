import Link from 'next/link';
import { Lang } from '@/lib/i18n';

type LanguageSwitchProps = {
  lang?: Lang;
  path?: string;
};

export default function LanguageSwitch({
  lang = 'en',
  path = ''
}: LanguageSwitchProps) {
  const toggleLang = lang === 'en' ? 'ru' : 'en';
  const href = `${path || ''}?lang=${toggleLang}`;

  return (
    <Link className="button ghost" href={href}>
      {toggleLang.toUpperCase()}
    </Link>
  );
}