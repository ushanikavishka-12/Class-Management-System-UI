/* ════════════════════════════════════════════
   Class Management — subjects.js
   Subjects page: table, filters, modals
   ════════════════════════════════════════════ */

// ── Subject data ──
const subjects = [
  { code:'MATH101', name:'Mathematics',                grade:'Grade 10', teacher:'Kasun Perera',           category:'Mathematics', status:'Active',   emoji:'📐', color:'#eff6ff', textColor:'#2563eb', notes:'' },
  { code:'ENG101',  name:'English Language',           grade:'Grade 10', teacher:'Nimali Silva',           category:'Languages',   status:'Active',   emoji:'ENG', color:'#fef9c3', textColor:'#b45309', notes:'' },
  { code:'SCI101',  name:'Science',                    grade:'Grade 10', teacher:'Saman Wijesinghe',       category:'Science',     status:'Active',   emoji:'🧪', color:'#d1fae5', textColor:'#059669', notes:'' },
  { code:'HIS101',  name:'History',                    grade:'Grade 10', teacher:'Chathurika Fernando',    category:'Humanities',  status:'Active',   emoji:'🏛️', color:'#fef9c3', textColor:'#b45309', notes:'' },
  { code:'ICT101',  name:'Information & Communicati',  grade:'Grade 10', teacher:'Dinesh Jayasinghe',      category:'Technology',  status:'Active',   emoji:'💻', color:'#ede9fe', textColor:'#7c3aed', notes:'' },
  { code:'SIN101',  name:'Sinhala',                    grade:'Grade 10', teacher:'Tharushi Wickramasingh', category:'Languages',   status:'Active',   emoji:'📝', color:'#fce7f3', textColor:'#be185d', notes:'' },
  { code:'TAM101',  name:'Tamil',                      grade:'Grade 10', teacher:'Kumarsinghe',            category:'Languages',   status:'Inactive', emoji:'📝', color:'#fce7f3', textColor:'#be185d', notes:'' },
  { code:'BIO101',  name:'Biology',                    grade:'Grade 10', teacher:'Nadeeka Jayawardene',    category:'Science',     status:'Active',   emoji:'🔬', color:'#d1fae5', textColor:'#059669', notes:'' }
];

// ── Category definitions ──
const categories = [
  { name:'Mathematics', count:3, icon:'📐', bg:'#eff6ff',  text:'#2563eb' },
  { name:'Languages',   count:4, icon:'📝', bg:'#fef9c3',  text:'#b45309' },
  { name:'Science',     count:3, icon:'🧪', bg:'#d1fae5',  text:'#059669' },
  { name:'Humanities',  count:2, icon:'🏛️', bg:'#fef9c3',  text:'#b45309' },
  { name:'Technology',  count:2, icon:'💻', bg:'#ede9fe',  text:'#7c3aed' },
  { name:'Others',      count:4, icon:'📚', bg:'#f1f5f9',  text:'#64748b' }
];

// ── DOM ──
const subjectsBody = document.getElementById('subjectsBody');
const searchInput  = document.getElementById('searchInput');
const gradeFilter  = document.getElementById('gradeFilter');
const statusFilter = document.getElementById('statusFilter');
const resultsText  = document.getElementById('resultsText');

// ── Pagination ──
let currentPage = 1;
const perPage   = 8;
let filteredData = [...subjects];

// ── Today's date ──
function setDate() {
  const el = document.getElementById('bannerDate');
  if (!el) return;
  const d = new Date();
  el.textContent = '📅 ' + d.toLocaleDateString('en-US', {
    weekday:'short', day:'numeric', month:'short', year:'numeric'
  });
}

// ── Update KPIs ──
function updateKPIs() {
  const total    = subjects.length;
  const active   = subjects.filter(s => s.status === 'Active').length;
  const inactive = subjects.filter(s => s.status === 'Inactive').length;
  const teachers = new Set(subjects.map(s => s.teacher)).size;

  document.getElementById('kpiTotal').textContent    = total;
  document.getElementById('kpiActive').textContent   = active;
  document.getElementById('kpiInactive').textContent = inactive;
  document.getElementById('kpiTeachers').textContent = teachers;
}

