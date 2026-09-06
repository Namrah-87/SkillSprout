import './styles/index.css'
import { check } from './api/loggedin'

document.addEventListener('DOMContentLoaded', async function () {
  console.log('SkillSprout loaded (index)')

  const var_button = document.getElementById('var_button')
  const var_button_2 = document.getElementById('var_button_2')
  if (!var_button) {
    return
  }
  if (!var_button_2) {
    print("somethins relly rong")
    return
  }

  const log = await check()

  if (!log) {
    var_button.textContent = 'Login'
    var_button.href = "/login"
    var_button_2.href = "/signup"
    var_button_2.textContent = 'Sign up'
  } else {
    var_button.textContent = 'Home'
    var_button.href = "/home"
    var_button_2.href = "/logout"
    var_button_2.textContent = 'Logout'
  }
})
