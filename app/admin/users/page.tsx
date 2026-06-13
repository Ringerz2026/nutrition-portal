import Nav from '@/components/Nav';
import { createAdminClient } from '@/lib/supabase-admin';


export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams?: { lang?: string };
}) {
  const lang = searchParams?.lang === 'ru' ? 'ru' : 'en';
  const supabase = createAdminClient();

  const { data, error } = await supabase.auth.admin.listUsers();

  return (
    <>
      <Nav lang={lang} />

      <main className="container">
        <h1>Client Access</h1>
        <p className="muted">
          Create client logins, view existing users and remove access.
        </p>

        <form action="/api/admin/users/create" method="post" className="card">
          <h2>Add client</h2>

          <label>Email</label>
          <input className="input" name="email" type="email" required />

          <label>Temporary password</label>
          <input
            className="input"
            name="password"
            type="text"
            required
            minLength={8}
          />

          <button type="submit">Create client access</button>
        </form>

        {error && <p className="warning">{error.message}</p>}

        <div className="grid" style={{ marginTop: 24 }}>
          {data?.users.map((user) => (
            <div className="card" key={user.id}>
              <h3>{user.email}</h3>
              <p>Status: {user.banned_until ? 'Inactive' : 'Active'}</p>

              <form action="/api/admin/users/deactivate" method="post">
                <input type="hidden" name="userId" value={user.id} />
                <button type="submit">Deactivate</button>
              </form>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}