// ── Render categories ──
function renderCategories() {
  const list = document.getElementById('categoriesList');
  if (!list) return;
  list.innerHTML = '';

  categories.forEach(cat => {
    const item = document.createElement('div');
    item.className = 'category-item';
    item.innerHTML = `
      <div class="cat-icon" style="background:${cat.bg};color:${cat.text};">
        ${cat.icon}
      </div>
      <div class="cat-info">
        <p class="cat-name">${cat.name}</p>
        <p class="cat-count">${cat.count} subjects</p>
      </div>
    `;
    list.appendChild(item);
  });
}

// ── Render table ──
function renderSubjects(data) {
  subjectsBody.innerHTML = '';

  const start = (currentPage - 1) * perPage;
  const end   = start + perPage;
  const paged = data.slice(start, end);

  if (paged.length === 0) {
    subjectsBody.innerHTML = `
      <tr><td colspan="6"
        style="text-align:center;padding:30px;color:#94a3b8;">
        No subjects found.
      </td></tr>`;
    resultsText.textContent = 'Showing 0 subjects';
    return;
  }

  paged.forEach(sub => {
    const realIndex = subjects.indexOf(sub);
    const badgeCls  = sub.status === 'Active' ? 'badge-active' : 'badge-inactive';

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>
        <div class="code-cell">
          <div class="code-icon"
            style="background:${sub.color};color:${sub.textColor};">
            ${sub.emoji.length <= 4 ? sub.emoji : sub.code.slice(0,3)}
          </div>
          <span class="code-text">${sub.code}</span>
        </div>
      </td>
      <td>${sub.name}</td>
      <td><span class="grade-badge">${sub.grade}</span></td>
      <td>${sub.teacher}</td>
      <td><span class="status-badge ${badgeCls}">${sub.status}</span></td>
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
    subjectsBody.appendChild(row);
  });

  const total = data.length;
  const s = start + 1;
  const e = Math.min(end, total);
  resultsText.textContent =
    `Showing ${s} to ${e} of ${total} subjects`;

  updatePaginationBtns(data.length);
  attachListeners();
}

// ── Pagination buttons ──
function updatePaginationBtns(total) {
  const totalPages = Math.ceil(total / perPage);
  const p1 = document.getElementById('page1');
  const p2 = document.getElementById('page2');

  if (p1) p1.classList.toggle('active', currentPage === 1);
  if (p2) {
    p2.style.display = totalPages >= 2 ? '' : 'none';
    p2.classList.toggle('active', currentPage === 2);
  }
}

document.getElementById('prevPage').addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    renderSubjects(filteredData);
  }
});

document.getElementById('nextPage').addEventListener('click', () => {
  const totalPages = Math.ceil(filteredData.length / perPage);
  if (currentPage < totalPages) {
    currentPage++;
    renderSubjects(filteredData);
  }
});

document.getElementById('page1')?.addEventListener('click', () => {
  currentPage = 1;
  renderSubjects(filteredData);
});

document.getElementById('page2')?.addEventListener('click', () => {
  currentPage = 2;
  renderSubjects(filteredData);
});

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
      if (confirm(`Delete subject "${subjects[i].name}"?`)) {
        subjects.splice(i, 1);
        applyFilters();
      }
    });
  });
}

// ── Filter logic ──
function applyFilters() {
  const search = searchInput.value.trim().toLowerCase();
  const grade  = gradeFilter.value;
  const status = statusFilter.value;

  filteredData = subjects.filter(s => {
    const matchSearch =
      s.name.toLowerCase().includes(search)    ||
      s.code.toLowerCase().includes(search)    ||
      s.teacher.toLowerCase().includes(search);
    const matchGrade  = !grade  || s.grade  === grade;
    const matchStatus = !status || s.status === status;
    return matchSearch && matchGrade && matchStatus;
  });

  currentPage = 1;
  updateKPIs();
  renderSubjects(filteredData);
}

searchInput.addEventListener('input',    applyFilters);
gradeFilter.addEventListener('change',   applyFilters);
statusFilter.addEventListener('change',  applyFilters);

/* ════════════════════════════
   ADD / EDIT MODAL
════════════════════════════ */
const subjectModal  = document.getElementById('subjectModal');
const subjectForm   = document.getElementById('subjectForm');
const modalTitle    = document.getElementById('modalTitle');
const closeModalBtn = document.getElementById('closeModalBtn');
const cancelModalBtn= document.getElementById('cancelModalBtn');
const editSubIndex  = document.getElementById('editSubIndex');

