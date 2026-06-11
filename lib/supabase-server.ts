import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { redirect } from 'next/navigation';

export function createServerSupabase() {
  const cookieStore = cookies();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  return createServerClient(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet: any[]) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // Server Components cannot always set cookies. Middleware refreshes them.
        }
      }
    }
  });
}

export function createServiceSupabase() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}

export async function getCurrentUser() {
  const supabase = createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) redirect('/login');
  return user;
}

export async function getProfile(userId: string) {
  const supabase = createServerSupabase();
  const { data } = await supabase.from('profiles').select('*').eq('id', userId).single();
  return data;
}

export async function isActiveSubscriber(userId: string) {
  const supabase = createServerSupabase();
  const { data } = await supabase
    .from('subscriptions')
    .select('status, current_period_end')
    .eq('user_id', userId)
    .in('status', ['active', 'trialing'])
    .maybeSingle();

  if (!data) return false;
  if (!data.current_period_end) return true;
  return new Date(data.current_period_end).getTime() > Date.now();
}

export async function requireActiveSubscriber() {
  const user = await requireUser();
  const profile = await getProfile(user.id);
  if (profile?.role === 'admin') return { user, profile };
  const active = await isActiveSubscriber(user.id);
  if (!active) redirect('/pricing');
  return { user, profile };
}

export async function requireAdmin() {
  const user = await requireUser();
  const profile = await getProfile(user.id);
  if (profile?.role !== 'admin') redirect('/dashboard');
  return { user, profile };
}
