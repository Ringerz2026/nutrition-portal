import Nav from '@/components/Nav';
import { requireAdmin, createServerSupabase } from '@/lib/supabase-server';
import { updateContent } from '../../actions';
import { notFound } from 'next/navigation';

export default async function EditContentPage({ params }: { params: { id: string } }) {
  await requireAdmin();
  const supabase = createServerSupabase();
  const { data: item } = await supabase.from('content_items').select('*').eq('id', params.id).single();
  if (!item) notFound();

  return (
    <>
      <Nav lang="en" />
      <main className="container article">
        <h1>Edit content</h1>
        <form action={updateContent} className="card">
          <input type="hidden" name="id" value={item.id} />
          <label>Slug</label><input className="input" name="slug" defaultValue={item.slug} />
          <label>Category</label><input className="input" name="category" defaultValue={item.category} />
          <label>English title</label><input className="input" name="title_en" defaultValue={item.title_en} required />
          <label>Russian title</label><input className="input" name="title_ru" defaultValue={item.title_ru} />
          <label>English summary</label><textarea className="input" name="summary_en" rows={3} defaultValue={item.summary_en} />
          <label>Russian summary</label><textarea className="input" name="summary_ru" rows={3} defaultValue={item.summary_ru} />
          <label>English body</label><textarea className="input" name="body_en" rows={10} defaultValue={item.body_en} />
          <label>Russian body</label><textarea className="input" name="body_ru" rows={10} defaultValue={item.body_ru} />
          <label><input type="checkbox" name="published" defaultChecked={item.published} /> Published</label>
          <p><button type="submit">Update content</button></p>
        </form>
      </main>
    </>
  );
}
