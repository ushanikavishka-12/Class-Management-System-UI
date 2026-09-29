/* ════════════════════════════════════════════
   Class Management — attendance.js
   Attendance page: table, chart, modals
   ════════════════════════════════════════════ */

// ── Attendance data ──
const attendanceData = [
  { id:'STU001', name:'Kavindu Perera',        grade:'Grade 10', cls:'A - Science', status:'Active', attendance:'Present', notes:'' },
  { id:'STU002', name:'Nirali Fernando',        grade:'Grade 9',  cls:'B - English', status:'Active', attendance:'Present', notes:'' },
  { id:'STU003', name:'Sumon Wijesinghe',       grade:'Grade 8',  cls:'A - Science', status:'Active', attendance:'Absent',  notes:'' },
  { id:'STU004', name:'Theewmi Wickramasinghe', grade:'Grade 10', cls:'C - Maths',   status:'Active', attendance:'Present', notes:'' },
  { id:'STU005', name:'Kinu Ranasinghe',        grade:'Grade 9',  cls:'B - English', status:'Active', attendance:'Late',    notes:'' },
  { id:'STU006', name:'Fathima Ali',            grade:'Grade 8',  cls:'D - History', status:'Active', attendance:'Present', notes:'' },
  { id:'STU007', name:'Dasun Perera',           grade:'Grade 10', cls:'C - Maths',   status:'Active', attendance:'Present', notes:'' }
];

// ── DOM ──
const attendanceBody = document.getElementById('attendanceBody');
const searchInput    = document.getElementById('searchInput');
const classFilter    = document.getElementById('classFilter');
const resultsText    = document.getElementById('resultsText');

let donutChart = null;

// ── Today's date ──
function setDate() {
  const d   = new Date();
  const day = d.getDate();
  const el  = document.getElementById('bannerDate');
  const dayEl = document.getElementById('bannerDay');

  if (el) el.textContent = '📅 ' + d.toLocaleDateString('en-US', {
    weekday:'short', day:'numeric', month:'short', year:'numeric'
  });

  if (dayEl) dayEl.textContent = day;
}

// ── Count attendance ──
function getCounts() {
  const present = attendanceData.filter(s => s.attendance === 'Present').length;
  const absent  = attendanceData.filter(s => s.attendance === 'Absent').length;
  const late    = attendanceData.filter(s => s.attendance === 'Late').length;
  const total   = attendanceData.length;
  return { present, absent, late, total };
}

// ── Update KPI cards ──
function updateKPIs() {
  const { present, absent, late, total } = getCounts();
  const pct = Math.round((present / total) * 100);
  const absPct = Math.round((absent / total) * 100);
  const latePct = Math.round((late / total) * 100);

  document.getElementById('kpiTotal').textContent     = total;
  document.getElementById('kpiPresent').textContent   = present;
  document.getElementById('kpiAbsent').textContent    = absent;
  document.getElementById('kpiLate').textContent      = late;
  document.getElementById('kpiPresentPct').textContent = `${pct}% ↑`;
  document.getElementById('kpiAbsentPct').textContent  = `${absPct}% ↑`;
  document.getElementById('kpiLatePct').textContent    = `${latePct}% ↑`;
}

// ── Update donut chart ──
function updateChart() {
  const { present, absent, late } = getCounts();
  const total = present + absent + late;
  const pct   = Math.round((present / total) * 100);

  document.getElementById('donutPct').textContent     = `${pct}%`;
  document.getElementById('legendPresent').textContent = present;
  document.getElementById('legendAbsent').textContent  = absent;
  document.getElementById('legendLate').textContent    = late;

  if (donutChart) {
    donutChart.data.datasets[0].data = [present, absent, late];
    donutChart.update();
  }
}

// ── Init donut chart ──
function initChart() {
  const ctx = document.getElementById('attendanceChart');
  if (!ctx) return;

  const { present, absent, late } = getCounts();

  donutChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Present', 'Absent', 'Late'],
      datasets: [{
        data: [present, absent, late],
        backgroundColor: ['#10b981', '#ef4444', '#f59e0b'],
        borderWidth: 0,
        hoverOffset: 4
      }]
    },
    options: {
      responsive: false,
      cutout: '65%',
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: ctx => ` ${ctx.label}: ${ctx.parsed}`
          }
        }
      }
    }
  });
}

