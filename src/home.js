import { check } from './api/loggedin.js';
import { check_onboard } from './api/onboardcheck.js';

async function init() {
  const user = await check();

  if (!user) {
    window.location.replace('/signup.html');
  }
  
console.log("");
console.log("========================================");
console.log("[TEST] Calling check_onboard(false)...");
console.log("========================================");

const onboard = check_onboard(false)
    .then(() => {
        console.log("");
        console.log("========================================");
        console.log("[TEST] check_onboard() Promise resolved");
        console.log("[TEST] DONE");
        console.log("========================================");
    })
    .catch(err => {
        console.error("");
        console.error("========================================");
        console.error("[TEST] check_onboard() Promise REJECTED");
        console.error("[TEST] ERROR:", err);
        console.error("========================================");
    });
  if (onboard) {
    //placeholder
    console.log("You have not completed onboarding");
    
  }
  else {
    console.log("fail here")
  }
}

init();