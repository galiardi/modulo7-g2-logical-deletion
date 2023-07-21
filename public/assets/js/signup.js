import { isValidEmail } from './util/isValidEmail.js';
import { isValidPassword } from './util/isValidPassword.js';

const signupForm = document.getElementById('signup-form');

signupForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  // input values
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const repeatPassword = document.getElementById('repeat-password').value;

  // error tags
  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const passwordError = document.getElementById('password-error');
  const repeatPasswordError = document.getElementById('repeat-password-error');

  // set errors
  const errors = {
    name: 'Debe ingresar un nombre',
    email: 'Debe ingresar un email válido',
    password: 'Debe ingresar una contraseña de al menos 6 caracteres',
    repeatPassword: 'Las contraseñas deben coincidir ',
  };
  if (name) errors.name = '';
  if (isValidEmail(email)) errors.email = '';
  if (isValidPassword(password)) errors.password = '';
  if (password === repeatPassword) errors.repeatPassword = '';

  // render errors
  nameError.textContent = errors.name;
  emailError.textContent = errors.email;
  passwordError.textContent = errors.password;
  repeatPasswordError.textContent = errors.repeatPassword;

  const errorsArr = Object.values(errors);

  // validate form then fetch
  if (errorsArr.every((error) => error === '')) {
    const response = await fetch('/user/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    const { data, error } = await response.json();
    if (error) {
      alert(error);
      return;
    }
    if (data) {
      window.location.href = '/';
    }
  }
});
