import { createClient } from '@supabase/supabase-js' 

const supabase = createClient('https://yavfhhyrbcwgsyjsuwzu.supabase.co', 'sb_publishable_KkFAWS-xVB5FSWJu9uld2Q_VzOLe9Dk') 

// Add the "export" keyword here
export async function signUpNewUser(user_email, user_password) { 
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

  return { success: true, data }
}