// ── Attendance badge class ──
function getAttBadge(att) {
  const map = {
    'Present': 'att-present',
    'Absent':  'att-absent',
    'Late':    'att-late'
  };
  return map[att] || 'att-present';
}

// ── Render table ──
function renderAttendance(data) {
  attendanceBody.innerHTML = '';

  if (data.length === 0) {
    attendanceBody.innerHTML = `
      <tr><td colspan="7"
        style="text-align:center;padding:28px;color:#94a3b8;">
        No students found.
      </td></tr>`;
    resultsText.textContent = 'Showing 0 students';
    return;
  }

  data.forEach(student => {
    const realIndex = attendanceData.indexOf(student);
    const statusCls = student.status === 'Active' ? 'badge-active' : 'badge-inactive';
    const attCls    = getAttBadge(student.attendance);

    const row = document.createElement('tr');
    row.innerHTML = `
      <td style="font-weight:700;">${student.id}</td>
      <td>${student.name}</td>
      <td>${student.grade}</td>
      <td>${student.cls}</td>
      <td><span class="status-badge ${statusCls}">${student.status}</span></td>
      <td><span class="att-badge ${attCls}">${student.attendance}</span></td>
      <td>
        <div class="action-cell">
          <button class="action-btn view-btn"
            title="View" data-index="${realIndex}">
            <i class="fa-regular fa-eye"></i>
          </button>
          <button class="action-btn edit-btn"
            title="Edit" data-index="${realIndex}">
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
          <button class="action-btn del-btn"
            title="Delete" data-index="${realIndex}">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </td>
    `;
    attendanceBody.appendChild(row);
  });

  const total = attendanceData.length;
  const shown = data.length;
  resultsText.textContent =
    `Showing 1 to ${shown} of ${total} students`;

  attachListeners();
}

// ── Attach row listeners ──
function attachListeners() {

  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', () => openViewModal(btn.dataset.index));
  });

  document.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', () => openEditModal(btn.dataset.index));
  });

  document.querySelectorAll('.del-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const i = btn.dataset.index;
      if (confirm(`Remove attendance record for "${attendanceData[i].name}"?`)) {
        attendanceData.splice(i, 1);
        applyFilters();
        updateKPIs();
        updateChart();
      }
    });
  });
}

// ── Filter logic ──
function applyFilters() {
  const search  = searchInput.value.trim().toLowerCase();
  const cls     = classFilter.value;

  const filtered = attendanceData.filter(s => {
    const matchSearch =
      s.name.toLowerCase().includes(search) ||
      s.id.toLowerCase().includes(search);
    const matchClass = !cls || s.cls === cls;
    return matchSearch && matchClass;
  });

  renderAttendance(filtered);
}

searchInput.addEventListener('input',   applyFilters);
classFilter.addEventListener('change',  applyFilters);

/* ════════════════════════════
   MARK / EDIT MODAL
════════════════════════════ */
const attModal      = document.getElementById('attendanceModal');
const attForm       = document.getElementById('attendanceForm');
const modalTitle    = document.getElementById('modalTitle');
const closeModalBtn = document.getElementById('closeModalBtn');
const cancelModalBtn= document.getElementById('cancelModalBtn');
const editAttIndex  = document.getElementById('editAttIndex');

// ── Open for a specific student (edit) ──
function openEditModal(index) {
  const s = attendanceData[index];
  modalTitle.textContent = 'Edit Attendance';

  document.getElementById('attStudentId').value   = s.id;
  document.getElementById('attStudentName').value = s.name;
  document.getElementById('attGrade').value       = s.grade;
  document.getElementById('attClass').value       = s.cls;
  document.getElementById('attStatus').value      = s.attendance;
  document.getElementById('attNotes').value       = s.notes || '';

  // Set today's date
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('attDate').value = today;

  editAttIndex.value = index;
  openModal(attModal);
}

// ── Open for new mark (blank except date) ──
function openMarkModal() {
  modalTitle.textContent = 'Mark Attendance';
  attForm.reset();
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('attDate').value = today;
  editAttIndex.value = '';
  openModal(attModal);
}

// ── Mark Attendance buttons ──
document.getElementById('markAttendanceBtn').addEventListener('click', openMarkModal);
document.getElementById('qaMarkAtt').addEventListener('click', openMarkModal);

