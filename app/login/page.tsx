'use client';
import Reveal from '@/components/Reveal';
<Reveal>
  <div className="card">
    ...
  </div>
</Reveal>
import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase';

function LoginContent() {
  const router = useRouter();
  const params = useSearchParams();
  const lang = params.get('lang') === 'ru' ? 'ru' : 'en';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function login(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      router.push(`/dashboard?lang=${lang}`);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  const copy = lang === 'ru'
    ? { title: 'Войти', email: 'Email', password: 'Пароль', submit: 'Войти', signup: 'Нет аккаунта? Создать аккаунт' }
    : { title: 'Login', email: 'Email', password: 'Password', submit: 'Login', signup: 'No account? Sign up' };

  return (
    <main className="container">
      <div className="card" style={{ maxWidth: 460, margin: '60px auto' }}>
        <h1>{copy.title}</h1>

        <form onSubmit={login}>
          <label>{copy.email}</label>
          <input className="input" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />

          <label>{copy.password}</label>
          <input className="input" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />

          {error && <p className="warning">{error}</p>}

          <button type="submit" disabled={loading}>{loading ? '...' : copy.submit}</button>
        </form>

        <p><Link className="muted" href={`/signup?lang=${lang}`}>{copy.signup}</Link></p>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginContent />
    </Suspense>
  );
}