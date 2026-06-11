import { createServerSupabaseClient } from '@/lib/supabase/server';
import { contentItems, ContentItem, getContentItem as getStaticContentItem } from '@/data/content';

export type DbContentItem = ContentItem & {
  id?: string;
  is_published?: boolean;
  updated_at?: string;
};

function mapRow(row: any): DbContentItem {
  return {
    id: row.id,
    slug: row.slug,
    category: row.category,
    title: { en: row.title_en, ru: row.title_ru },
    summary: { en: row.summary_en || '', ru: row.summary_ru || '' },
    body: { en: row.body_en, ru: row.body_ru },
    is_published: row.is_published,
    updated_at: row.updated_at
  };
}

export async function getPublishedContentItems(): Promise<DbContentItem[]> {
  try {
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from('content_items')
      .select('*')
      .eq('is_published', true)
      .order('created_at', { ascending: false });

    if (error || !data) return contentItems;
    return data.map(mapRow);
  } catch {
    return contentItems;
  }
}

export async function getAllContentItems(): Promise<DbContentItem[]> {
  try {
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from('content_items')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data) return contentItems;
    return data.map(mapRow);
  } catch {
    return contentItems;
  }
}

export async function getContentItem(slug: string): Promise<DbContentItem | undefined> {
  try {
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from('content_items')
      .select('*')
      .eq('slug', slug)
      .eq('is_published', true)
      .single();

    if (error || !data) return getStaticContentItem(slug);
    return mapRow(data);
  } catch {
    return getStaticContentItem(slug);
  }
}
