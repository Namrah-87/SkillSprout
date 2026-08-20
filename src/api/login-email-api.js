import { createClient } from '@supabase/supabase-js'

const supabase = createClient('https://yavfhhyrbcwgsyjsuwzu.supabase.co', 'sb_publishable_KkFAWS-xVB5FSWJu9uld2Q_VzOLe9Dk')

export async function loginWithEmail(user_email, user_password) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: user_email,
        password: user_password,
    })
    if (error) {
        return { success: false, error: error.message }
    }
    return { success: true, data }
}
