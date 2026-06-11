'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { requireAdmin, createServerSupabase } from '@/lib/supabase-server';

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

export async function createContent(formData: FormData) {
  await requireAdmin();
  const supabase = createServerSupabase();
  const titleEn = String(formData.get('title_en') || '');
  const slug = slugify(String(formData.get('slug') || titleEn));

  await supabase.from('content_items').insert({
    slug,
    category: String(formData.get('category') || 'primary'),
    title_en: titleEn,
    title_ru: String(formData.get('title_ru') || ''),
    summary_en: String(formData.get('summary_en') || ''),
    summary_ru: String(formData.get('summary_ru') || ''),
    body_en: String(formData.get('body_en') || ''),
    body_ru: String(formData.get('body_ru') || ''),
    published: formData.get('published') === 'on'
  });

  revalidatePath('/dashboard');
  revalidatePath('/admin');
  redirect('/admin');
}

export async function updateContent(formData: FormData) {
  await requireAdmin();
  const supabase = createServerSupabase();
  const id = String(formData.get('id'));
  const titleEn = String(formData.get('title_en') || '');
  const slug = slugify(String(formData.get('slug') || titleEn));

  await supabase.from('content_items').update({
    slug,
    category: String(formData.get('category') || 'primary'),
    title_en: titleEn,
    title_ru: String(formData.get('title_ru') || ''),
    summary_en: String(formData.get('summary_en') || ''),
    summary_ru: String(formData.get('summary_ru') || ''),
    body_en: String(formData.get('body_en') || ''),
    body_ru: String(formData.get('body_ru') || ''),
    published: formData.get('published') === 'on'
  }).eq('id', id);

  revalidatePath('/dashboard');
  revalidatePath('/admin');
  redirect('/admin');
}

export async function deleteContent(formData: FormData) {
  await requireAdmin();
  const supabase = createServerSupabase();
  await supabase.from('content_items').delete().eq('id', String(formData.get('id')));
  revalidatePath('/dashboard');
  revalidatePath('/admin');
}
