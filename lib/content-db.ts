import { createServerSupabase } from './supabase-server';
import { Lang } from './i18n';
import { contentItems } from '@/data/content';

export type DbContentItem = {
  id: string;
  slug: string;
  category: string;
  title_en: string;
  title_ru: string;
  summary_en: string;
  summary_ru: string;
  body_en: string;
  body_ru: string;
  published: boolean;
  created_at?: string;
  updated_at?: string;
};

export async function getPublishedContent() {
  const supabase = createServerSupabase();
  const { data, error } = await supabase
    .from('content_items')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false });

  if (error || !data || data.length === 0) {
    return contentItems.map((i, idx) => ({
      id: String(idx), slug: i.slug, category: i.category,
      title_en: i.title.en, title_ru: i.title.ru,
      summary_en: i.summary.en, summary_ru: i.summary.ru,
      body_en: i.body.en, body_ru: i.body.ru,
      published: true
    }));
  }
  return data as DbContentItem[];
}

export async function getAllContentForAdmin() {
  const supabase = createServerSupabase();
  const { data } = await supabase.from('content_items').select('*').order('created_at', { ascending: false });
  return (data || []) as DbContentItem[];
}

export async function getContentBySlug(slug: string) {
  const supabase = createServerSupabase();
  const { data } = await supabase.from('content_items').select('*').eq('slug', slug).eq('published', true).maybeSingle();
  if (data) return data as DbContentItem;
  const fallback = contentItems.find(i => i.slug === slug);
  if (!fallback) return null;
  return {
    id: slug, slug: fallback.slug, category: fallback.category,
    title_en: fallback.title.en, title_ru: fallback.title.ru,
    summary_en: fallback.summary.en, summary_ru: fallback.summary.ru,
    body_en: fallback.body.en, body_ru: fallback.body.ru,
    published: true
  };
}

export function localized(item: DbContentItem, lang: Lang) {
  return {
    title: lang === 'ru' ? item.title_ru : item.title_en,
    summary: lang === 'ru' ? item.summary_ru : item.summary_en,
    body: lang === 'ru' ? item.body_ru : item.body_en
  };
}
