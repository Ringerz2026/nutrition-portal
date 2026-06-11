'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase';

function SignupContent() {
  const router = useRouter();
  const params = useSearchParams();
  const lang = params.get('lang') === 'ru' ? 'ru' : 'en';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function signUp(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      router.push(`/subscribe?lang=${lang}`);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign up failed');
    } finally {
      setLoading(false);
    }
  }

  const copy = lang === 'ru'
    ? { title: 'Создать аккаунт', email: 'Email', password: 'Пароль', submit: 'Создать аккаунт', login: 'Уже есть аккаунт? Войти' }
    : { title: 'Create account', email: 'Email', password: 'Password', submit: 'Create account', login: 'Already have an account? Login' };

  return (
    <main className="container">
      <div className="card" style={{ maxWidth: 460, margin: '60px auto' }}>
        <h1>{copy.title}</h1>
        <form onSubmit={signUp}>
          <label>{copy.email}</label>
          <input className="input" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />

          <label>{copy.password}</label>
          <input className="input" type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} />

          {error && <p className="warning">{error}</p>}

          <button type="submit" disabled={loading}>{loading ? '...' : copy.submit}</button>
        </form>

        <p><Link className="muted" href={`/login?lang=${lang}`}>{copy.login}</Link></p>
      </div>
    </main>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={null}>
      <SignupContent />
    </Suspense>
  );
}