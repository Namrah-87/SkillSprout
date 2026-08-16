import { check } from './api/loggedin.js';
import { check_onboard } from './api/onboardcheck.js';

async function init() {
  const user = await check();

  if (!user) {
    window.location.replace('/signup.html');
  }
  const onboard = await check_onboard(True);
  if (onboard) {
    //placeholder
    print("you have not completed onboarding")
  }
  else {
    print("fail here")
  }
}

init();