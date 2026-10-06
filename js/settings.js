/* ════════════════════════════════════════════
   Class Management — settings.js
   Settings page: tab switching, save, system info
   ════════════════════════════════════════════ */

// ── Today's date ──
function setDate() {
  const el = document.getElementById('bannerDate');
  if (!el) return;
  const d = new Date();
  el.textContent = '📅 ' + d.toLocaleDateString('en-US', {
    weekday: 'short', day: 'numeric',
    month: 'short', year: 'numeric'
  });
}

// ── System info ──
function setSystemInfo() {
  const dateEl    = document.getElementById('sysDate');
  const browserEl = document.getElementById('sysBrowser');
  const deviceEl  = document.getElementById('sysDevice');

  if (dateEl) {
    const d = new Date();
    dateEl.textContent = d.toLocaleDateString('en-US', {
      day: 'numeric', month: 'short', year: 'numeric'
    });
  }

  if (browserEl) {
    const ua = navigator.userAgent;
    if (ua.includes('Chrome') && !ua.includes('Edg'))
      browserEl.textContent = 'Chrome ' + ua.match(/Chrome\/([\d.]+)/)?.[1]?.split('.')[0] || '';
    else if (ua.includes('Firefox'))
      browserEl.textContent = 'Firefox';
    else if (ua.includes('Edg'))
      browserEl.textContent = 'Edge';
    else if (ua.includes('Safari') && !ua.includes('Chrome'))
      browserEl.textContent = 'Safari';
    else
      browserEl.textContent = 'Unknown';
  }

  if (deviceEl) {
    const ua = navigator.userAgent;
    if (/Windows/.test(ua))      deviceEl.textContent = 'Windows';
    else if (/Mac/.test(ua))     deviceEl.textContent = 'Mac';
    else if (/Linux/.test(ua))   deviceEl.textContent = 'Linux';
    else if (/Android/.test(ua)) deviceEl.textContent = 'Android';
    else if (/iPhone|iPad/.test(ua)) deviceEl.textContent = 'iOS';
    else deviceEl.textContent = 'Unknown';
  }
}

/* ════════════════════════════
   TAB SWITCHING
════════════════════════════ */
function switchTab(tabId) {
  // Hide all panes
  document.querySelectorAll('.tab-pane').forEach(p => {
    p.classList.remove('active');
  });

  // Remove active from all menu items
  document.querySelectorAll('.settings-menu-item').forEach(b => {
    b.classList.remove('active');
  });

  // Show selected pane
  const pane = document.getElementById(`tab-${tabId}`);
  if (pane) pane.classList.add('active');

  // Activate matching menu item
  const menuBtn = document.querySelector(
    `.settings-menu-item[data-tab="${tabId}"]`
  );
  if (menuBtn) menuBtn.classList.add('active');
}

// ── Bind menu items ──
document.querySelectorAll('.settings-menu-item').forEach(btn => {
  btn.addEventListener('click', () => {
    switchTab(btn.dataset.tab);
  });
});

// ── Bind quick settings shortcuts ──
document.querySelectorAll('.qs-item').forEach(btn => {
  btn.addEventListener('click', () => {
    const tab = btn.dataset.tab;
    if (tab) switchTab(tab);
  });
});

/* ════════════════════════════
   SAVE CHANGES
════════════════════════════ */
function showToast(message) {
  const toast = document.createElement('div');
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 28px;
    right: 28px;
    background: #1e293b;
    color: #fff;
    padding: 12px 22px;
    border-radius: 10px;
    font-size: 13px;
    font-weight: 600;
    z-index: 9999;
    box-shadow: 0 8px 24px rgba(0,0,0,0.2);
    animation: fadeInUp .3s ease;
  `;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2800);
}

// ── General Settings save ──
const saveBtn = document.getElementById('saveBtn');
if (saveBtn) {
  saveBtn.addEventListener('click', () => {
    const systemName  = document.getElementById('systemName').value.trim();
    const orgName     = document.getElementById('orgName').value.trim();
    const academicYear= document.getElementById('academicYear').value.trim();

    if (!systemName || !orgName || !academicYear) {
      alert('Please fill in all required fields.');
      return;
    }

    saveBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Saving...';
    saveBtn.disabled = true;

    setTimeout(() => {
      saveBtn.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Save Changes';
      saveBtn.disabled = false;
      showToast('✅ Settings saved successfully!');
    }, 800);
  });
}

// ── General Settings reset ──
const resetBtn = document.getElementById('resetBtn');
if (resetBtn) {
  resetBtn.addEventListener('click', () => {
    if (!confirm('Reset all fields to default values?')) return;
    document.getElementById('systemName').value   = 'Class Management System';
    document.getElementById('orgName').value      = 'EGOTECH WORLD';
    document.getElementById('academicYear').value = '2026 - 2027';
    document.getElementById('timezone').value     = 'Asia/Colombo (GMT+5:30)';
    document.getElementById('address').value      = 'No. 123, Main Street,\nColombo, Sri Lanka';
    document.getElementById('phone').value        = '+94 11 123 4567';
    document.getElementById('email').value        = 'info@egotechworld.com';
    document.getElementById('itemsPerPage').value = '10';
    document.getElementById('dateFormat').value   = 'DD MMM YYYY';
    document.getElementById('language').value     = 'English';
    showToast('↺ Settings reset to defaults.');
  });
}

// ── All other save buttons ──
document.querySelectorAll('.btn-save').forEach(btn => {
  if (btn.id === 'saveBtn') return;
  btn.addEventListener('click', () => {
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Saving...';
    btn.disabled  = true;
    setTimeout(() => {
      btn.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Save Changes';
      btn.disabled  = false;
      showToast('✅ Settings saved successfully!');
    }, 800);
  });
});

/* ════════════════════════════
   BACKUP BUTTONS
════════════════════════════ */
const downloadBackupBtn = document.getElementById('downloadBackupBtn');
if (downloadBackupBtn) {
  downloadBackupBtn.addEventListener('click', () => {
    const data = JSON.stringify({
      systemName: 'Class Management System',
      org: 'EGOTECH WORLD',
      exportedAt: new Date().toISOString()
    }, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url  = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href     = url;
    link.download = `cms-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    showToast('📥 Backup downloaded!');
  });
}

const restoreBtn = document.getElementById('restoreBtn');
if (restoreBtn) {
  restoreBtn.addEventListener('click', () => {
    alert('Restore Data — connect to your backend API here.');
  });
}

/* ════════════════════════════
   APPEARANCE — THEME CARDS
════════════════════════════ */
document.querySelectorAll('.theme-card').forEach(card => {
  card.addEventListener('click', () => {
    document.querySelectorAll('.theme-card')
      .forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    showToast(`🎨 Theme "${card.querySelector('.theme-label').textContent.trim()}" selected.`);
  });
});

/* ════════════════════════════
   APPEARANCE — COLOR DOTS
════════════════════════════ */
document.querySelectorAll('.color-dot').forEach(dot => {
  dot.addEventListener('click', () => {
    document.querySelectorAll('.color-dot')
      .forEach(d => d.classList.remove('selected'));
    dot.classList.add('selected');
    showToast(`🎨 Sidebar color updated to ${dot.title}.`);
  });
});

/* ════════════════════════════
   INIT
════════════════════════════ */
setDate();
setSystemInfo();