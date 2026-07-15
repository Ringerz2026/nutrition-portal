import Nav from '@/components/Nav';
import { requireAdmin } from '@/lib/auth';

export default async function AdminUsersPage() {
  await requireAdmin();

  return (
    <>
      <Nav />
      <main className="container">
        <h1>Users</h1>
        <p>User management page goes here.</p>
      </main>
    </>
  );
}