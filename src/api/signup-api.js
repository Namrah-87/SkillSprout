import { createClient } from '@supabase/supabase-js' 

const supabase = createClient('https://yavfhhyrbcwgsyjsuwzu.supabase.co', 'sb_publishable_KkFAWS-xVB5FSWJu9uld2Q_VzOLe9Dk') 

// Add the "export" keyword here
export async function signUpNewUser(user_email, user_password, name_var, user_name) { 
  const { data, error } = await supabase.auth.signUp({ 
    email: user_email, 
    password: user_password, 
    options: { 
      emailRedirectTo: 'https://skillsprout-dp4.pages.dev/home', 
    }, 
  }) 

  if (error) {
    return { success: false, error: error.message }
  }
  else {
    let userId = null;
    const { data: authData, error: authError } = await supabase.auth.getUser();
    if (authError) {
      console.warn("[WARN] Auth check failed or session not loaded yet:", authError.message);
      return;
    }
    userId = authData?.user?.id;
    if (!userId) {
      console.warn("[WARN] Action aborted: Supabase session is still initializing or user is logged out.");
      return;
    }
    const { error: updateError } = await supabase
    .from('profiles')
    .update({ name: name_var })
    .eq('id', userId);

  if (updateError) {
    console.error("[ERROR] PROFILE UPDATE FAILED:", updateError.message);
    return;
  }
  const { error: updateError2 } = await supabase
  .from('profiles')
  .update({ username: user_name })
  .eq('id', userId);

if (updateError2) {
  console.error("[ERROR] PROFILE UPDATE FAILED:", updateError.message);
  return;
}
    
    
  }
  return { success: true, data }
}
