import { createAdminClient } from '@/lib/supabase-admin';

export default async function AdminUsersPage() {
  const supabase = createAdminClient();
  const { data, error } = await supabase.auth.admin.listUsers();

  return (
    <main className="container">
      <h1>Client Access</h1>

      <p>
        Create client logins, view existing users and remove access.
      </p>

      <form action="/api/admin/users/create" method="post" className="card">
        <h2>Add client</h2>

        <label>Email</label>
        <input className="input" name="email" type="email" required />

        <label>Temporary password</label>
        <input className="input" name="password" type="text" required minLength={8} />

        <button type="submit">Create client access</button>
      </form>

      {error && <p>{error.message}</p>}

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
  );
}