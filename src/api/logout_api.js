import { createClient } from '@supabase/supabase-js'
export async function logout() {
    const supabase = createClient('https://yavfhhyrbcwgsyjsuwzu.supabase.co', 'sb_publishable_KkFAWS-xVB5FSWJu9uld2Q_VzOLe9Dk')
    const { error } = await supabase.auth.signOut()
    if (error) {
        console.error('Error signing out:', error.message)
    } else {
        window.location.replace("/login")
    }
}