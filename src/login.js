import { loginWithEmail } from './api/login-email-api.js';

const form = document.querySelector('#login-form');
const status = document.querySelector('#login-status');

if (form) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value;
    
    status.textContent = 'Logging in...';
    status.className = 'status';
    
    try {
      const result = await loginWithEmail(email, password);
      if (!result.success) {
        status.textContent = result.error || 'Login failed.';
        status.classList.add('error');
        return;
      }
      status.textContent = 'Login successful!';
      status.classList.add('success');
      form.reset();
      window.location.replace("/home");
    } catch (error) {
      console.error('Login failed:', error);
      status.textContent = 'Something went wrong while logging in.';
      status.classList.add('error');
    }
  });
}
