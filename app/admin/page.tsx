import Link from 'next/link';
import Nav from '@/components/Nav';
import { getAllContentForAdmin } from '@/lib/content-db';
import { requireAdmin } from '@/lib/supabase-server';
import { deleteContent } from './actions';

export default async function AdminPage() {
  await requireAdmin();
  const items = await getAllContentForAdmin();

  return (
    <>
      <Nav lang="en" />
      <main className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'center' }}>
          <div>
            <h1>Admin area</h1>
            <p className="lead">Upload, edit, publish and unpublish subscriber materials.</p>
          </div>
          <Link className="button" href="/admin/new">Add content</Link>
        </div>
        <section className="grid two">
          {items.map((item) => (
            <div className="card" key={item.id}>
              <span className="badge">{item.published ? 'Published' : 'Draft'} · {item.category}</span>
              <h3>{item.title_en}</h3>
              <p className="muted">/{item.slug}</p>
              <div style={{ display: 'flex', gap: 10 }}>
                <Link className="button secondary" href={`/admin/edit/${item.id}`}>Edit</Link>
                <form action={deleteContent}><input type="hidden" name="id" value={item.id} /><button className="button ghost" type="submit">Delete</button></form>
              </div>
            </div>
          ))}
          {items.length === 0 && <p className="muted">No database content yet. Add your first material.</p>}
        </section>
      </main>
    </>
  );
}
