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

  const onboard = check_onboard(false, true)
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
  let currentStep = 0;
  if (onboard) {
    //placeholder
    console.log("You have not completed onboarding");
    const form = document.querySelector('#form');
    const AI_btn = document.querySelector('#AI-btn');
    const GOOGLE_btn = document.querySelector('#GOOGLE-btn');
    const SOCIAL_btn = document.querySelector('#SOC-MED-btn');
    const FRIEND_btn = document.querySelector('#FRIEND-btn');
    const OTHER_btn = document.querySelector('#OTHER-btn');
    // 1. Select the form element

    // 2. Use event delegation to listen for clicks inside the form
    form.addEventListener('click', (event) => {
      // 3. Check if the clicked element is a button
      if (event.target.tagName === 'BUTTON') {
        // Prevent default form submission behavior
        event.preventDefault();

        // 4. Extract text and store it in your variable
        var hear = event.target.textContent.trim();
        check_onboard(false, false, hear)
        console.log(hear + " Sent check onboard")
      }
    });


  }
  else {
    console.log("fail here")
  }
}

init();