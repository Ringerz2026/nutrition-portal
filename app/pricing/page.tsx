import Nav from '@/components/Nav';
import { requireUser, isActiveSubscriber } from '@/lib/supabase-server';
import { redirect } from 'next/navigation';

export default async function PricingPage() {
  const user = await requireUser();
  const active = await isActiveSubscriber(user.id);
  if (active) redirect('/dashboard');

  return (
    <>
      <Nav lang="en" />
      <main className="container">
        <section className="hero">
          <div>
            <h1>Subscribe to access the nutrition platform.</h1>
            <p className="lead">Secure access to member-only nutrition materials in English and Russian.</p>
          </div>
          <form action="/api/stripe/checkout" method="POST" className="card">
            <span className="badge">Subscriber plan</span>
            <h2>Monthly access</h2>
            <p className="muted">Payment handled securely by Stripe. Access is automatically unlocked after payment.</p>
            <button type="submit">Subscribe with Stripe</button>
          </form>
        </section>
      </main>
    </>
  );
}
