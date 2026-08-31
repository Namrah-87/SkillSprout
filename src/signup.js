import { signUpNewUser } from './api/signup-api.js';

const form = document.querySelector('#signup-form');
const status = document.querySelector('#signup-status');

if (form) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value;
    const username = document.querySelector('#username').value.trim();
    const name_var = document.querySelector('#name').value;

    status.textContent = 'Creating account...';
    status.className = 'status';

    try {
      const result = await signUpNewUser(email, password, name_var, username);

      if (!result.success) {
        status.textContent = result.error || 'Sign up failed.';
        status.classList.add('error');
        return;
      }

      status.textContent = 'Account created successfully! Please check your email, especialy spam.';
      status.classList.add('success');
      form.reset();
    } catch (error) {
      console.error('Signup failed:', error);
      status.textContent = 'Something went wrong while signing up.';
      status.classList.add('error');
    }
  });
}