document.getElementById('addSubjectBtn').addEventListener('click', openAddModal);
document.getElementById('qaAddSubject').addEventListener('click', openAddModal);

function openAddModal() {
  modalTitle.textContent = 'Add New Subject';
  subjectForm.reset();
  editSubIndex.value = '';
  openModal(subjectModal);
}

function openEditModal(index) {
  const s = subjects[index];
  modalTitle.textContent = 'Edit Subject';

  document.getElementById('subCode').value     = s.code;
  document.getElementById('subName').value     = s.name;
  document.getElementById('subGrade').value    = s.grade;
  document.getElementById('subTeacher').value  = s.teacher;
  document.getElementById('subCategory').value = s.category;
  document.getElementById('subStatus').value   = s.status;
  document.getElementById('subNotes').value    = s.notes || '';

  editSubIndex.value = index;
  openModal(subjectModal);
}

closeModalBtn.addEventListener('click',  () => closeModal(subjectModal));
cancelModalBtn.addEventListener('click', () => closeModal(subjectModal));
subjectModal.addEventListener('click', (e) => {
  if (e.target === subjectModal) closeModal(subjectModal);
});

subjectForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const code     = document.getElementById('subCode').value.trim();
  const name     = document.getElementById('subName').value.trim();
  const grade    = document.getElementById('subGrade').value;
  const teacher  = document.getElementById('subTeacher').value.trim();
  const category = document.getElementById('subCategory').value;
  const status   = document.getElementById('subStatus').value;
  const notes    = document.getElementById('subNotes').value.trim();

  if (!code || !name || !grade || !teacher || !category || !status) {
    alert('Please fill in all required fields.');
    return;
  }

  const subData = {
    code, name, grade, teacher, category, status, notes,
    emoji: '📚', color: '#f1f5f9', textColor: '#64748b'
  };

  const idx = editSubIndex.value;
  if (idx !== '') {
    subjects[idx] = subData;
  } else {
    subjects.push(subData);
  }

  closeModal(subjectModal);
  applyFilters();
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
  const s = subjects[index];
  const badgeCls = s.status === 'Active' ? 'badge-active' : 'badge-inactive';

  viewModalTitle.textContent = `${s.code} — ${s.name}`;

  viewBody.innerHTML = `
    <div style="text-align:center;padding:14px 0 8px;">
      <div style="width:52px;height:52px;border-radius:12px;
        background:${s.color};color:${s.textColor};font-size:22px;
        display:flex;align-items:center;justify-content:center;
        margin:0 auto 6px;">${s.emoji}</div>
    </div>
    <div class="view-row">
      <div class="view-field">
        <span class="view-label">Subject Code</span>
        <span class="view-value">${s.code}</span>
      </div>
      <div class="view-field">
        <span class="view-label">Subject Name</span>
        <span class="view-value">${s.name}</span>
      </div>
    </div>
    <div class="view-row">
      <div class="view-field">
        <span class="view-label">Grade</span>
        <span class="view-value">${s.grade}</span>
      </div>
      <div class="view-field">
        <span class="view-label">Teacher</span>
        <span class="view-value">${s.teacher}</span>
      </div>
    </div>
    <div class="view-row">
      <div class="view-field">
        <span class="view-label">Category</span>
        <span class="view-value">${s.category}</span>
      </div>
      <div class="view-field">
        <span class="view-label">Status</span>
        <span class="view-value">
          <span class="status-badge ${badgeCls}">${s.status}</span>
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
['qaManageTeachers', 'qaAssignments', 'qaTimetable'].forEach(id => {
  document.getElementById(id).addEventListener('click', () => {
    const label = document.getElementById(id).textContent.trim();
    alert(`"${label}" — navigate to the relevant page here.`);
  });
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
    [subjectModal, viewModal].forEach(m => {
      if (m.classList.contains('show')) closeModal(m);
    });
  }
});

/* ════════════════════════════
   INIT
════════════════════════════ */
setDate();
updateKPIs();
renderCategories();
filteredData = [...subjects];
renderSubjects(filteredData);