closeModalBtn.addEventListener('click',  () => closeModal(attModal));
cancelModalBtn.addEventListener('click', () => closeModal(attModal));
attModal.addEventListener('click', (e) => {
  if (e.target === attModal) closeModal(attModal);
});

attForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const attendance = document.getElementById('attStatus').value;
  const notes      = document.getElementById('attNotes').value.trim();

  if (!attendance) {
    alert('Please select an attendance status.');
    return;
  }

  const idx = editAttIndex.value;

  if (idx !== '') {
    attendanceData[idx].attendance = attendance;
    attendanceData[idx].notes      = notes;
  }

  closeModal(attModal);
  applyFilters();
  updateKPIs();
  updateChart();
});

/* ════════════════════════════
   VIEW MODAL
════════════════════════════ */
const viewModal     = document.getElementById('viewModal');
const viewBody      = document.getElementById('viewBody');
const viewModalTitle= document.getElementById('viewModalTitle');
const closeViewBtn  = document.getElementById('closeViewBtn');
const closeViewBtn2 = document.getElementById('closeViewBtn2');
const editFromView  = document.getElementById('editFromViewBtn');
let currentViewIndex = null;

function openViewModal(index) {
  currentViewIndex = index;
  const s      = attendanceData[index];
  const attCls = getAttBadge(s.attendance);
  const stCls  = s.status === 'Active' ? 'badge-active' : 'badge-inactive';

  viewModalTitle.textContent = `${s.id} — ${s.name}`;

  viewBody.innerHTML = `
    <div class="view-row">
      <div class="view-field">
        <span class="view-label">Student ID</span>
        <span class="view-value">${s.id}</span>
      </div>
      <div class="view-field">
        <span class="view-label">Student Name</span>
        <span class="view-value">${s.name}</span>
      </div>
    </div>
    <div class="view-row">
      <div class="view-field">
        <span class="view-label">Grade</span>
        <span class="view-value">${s.grade}</span>
      </div>
      <div class="view-field">
        <span class="view-label">Class</span>
        <span class="view-value">${s.cls}</span>
      </div>
    </div>
    <div class="view-row">
      <div class="view-field">
        <span class="view-label">Status</span>
        <span class="view-value">
          <span class="status-badge ${stCls}">${s.status}</span>
        </span>
      </div>
      <div class="view-field">
        <span class="view-label">Attendance</span>
        <span class="view-value">
          <span class="att-badge ${attCls}">${s.attendance}</span>
        </span>
      </div>
    </div>
    ${s.notes ? `
    <div class="view-field">
      <span class="view-label">Notes</span>
      <span class="view-value">${s.notes}</span>
    </div>` : ''}
  `;

  openModal(viewModal);
}

closeViewBtn.addEventListener('click',  () => closeModal(viewModal));
closeViewBtn2.addEventListener('click', () => closeModal(viewModal));
viewModal.addEventListener('click', (e) => {
  if (e.target === viewModal) closeModal(viewModal);
});

editFromView.addEventListener('click', () => {
  closeModal(viewModal);
  openEditModal(currentViewIndex);
});

// ── Quick Actions ──
document.getElementById('qaViewReport').addEventListener('click', () => {
  alert('View Attendance Report — navigate to reports page here.');
});

document.getElementById('qaDownload').addEventListener('click', () => {
  const headers = 'Student ID,Student Name,Grade,Class,Status,Attendance';
  const rows = attendanceData.map(s =>
    `${s.id},${s.name},${s.grade},${s.cls},${s.status},${s.attendance}`
  ).join('\n');
  const csv  = headers + '\n' + rows;
  const blob = new Blob([csv], { type: 'text/csv' });
  const url  = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href     = url;
  link.download = 'attendance-report.csv';
  link.click();
  URL.revokeObjectURL(url);
});

/* ════════════════════════════
   MODAL HELPERS
════════════════════════════ */
function openModal(modal) {
  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
  modal.classList.remove('show');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    [attModal, viewModal].forEach(m => {
      if (m.classList.contains('show')) closeModal(m);
    });
  }
});

/* ════════════════════════════
   INIT
════════════════════════════ */
setDate();
updateKPIs();
applyFilters();
setTimeout(initChart, 200);