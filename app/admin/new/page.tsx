import Nav from '@/components/Nav';
import { requireAdmin } from '@/lib/supabase-server';
import { createContent } from '../actions';

export default async function NewContentPage() {
  await requireAdmin();
  return (
    <>
      <Nav lang="en" />
      <main className="container article">
        <h1>Add content</h1>
        <form action={createContent} className="card">
          <label>Slug</label><input className="input" name="slug" placeholder="nutrition-principles" />
          <label>Category</label><input className="input" name="category" defaultValue="primary" />
          <label>English title</label><input className="input" name="title_en" required />
          <label>Russian title</label><input className="input" name="title_ru" />
          <label>English summary</label><textarea className="input" name="summary_en" rows={3} />
          <label>Russian summary</label><textarea className="input" name="summary_ru" rows={3} />
          <label>English body</label><textarea className="input" name="body_en" rows={10} />
          <label>Russian body</label><textarea className="input" name="body_ru" rows={10} />
          <label><input type="checkbox" name="published" /> Published</label>
          <p><button type="submit">Save content</button></p>
        </form>
      </main>
    </>
  );
}
