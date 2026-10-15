/* ════════════════════════════════════════════
   Class Management — signin.js
   Sign In page: validation + redirect
   ════════════════════════════════════════════ */

// ── Password toggle ──
const togglePass = document.getElementById('togglePass');
const passInput  = document.getElementById('password');
const passIcon   = document.getElementById('passIcon');

togglePass.addEventListener('click', () => {
  if (passInput.type === 'password') {
    passInput.type = 'text';
    passIcon.className = 'fa-regular fa-eye-slash';
  } else {
    passInput.type = 'password';
    passIcon.className = 'fa-regular fa-eye';
  }
});

// ── Validation helpers ──
function setError(groupId, msg) {
  const grp = document.getElementById(groupId);
  grp.classList.add('has-error');
  const errEl = grp.querySelector('.err-msg');
  if (errEl && msg) errEl.textContent = msg;
}

function clearError(groupId) {
  document.getElementById(groupId).classList.remove('has-error');
}

// ── Live clear errors on typing ──
document.getElementById('email').addEventListener('input', () => {
  clearError('grp-email');
});

document.getElementById('password').addEventListener('input', () => {
  clearError('grp-password');
});

// ── Form submit ──
document.getElementById('signinForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const email    = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  let valid = true;

  // Validate email / username
  if (email.length === 0) {
    setError('grp-email', 'Please enter your email or username.');
    valid = false;
  } else {
    clearError('grp-email');
  }

  // Validate password
  if (password.length === 0) {
    setError('grp-password', 'Please enter your password.');
    valid = false;
  } else if (password.length < 6) {
    setError('grp-password', 'Password must be at least 6 characters.');
    valid = false;
  } else {
    clearError('grp-password');
  }

  if (!valid) return;

  // ── Success: show spinner → redirect ──
  const btn = document.getElementById('signinBtn');
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Signing In...';
  btn.disabled  = true;
  btn.style.background = '#c96010';

  setTimeout(() => {
    window.location.href = 'dashboard.html';
  }, 1500);
});

// ── Google sign-in placeholder ──
document.querySelector('.btn-google').addEventListener('click', () => {
  alert('Continue with Google — connect your Google OAuth here.');
});

// ── Top nav Sign up button ──
document.querySelector('.btn-nav-signup').addEventListener('click', () => {
  window.location.href = 'signup.html';
});