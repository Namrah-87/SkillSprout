import { createClient } from '@supabase/supabase-js';

console.log("========================================");
console.log("[START] onboardcheck.js loaded");
console.log("[START] Creating Supabase client...");
console.log("========================================");

const supabase = createClient(
    'https://yavfhhyrbcwgsyjsuwzu.supabase.co',
    'sb_publishable_KkFAWS-xVB5FSWJu9uld2Q_VzOLe9Dk'
);

console.log("[OK] Supabase client created");

export async function check_onboard(update) {
    console.log("");
    console.log("========================================");
    console.log("[CHECK] check_onboard() STARTED");
    console.log("[CHECK] update =", update);
    console.log("========================================");

    try {
        // -----------------------------------------
        // STEP 1: Check Supabase authentication
        // -----------------------------------------
        console.log("[1] Calling supabase.auth.getUser()...");

        const authResult = await supabase.auth.getUser();

        console.log("[1] getUser() returned");
        console.log("[1] Full auth result:", authResult);

        const { data: authData, error: authError } = authResult;

        console.log("[1] authData:", authData);
        console.log("[1] authError:", authError);

        if (authError) {
            console.error("[ERROR] Authentication error:");
            console.error(authError);
            return;
        }

        const user = authData?.user;

        console.log("[1] User:", user);

        // -----------------------------------------
        // STEP 2: Check whether a user exists
        // -----------------------------------------
        if (!user) {
            console.warn("[2] NO USER FOUND");
            console.warn("[2] supabase.auth.getUser() returned null user.");
            console.warn("[2] This usually means there is no authenticated session.");
            console.warn("[2] Returning from check_onboard().");

            return;
        }

        console.log("[2] USER FOUND!");
        console.log("[2] User ID:", user.id);
        console.log("[2] User email:", user.email);

        // -----------------------------------------
        // STEP 3: Query profiles table
        // -----------------------------------------
        console.log("");
        console.log("[3] Querying profiles table...");
        console.log("[3] Looking for profile with id:", user.id);

        const profileResult = await supabase
            .from('profiles')
            .select('has_completed_onboarding')
            .eq('id', user.id)
            .single();

        console.log("[3] Profile query finished");
        console.log("[3] Full profile result:", profileResult);

        const { data, error } = profileResult;

        console.log("[3] Profile data:", data);
        console.log("[3] Profile error:", error);

        // -----------------------------------------
        // STEP 4: Check profile query
        // -----------------------------------------
        if (error) {
            console.error("");
            console.error("[ERROR] PROFILE QUERY FAILED");
            console.error("[ERROR] Error object:", error);
            console.error("[ERROR] Message:", error.message);
            console.error("[ERROR] Code:", error.code);
            console.error("[ERROR] Details:", error.details);
            console.error("[ERROR] Hint:", error.hint);

            return;
        }

        if (!data) {
            console.warn("[4] Profile query returned NO DATA");
            return;
        }

        console.log("");
        console.log("[4] PROFILE FOUND!");
        console.log(
            "[4] has_completed_onboarding =",
            data.has_completed_onboarding
        );

        // -----------------------------------------
        // STEP 5: Check update flag
        // -----------------------------------------
        console.log("");
        console.log("[5] Checking update flag...");
        console.log("[5] update =", update);

        if (!update) {
            console.log("[5] update is false");
            console.log("[5] Skipping database update.");
            console.log("[5] check_onboard() finished successfully.");

            return;
        }

        // -----------------------------------------
        // STEP 6: Update profile
        // -----------------------------------------
        console.log("");
        console.log("[6] update is TRUE");
        console.log("[6] Updating has_completed_onboarding -> true");
        console.log("[6] User ID:", user.id);

        const updateResult = await supabase
            .from('profiles')
            .update({
                has_completed_onboarding: true
            })
            .eq('id', user.id);

        console.log("[6] Update query finished");
        console.log("[6] Full update result:", updateResult);

        const { error: updateError } = updateResult;

        if (updateError) {
            console.error("");
            console.error("[ERROR] PROFILE UPDATE FAILED");
            console.error("[ERROR] Error object:", updateError);
            console.error("[ERROR] Message:", updateError.message);
            console.error("[ERROR] Code:", updateError.code);
            console.error("[ERROR] Details:", updateError.details);
            console.error("[ERROR] Hint:", updateError.hint);

            return;
        }

        console.log("[6] PROFILE UPDATE SUCCESSFUL");
        console.log("[6] has_completed_onboarding is now TRUE");

        console.log("");
        console.log("[SUCCESS] check_onboard() completed successfully!");
    } catch (err) {
        console.error("");
        console.error("========================================");
        console.error("[FATAL] EXCEPTION IN check_onboard()");
        console.error("========================================");
        console.error(err);
        console.error("========================================");
    }
}

// =============================================
// DIRECT TEST
// =============================================
