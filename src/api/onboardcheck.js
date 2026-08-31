import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://yavfhhyrbcwgsyjsuwzu.supabase.co',
  'sb_publishable_KkFAWS-xVB5FSWJu9uld2Q_VzOLe9Dk'
);

export async function check_onboard(update, check, hear) {
  try {
    let userId = null;

    // -----------------------------------------
    // STEP 1: Safely resolve the User's ID
    // -----------------------------------------
    if (check) {
      // getUser() performs an API check to guarantee token validity
      const { data: authData, error: authError } = await supabase.auth.getUser();

      if (authError) {
        // If it fails because the token isn't ready yet, log it gently and stop
        console.warn("[WARN] Auth check failed or session not loaded yet:", authError.message);
        return;
      }

      userId = authData?.user?.id;
    } else {
      // getSession() checks local memory/storage without throwing an error if it's missing
      const { data: sessionData } = await supabase.auth.getSession();
      userId = sessionData?.session?.user?.id;
    }

    // Safety fallback: if the session isn't loaded yet, do not try to run queries
    if (!userId) {
      console.warn("[WARN] Action aborted: Supabase session is still initializing or user is logged out.");
      return;
    }

    // -----------------------------------------
    // STEP 2: Query profiles table (Only if check is true)
    // -----------------------------------------
    if (check) {
      const { data, error } = await supabase
        .from('profiles')
        .select('has_completed_onboarding')
        .eq('id', userId)
        .single();

      if (error) {
        console.error("[ERROR] PROFILE QUERY FAILED:", error.message);
        return;
      }

      if (!data) {
        console.warn("[WARN] Profile query returned NO DATA");
        return;
      }
    }

    // -----------------------------------------
    // STEP 3: Update profile (If update parameter is true)
    // -----------------------------------------
    if (update) {
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ has_completed_onboarding: true })
        .eq('id', userId);

      if (updateError) {
        console.error("[ERROR] PROFILE UPDATE FAILED:", updateError.message);
        return;
      }
    }

    // -----------------------------------------
    // STEP 4: Update "hear" source (If hear parameter is provided)
    // -----------------------------------------
    if (hear) {
      console.log("Starting update process for 'hear' field...");
      const { error: updateErrorHear } = await supabase
        .from('profiles')
        .update({ hear: hear })
        .eq('id', userId);

      if (updateErrorHear) {
        console.error("[ERROR] HOW DID YOU HEAR ABOUT US? UPDATE FAILED:", updateErrorHear.message);
        return;
      }
    }

  } catch (err) {
    console.error("[UNCAUGHT EXCEPTION]:", err);
  }
}
