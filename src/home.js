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

  const onboard = await check_onboard(false, true)
  console.log(onboard)
  if (onboard == false) {
    //placeholder
    console.log("You have not completed onboarding");
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const number = urlParams.get('n');
    if (number == 2) {
      const onboard_div = document.getElementById("onboard_div_wrapper")
      onboard_div.innerHTML =
        `
        <div class="onboarding" id="onboard_div">
        <h1>Welcome to SkillSprout!</h1>
        <h5>Who are you?</h5>
      
        <form class="onboarding-btns" id="form" action="" method="get">
      <button id="prev-btn" type="button">← <u>back</u></button>  
      <button id="TEACH-btn" type="button">Teacher</button>
      <button id="STUDENT-btn" type="button">Student</button>
      <button id="HOBBYIST-btn" type="button">Hobbyist</button>
      <button id="OTHER-btn" type="button">Other</button>
      </form>
      </div>
      `;
      const form = document.querySelector('#form');
      form.addEventListener('click', (event) => {
        // 3. Check if the clicked element is a button
        if (event.target.tagName === 'BUTTON') {
          // Prevent default form submission behavior
          event.preventDefault();

          // 4. Extract text and store it in your variable
          var who = event.target.textContent.trim();
          check_onboard(false, false, null, who)
          console.log(who + " Sent check onboard")
          const newUrl = window.location.pathname + '?n=3';
          window.location.replace(newUrl);
        }
      });
    }
    if (number == 3) {
      const onboard_div = document.getElementById("onboard_div_wrapper")
      onboard_div.innerHTML =
        `
        <div class="onboarding" id="onboard_div">
        <h1>You're all set to explore SkillSprout!</h1>
        <form class="onboarding-btns" id="form" action="" method="get">
        <button id="FINISH-btn" type="button">Finish onboarding</button>
      </form>
      </div>
      `
      const form = document.querySelector('#form');
      form.addEventListener('click', (event) => {
        // 3. Check if the clicked element is a button
        if (event.target.tagName === 'BUTTON') {
          // Prevent default form submission behavior
          event.preventDefault();
          check_onboard(true)
          const newUrl = window.location.pathname;
          window.location.replace(newUrl);
        }
      });
    }
    if (!number) {
      const onboard_div = document.getElementById("onboard_div_wrapper")
      onboard_div.innerHTML =
        `
  <div class="onboarding" id="onboard_div">
  <h1>Welcome to SkillSprout!</h1>
  <h5>How did you hear about us?</h5>

  <form class="onboarding-btns" id="form" action="" method="get">
      <button id="prev-btn" type="button">← <u>Back</u></button>
      <button id="AI-btn" type="button">AI</button>
      <button id="GOOGLE-btn" type="button">Google search</button>
      <button id="SOC-MED-btn" type="button">Social media</button>
      <button id="FRIEND-btn" type="button">A friend</button>
      <button id="OTHER-btn" type="button" onclick="">Other</button>
  </form>
  </div>
  `
      const form = document.querySelector('#form');
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
          const newUrl = window.location.pathname + '?n=2';
          window.location.replace(newUrl);
        }
      });



    }
  }
  else {

  }
}

init();