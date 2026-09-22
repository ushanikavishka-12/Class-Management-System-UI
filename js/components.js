/* ═══════════════════════════════════════════════
   Class Management System — components.js
   Loads sidebar, topbar, footer into every page.
   Works with Live Server AND file:// fallback.
   ═══════════════════════════════════════════════ */

const FALLBACK = {

  sidebar: `<aside class="sidebar" id="sidebar">
  <div class="sidebar-brand">
    <div class="brand-icon"><i class="fa-solid fa-graduation-cap"></i></div>
    <div class="brand-text">
      <span class="brand-name">Class Management</span>
      <span class="brand-sub">System</span>
    </div>
  </div>
  <nav class="sidebar-nav">
    <a href="dashboard.html" class="nav-item" data-page="dashboard">
      <i class="fa-solid fa-house"></i><span>Dashboard</span>
    </a>
    <a href="students.html" class="nav-item" data-page="students">
      <i class="fa-solid fa-users"></i><span>Students</span>
    </a>
    <a href="subjects.html" class="nav-item" data-page="subjects">
      <i class="fa-solid fa-book-open"></i><span>Subjects</span>
    </a>
    <a href="payments.html" class="nav-item" data-page="payments">
      <i class="fa-solid fa-credit-card"></i><span>Payments</span>
    </a>
    <a href="attendance.html" class="nav-item" data-page="attendance">
      <i class="fa-solid fa-calendar-check"></i><span>Attendance</span>
    </a>
    <div class="nav-divider"></div>
    <a href="reports.html" class="nav-item" data-page="reports">
      <i class="fa-solid fa-chart-bar"></i><span>Reports</span>
    </a>
    <a href="settings.html" class="nav-item" data-page="settings">
      <i class="fa-solid fa-gear"></i><span>Settings</span>
    </a>
  </nav>
  <div class="sidebar-bottom">
    <div class="sidebar-art">
      <div class="art-circle art-1"></div>
      <div class="art-circle art-2"></div>
      <div class="art-icon"><i class="fa-solid fa-graduation-cap"></i></div>
    </div>
    <p class="sidebar-motto">Better Education<br>Brighter Future</p>
  </div>
</aside>`,

  topbar: `<header class="topbar">
  <div class="search-box">
    <i class="fa-solid fa-magnifying-glass"></i>
    <input type="text" placeholder="Search students, courses...">
  </div>
  <div class="topbar-right">
    <div class="notif-wrap">
      <button class="notif-btn" title="Notifications">
        <i class="fa-regular fa-bell"></i>
        <span class="notif-dot"></span>
      </button>
    </div>
    <div class="admin-chip">
      <div class="admin-avatar">AD</div>
      <span class="admin-name">Admin</span>
      <i class="fa-solid fa-chevron-down admin-caret"></i>
    </div>
  </div>
</header>`,

  footer: `<footer class="footer">
  <div class="footer-content">
    <div class="footer-brand-col">
      <div class="footer-brand-name">EgoTECH World</div>
      <p class="footer-brand-desc">Developing ready made and custom solutions for modern challenges.</p>
    </div>
    <div class="footer-nav-col">
      <h5 class="footer-col-title">Navigation</h5>
      <div class="footer-links-grid">
        <div class="footer-links-col">
          <a href="#">Home</a><a href="#">Job</a><a href="#">Services</a>
        </div>
        <div class="footer-links-col">
          <a href="#">Projects</a><a href="#">Contact</a><a href="#">About</a>
        </div>
      </div>
    </div>
    <div class="footer-divider-v"></div>
    <div class="footer-nav-col">
      <h5 class="footer-col-title">Resources</h5>
      <div class="footer-links-grid">
        <div class="footer-links-col">
          <a href="#">Documentation</a><a href="#">Pricing</a><a href="#">Support</a>
        </div>
        <div class="footer-links-col">
          <a href="#">Privacy &amp; Policy</a>
          <a href="#">Terms &amp; Conditions</a>
          <a href="#">Contact Us</a>
        </div>
      </div>
    </div>
    <div class="footer-divider-v"></div>
    <div class="footer-social-col">
      <h5 class="footer-col-title">Stay Connected</h5>
      <div class="footer-social-icons">
        <a href="#" class="social-icon facebook" aria-label="Facebook">
          <i class="fa-brands fa-facebook-f"></i>
        </a>
        <a href="#" class="social-icon linkedin" aria-label="LinkedIn">
          <i class="fa-brands fa-linkedin-in"></i>
        </a>
      </div>
      <p class="footer-follow">Follow Us</p>
    </div>
  </div>
  <div class="footer-bottom">
    &copy; 2026 egotechworld.com &nbsp;&ndash;&nbsp; EGOTECHWORLD PVT LTD. All Rights Reserved.
  </div>
</footer>`
};

async function loadComponent(selector, filePath) {
  const target = document.querySelector(selector);
  if (!target) return;

  const key = filePath.includes('sidebar') ? 'sidebar'
            : filePath.includes('topbar')  ? 'topbar'
            : 'footer';

  if (location.protocol === 'file:') {
    target.innerHTML = FALLBACK[key];
    return;
  }

  try {
    const res = await fetch(filePath);
    if (!res.ok) throw new Error(`${res.status} ${filePath}`);
    target.innerHTML = await res.text();
  } catch (err) {
    console.warn('fetch failed, using fallback:', err.message);
    target.innerHTML = FALLBACK[key];
  }
}

function setActiveNav() {
  const page = document.body.dataset.page || '';
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('active');
    if ((item.dataset.page || '') === page) {
      item.classList.add('active');
    }
  });
}

function setPageMeta() {
  const title = document.body.dataset.title;
  const sub   = document.body.dataset.sub;
  const elT   = document.getElementById('page-title');
  const elS   = document.getElementById('page-sub');
  if (title && elT) elT.textContent = title;
  if (sub   && elS) elS.textContent = sub;
}

async function loadAllComponents() {
  await loadComponent('#sidebar-placeholder', 'components/sidebar.html');
  await loadComponent('#topbar-placeholder',  'components/topbar.html');
  await loadComponent('#footer-placeholder',  'components/footer.html');
  setActiveNav();
  setPageMeta();
}

document.addEventListener('DOMContentLoaded', loadAllComponents);