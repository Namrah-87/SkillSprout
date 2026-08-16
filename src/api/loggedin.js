import { createClient } from '@supabase/supabase-js';

export async function check() {
  const supabase = createClient(
    'https://yavfhhyrbcwgsyjsuwzu.supabase.co',
    'sb_publishable_KkFAWS-xVB5FSWJu9uld2Q_VzOLe9Dk'
  );

  const { data: { user }, error } = await supabase.auth.getUser();

  if (error) {
    console.warn('Supabase auth check failed:', error.message);
    return null;
  }

  return user;
}