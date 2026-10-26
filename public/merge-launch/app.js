'use strict';
const form = document.querySelector('#signup');
const email = document.querySelector('#email');
const helper = document.querySelector('#email-help');
const status = document.querySelector('#signup-status');
let touched = false;
function validate() {
  const valid = email.validity.valid;
  email.setAttribute('aria-invalid', String(!valid));
  helper.textContent = valid ? 'Looks good. This is a preview only.' : 'Enter a valid email, such as you@something.dev.';
  return valid;
}
email.addEventListener('blur', () => { touched = true; validate(); });
email.addEventListener('input', () => {
  if (touched) validate();
  status.textContent = '';
});
form.addEventListener('submit', event => {
  event.preventDefault();
  touched = true;
  if (!validate()) { email.focus(); return; }
  status.textContent = '✓ Preview complete. No email was sent or saved.';
  form.reset();
  email.removeAttribute('aria-invalid');
  helper.textContent = 'Try the form with a valid email address.';
  touched = false;
});
