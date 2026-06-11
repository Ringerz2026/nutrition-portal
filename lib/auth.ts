import { redirect } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { ACTIVE_STATUSES } from '@/lib/stripe';

export type Profile = {
  id: string;
  full_name: string | null;
  role: 'admin' | 'subscriber';
  subscription_status: string | null;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  preferred_language: string | null;
};

export async function getCurrentUserAndProfile() {
  const supabase = createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { user: null, profile: null };

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  return { user, profile: profile as Profile | null };
}

export async function requireUser(lang = 'en') {
  const { user, profile } = await getCurrentUserAndProfile();
  if (!user) redirect(`/login?lang=${lang}`);
  return { user, profile };
}

export async function requireActiveSubscriber(lang = 'en') {
  const { user, profile } = await requireUser(lang);
  const isAdmin = profile?.role === 'admin';
  const isActive = profile?.subscription_status && ACTIVE_STATUSES.includes(profile.subscription_status);

  if (!isAdmin && !isActive) {
    redirect(`/subscribe?lang=${lang}`);
  }

  return { user, profile };
}

export async function requireAdmin(lang = 'en') {
  const { user, profile } = await requireUser(lang);
  if (profile?.role !== 'admin') redirect(`/dashboard?lang=${lang}`);
  return { user, profile };
}
