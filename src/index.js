import './styles/index.css'
import { check } from './api/loggedin'

document.addEventListener('DOMContentLoaded', async function () {
  console.log('SkillSprout loaded (index)')

  const var_button = document.getElementById('var_button')

  if (!var_button) {
    return
  }

  const log = await check()

  if (!log) {
    var_button.textContent = 'Login'
    var_button.href = "/login"
  } else {
    var_button.textContent = 'Home'
    var_button.href = "/home"
  }
})
