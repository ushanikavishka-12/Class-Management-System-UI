/* ════════════════════════════════════════════════
   Class Management System — dashboard.js
   Dashboard: charts, calendar, activities, date
   ════════════════════════════════════════════════ */

// ── Today's date ──
function setTodayDate() {
  const el = document.getElementById('todayDate');
  if (!el) return;
  const d = new Date();
  el.textContent = d.toLocaleDateString('en-US', {
    weekday: 'short', day: 'numeric',
    month: 'short', year: 'numeric'
  });
}

/* ════════════════════════════
   STUDENT OVERVIEW LINE CHART
════════════════════════════ */
function initStudentOverviewChart() {
  const ctx = document.getElementById('studentOverviewChart');
  if (!ctx) return;

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul'],
      datasets: [{
        label: 'Students',
        data: [20, 40, 65, 72, 80, 110, 124],
        borderColor: '#f59e0b',
        backgroundColor: 'rgba(245,158,11,0.07)',
        borderWidth: 2.5,
        pointBackgroundColor: '#f59e0b',
        pointRadius: 5,
        pointHoverRadius: 7,
        fill: true,
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: ctx => ' Students: ' + ctx.parsed.y
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 140,
          ticks: {
            stepSize: 30,
            font: { size: 11 }
          },
          grid: { color: '#f1f5f9' }
        },
        x: {
          grid: { display: false },
          ticks: { font: { size: 11 } }
        }
      }
    }
  });
}

/* ════════════════════════════
   COURSES DISTRIBUTION DONUT
════════════════════════════ */
const coursesData = [
  { label: 'Mathematics', count: 2, color: '#2563eb' },
  { label: 'Science',     count: 1, color: '#10b981' },
  { label: 'History',     count: 1, color: '#ec4899' },
  { label: 'English',     count: 2, color: '#f59e0b' },
  { label: 'ICT',         count: 1, color: '#8b5cf6' },
  { label: 'Other',       count: 1, color: '#d1d5db' }
];

function initCoursesChart() {
  const ctx = document.getElementById('coursesChart');
  if (!ctx) return;

  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: coursesData.map(c => c.label),
      datasets: [{
        data: coursesData.map(c => c.count),
        backgroundColor: coursesData.map(c => c.color),
        borderWidth: 0,
        hoverOffset: 4
      }]
    },
    options: {
      responsive: false,
      cutout: '60%',
      plugins: {
        legend: { display: false }
      }
    }
  });

  const legend = document.getElementById('coursesLegend');
  if (!legend) return;
  legend.innerHTML = '';

  // Two columns
  const col1 = coursesData.slice(0, 3);
  const col2 = coursesData.slice(3);
  const wrapper = document.createElement('div');
  wrapper.style.cssText = 'display:grid;grid-template-columns:1fr 1fr;gap:6px 12px;';

  [...col1, ...col2].forEach(c => {
    const row = document.createElement('div');
    row.className = 'legend-row-cms';
    row.innerHTML = `
      <div class="legend-dot-cms" style="background:${c.color};"></div>
      <span>${c.label}</span>
      <span class="legend-cnt">${c.count}</span>
    `;
    wrapper.appendChild(row);
  });

  legend.appendChild(wrapper);
}

/* ════════════════════════════
   MINI CALENDAR
════════════════════════════ */
let calDate = new Date();

function renderCalendar(date) {
  const container = document.getElementById('miniCalendar');
  if (!container) return;

  const today = new Date();
  const year  = date.getFullYear();
  const month = date.getMonth();

  const monthNames = [
    'January','February','March','April','May','June',
    'July','August','September','October','November','December'
  ];

  const dayNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

  const firstDay  = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrev  = new Date(year, month, 0).getDate();

  let html = `
    <div class="cal-header">
      <button class="cal-nav" id="calPrev">&#8249;</button>
      <span class="cal-month">${monthNames[month]} ${year}</span>
      <button class="cal-nav" id="calNext">&#8250;</button>
    </div>
    <div class="cal-grid">
  `;

  dayNames.forEach(d => {
    html += `<div class="cal-day-name">${d}</div>`;
  });

  // Prev month tail
  for (let i = firstDay - 1; i >= 0; i--) {
    html += `<div class="cal-day other-month">${daysInPrev - i}</div>`;
  }

  // Current month
  for (let d = 1; d <= daysInMonth; d++) {
    const isToday =
      d === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear();
    html += `<div class="cal-day${isToday ? ' today' : ''}">${d}</div>`;
  }

  // Next month fill
  const total = firstDay + daysInMonth;
  const remaining = total % 7 === 0 ? 0 : 7 - (total % 7);
  for (let d = 1; d <= remaining; d++) {
    html += `<div class="cal-day other-month">${d}</div>`;
  }

  html += `</div>`;
  container.innerHTML = html;

  document.getElementById('calPrev').addEventListener('click', () => {
    calDate = new Date(calDate.getFullYear(), calDate.getMonth() - 1, 1);
    renderCalendar(calDate);
  });

  document.getElementById('calNext').addEventListener('click', () => {
    calDate = new Date(calDate.getFullYear(), calDate.getMonth() + 1, 1);
    renderCalendar(calDate);
  });
}

/* ════════════════════════════
   RECENT ACTIVITIES
════════════════════════════ */
const activities = [
  {
    emoji: '🎓', bg: '#dbeafe',
    title: 'New student enrolled',
    desc: 'Kavindu Perera joined the Mathematics course.',
    time: 'Today, 09:24 AM'
  },
  {
    emoji: '💳', bg: '#d1fae5',
    title: 'Payment received',
    desc: '$ 150.00 from Nethmi Silva.',
    time: 'Today, 08:45 AM'
  },
  {
    emoji: '📋', bg: '#fce7f3',
    title: 'Attendance marked',
    desc: 'Grade 10 - Science (12 students present).',
    time: 'Today, 08:20 AM'
  },
  {
    emoji: '📚', bg: '#fef9c3',
    title: 'New course added',
    desc: 'Web Development course has been added.',
    time: 'Yesterday, 04:15 PM'
  }
];

function renderActivities() {
  const list = document.getElementById('activitiesList');
  if (!list) return;
  list.innerHTML = '';

  activities.forEach(act => {
    const item = document.createElement('div');
    item.className = 'activity-item';
    item.innerHTML = `
      <div class="activity-avatar" style="background:${act.bg};">
        ${act.emoji}
      </div>
      <div class="activity-body">
        <p class="activity-title">${act.title}</p>
        <p class="activity-desc">${act.desc}</p>
      </div>
      <span class="activity-time">${act.time}</span>
    `;
    list.appendChild(item);
  });
}

/* ════════════════════════════
   QUICK ACTION BUTTONS
════════════════════════════ */
function bindQuickActions() {
  document.querySelectorAll('.qa-card').forEach(btn => {
    btn.addEventListener('click', () => {
      const title = btn.querySelector('.qa-title').textContent.trim();
      alert(`"${title}" clicked — navigate to the relevant page here.`);
    });
  });
}

/* ════════════════════════════
   BOOT
════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  setTodayDate();
  renderActivities();
  renderCalendar(calDate);
  bindQuickActions();

  setTimeout(() => {
    initStudentOverviewChart();
    initCoursesChart();
  }, 300);
});