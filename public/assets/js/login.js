const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  // input values
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // error tags
  const emailError = document.getElementById('email-error');
  const passwordError = document.getElementById('password-error');

  // set errors
  const errors = {
    email: 'Debe ingresar un email',
    password: 'Debe ingresar una contraseña',
  };

  if (email) errors.email = '';
  if (password) errors.password = '';

  // render errors
  emailError.textContent = errors.email;
  passwordError.textContent = errors.password;

  const errorsArr = Object.values(errors);

  // validate form then fetch
  if (errorsArr.every((error) => error === '')) {
    const response = await fetch('/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const { data, error } = await response.json();
    if (error) {
      alert(error);
      return;
    }
    if (data === true) {
      window.location.href = '/';
    }
  }
});
