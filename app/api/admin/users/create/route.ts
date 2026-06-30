import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase-admin';

export async function POST(request: Request) {
  const formData = await request.formData();

  const email = String(formData.get('email') || '');
  const password = String(formData.get('password') || '');

  const supabase = createAdminClient();

  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  if (error || !data.user) {
    return NextResponse.json(
      { error: error?.message || 'User creation failed' },
      { status: 400 }
    );
  }

  await supabase.from('profiles').insert({
    id: data.user.id,
    email,
    role: 'subscriber',
    subscription_status: 'active',
  });

  await supabase.from('subscriptions').insert({
    user_id: data.user.id,
    
    stripe_subscription_id: 'manual',
    stripe_customer_id: 'manual',
  });

  return NextResponse.redirect(new URL('/admin/users', request.url));
}