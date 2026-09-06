import { logout } from './api/logout_api.js'

try {
  const data = await logout();
  console.log(data);
} catch (error) {
  console.error(error);
}