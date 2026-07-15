import { createAdminClient } from '@/lib/supabase-admin';
import { redirect } from 'next/navigation';

export async function POST(request: Request) {
  const formData = await request.formData();
  const userId = String(formData.get('userId'));

  const supabase = createAdminClient();

  await supabase.auth.admin.updateUserById(userId, {
    ban_duration: 'none',
  });

  redirect('/admin/users');
}