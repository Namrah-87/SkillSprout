import { createClient } from '@supabase/supabase-js'
export async function check_onboard(update) {
    const supabase = createClient('https://yavfhhyrbcwgsyjsuwzu.supabase.co', 'sb_publishable_KkFAWS-xVB5FSWJu9uld2Q_VzOLe9Dk')
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
        const { data, error } = await supabase
            .from('profiles')
            .select('has_completed_onboarding') // <--- Specify the column here
            .eq('id', user.id) // <--- Filter for the specific row here
            .single();             // <--- Forces the response to return an object instead of an array
        return profile.has_completed_onboarding
    }
    if (update) {
        const { error } = await supabase
        .from('profiles')
        .update({ has_completed_onboarding: true })
        .eq('id', user.id)     
    }
}