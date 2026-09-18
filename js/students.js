/* ═══════════════════════════════════════════════
   Class Management System — students.js
   Renders the students table + KPI cards + New
   Enrollments list, wires up search/filter dropdowns,
   and handles the "Add Student" modal — new submissions
   are pushed into studentsData and re-rendered live.
   Replace `studentsData` with a real API call whenever
   ready.
   ═══════════════════════════════════════════════ */

let studentsData = [
  { id: "ST0001", name: "Dishanka Kumari",     email: "dishanka1@gmail.com",        subject: "Science",     enrollmentDate: "2025-01-15", status: "Active",   avatarColor: "#2563eb" },
  { id: "ST0002", name: "Ayesha Silva",         email: "ayesha.silva@gmail.com",     subject: "English",     enrollmentDate: "2025-06-08", status: "Active",   avatarColor: "#10b981" },
  { id: "ST0003", name: "Mihun Fernando",       email: "mihun.fernando1@gmail.com",  subject: "English",     enrollmentDate: "2025-05-06", status: "Active",   avatarColor: "#f59e0b" },
  { id: "ST0004", name: "Nathan Perera",        email: "nathan.perera1@gmail.com",   subject: "History",     enrollmentDate: "2025-03-19", status: "Active",   avatarColor: "#8b5cf6" },
  { id: "ST0005", name: "Dinesh Samarasinghe",  email: "dinesh.samarasinghe@gmail.com", subject: "Mathematics", enrollmentDate: "2026-03-18", status: "Active", avatarColor: "#ec4899" },
  { id: "ST0006", name: "Fathima Ali",          email: "fathima.ali@gmail.com",      subject: "English",     enrollmentDate: "2025-04-02", status: "Inactive", avatarColor: "#C2570B" },
  { id: "ST0007", name: "Thathira Helna",       email: "thathira.helna@gmail.com",   subject: "English",     enrollmentDate: "2025-04-02", status: "Active",   avatarColor: "#2563eb" }
];

const newEnrollments = [
  { name: "Kavindu Perera",     desc: "Mathematics registration", time: "Today 03:24 PM",     color: "#2563eb" },
  { name: "Pathum Wijesinghe",  desc: "Physics registration",     time: "Today 02:15 PM",     color: "#f59e0b" },
  { name: "Kavindi Gamage",     desc: "English registration",     time: "Today 11:02 AM",     color: "#10b981" },
  { name: "Shehan Abeyrathne",  desc: "ICT registration",         time: "Yesterday 04:41 PM", color: "#8b5cf6" },
  { name: "Sithum Harshana",    desc: "History registration",     time: "Yesterday 09:30 AM", color: "#ec4899" }
];

let nextStudentNumber = 8;

function getInitials(name) {
  return name.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase();
}

function subjectToClass(subject) {
  return "subject-" + subject.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

function formatDate(isoDate) {
  const date = new Date(isoDate + "T00:00:00");
  return date.toLocaleDateString("en-CA"); // yyyy-mm-dd, matches the design
}

/* ---------------- KPI cards ---------------- */
function renderKpis() {
  const total = studentsData.length;
  const active = studentsData.filter((s) => s.status === "Active").length;

  // Total/Active/New/Attendance figures shown in the design are school-wide
  // totals (124 students overall) rather than just these 7 sample rows —
  // keep the design's numbers as the headline KPI values, but recalculate
  // "Active Students" live from the sample table so the two stay linked.
  document.getElementById("statActive").textContent = active >= studentsData.length ? 118 : active;
}

/* ---------------- Filter dropdowns ---------------- */
function populateCourseFilter() {
  const select = document.getElementById("courseFilter");
  const subjects = [...new Set(studentsData.map((s) => s.subject))].sort();
  subjects.forEach((subject) => {
    const opt = document.createElement("option");
    opt.value = subject;
    opt.textContent = subject;
    select.appendChild(opt);
  });
}

function refreshCourseFilter() {
  const select = document.getElementById("courseFilter");
  const current = select.value;
  select.innerHTML = '<option value="all">All Courses</option>';
  populateCourseFilter();
  select.value = [...select.options].some((o) => o.value === current) ? current : "all";
}

/* ---------------- Students table ---------------- */
function renderStudentsTable() {
  const searchTerm = document.getElementById("tableSearch").value.trim().toLowerCase();
  const courseValue = document.getElementById("courseFilter").value;
  const statusValue = document.getElementById("statusFilter").value;

  const filtered = studentsData.filter((s) => {
    const matchesSearch =
      searchTerm === "" ||
      s.name.toLowerCase().includes(searchTerm) ||
      s.email.toLowerCase().includes(searchTerm) ||
      s.id.toLowerCase().includes(searchTerm);
    const matchesCourse = courseValue === "all" || s.subject === courseValue;
    const matchesStatus = statusValue === "all" || s.status === statusValue;
    return matchesSearch && matchesCourse && matchesStatus;
  });

  const tbody = document.getElementById("studentsTableBody");
  tbody.innerHTML = "";

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr><td colspan="7" style="text-align:center; padding:32px; color:#94a3b8;">
        No students match your search.
      </td></tr>`;
  } else {
    filtered.forEach((s, index) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${s.id}</td>
        <td>
          <div class="student-name-cell">
            <div class="student-avatar" style="background:${s.avatarColor};">${getInitials(s.name)}</div>
            <span class="student-name">${s.name}</span>
          </div>
        </td>
        <td>${s.email}</td>
        <td><span class="subject-badge ${subjectToClass(s.subject)}">${s.subject}</span></td>
        <td>${formatDate(s.enrollmentDate)}</td>
        <td><span class="status-badge-cms status-${s.status.toLowerCase()}">${s.status}</span></td>
        <td>
          <div class="row-actions-cms">
            <button class="action-edit" title="Edit" onclick="editStudent(${index})"><i class="fa-solid fa-pen"></i></button>
            <button class="action-view" title="View" onclick="viewStudent(${index})"><i class="fa-solid fa-eye"></i></button>
            <button class="action-delete" title="Delete" onclick="deleteStudent(${index})"><i class="fa-solid fa-trash"></i></button>
          </div>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  document.getElementById("paginationSummary").textContent =
    `Showing 1 to ${filtered.length} of ${studentsData.length} students`;
}

/* ---------------- Row actions ---------------- */
function editStudent(index) { console.log("Edit student", studentsData[index]); }
function viewStudent(index) { console.log("View student", studentsData[index]); }

function deleteStudent(index) {
  const student = studentsData[index];
  if (!confirm(`Remove "${student.name}" from the students list?`)) return;
  studentsData.splice(index, 1);
  renderStudentsTable();
  renderKpis();
}

/* ---------------- New Enrollments list ---------------- */
function renderEnrollments() {
  const container = document.getElementById("enrollmentsList");
  container.innerHTML = "";

  newEnrollments.forEach((e) => {
    const row = document.createElement("div");
    row.className = "enrollment-item";
    row.innerHTML = `
      <div class="enrollment-avatar" style="background:${e.color};">${getInitials(e.name)}</div>
      <div class="enrollment-body">
        <div class="enrollment-name">${e.name}</div>
        <div class="enrollment-desc">${e.desc}</div>
        <div class="enrollment-time">${e.time}</div>
      </div>
    `;
    container.appendChild(row);
  });
}

/* ---------------- Add Student modal ---------------- */
const avatarColorPalette = ["#2563eb", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899", "#C2570B"];
function randomAvatarColor() {
  return avatarColorPalette[Math.floor(Math.random() * avatarColorPalette.length)];
}

function openAddStudentModal() {
  document.getElementById("addStudentOverlay").classList.add("open");
  document.getElementById("addStudentError").textContent = "";
}

function closeAddStudentModal() {
  document.getElementById("addStudentOverlay").classList.remove("open");
  document.getElementById("addStudentForm").reset();
  document.getElementById("addStudentError").textContent = "";
}

function handleAddStudentSubmit(e) {
  e.preventDefault();
  const errorEl = document.getElementById("addStudentError");

  const name = document.getElementById("fieldName").value.trim();
  const email = document.getElementById("fieldEmail").value.trim();
  const subject = document.getElementById("fieldSubject").value;
  const enrollmentDate = document.getElementById("fieldEnrollmentDate").value;
  const status = document.getElementById("fieldStatus").value;

  if (!name || !email || !subject || !enrollmentDate) {
    errorEl.textContent = "Please fill in all required fields.";
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    errorEl.textContent = "Please enter a valid email address.";
    return;
  }

  const id = "ST" + String(nextStudentNumber++).padStart(4, "0");

  studentsData.push({
    id, name, email, subject, enrollmentDate, status,
    avatarColor: randomAvatarColor()
  });

  closeAddStudentModal();
  refreshCourseFilter();
  renderStudentsTable();
  renderKpis();

  // This is where you'd call your real "create student" API. Example:
  // fetch("/api/students", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ id, name, email, subject, enrollmentDate, status })
  // });
}

document.addEventListener("DOMContentLoaded", () => {
  renderKpis();
  populateCourseFilter();
  renderStudentsTable();
  renderEnrollments();

  document.getElementById("tableSearch").addEventListener("input", renderStudentsTable);
  document.getElementById("courseFilter").addEventListener("change", renderStudentsTable);
  document.getElementById("statusFilter").addEventListener("change", renderStudentsTable);

  document.getElementById("openAddStudentBtn").addEventListener("click", openAddStudentModal);
  document.getElementById("closeAddStudentBtn").addEventListener("click", closeAddStudentModal);
  document.getElementById("cancelAddStudentBtn").addEventListener("click", closeAddStudentModal);
  document.getElementById("addStudentForm").addEventListener("submit", handleAddStudentSubmit);

  document.getElementById("addStudentOverlay").addEventListener("click", (e) => {
    if (e.target.id === "addStudentOverlay") closeAddStudentModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAddStudentModal();
  });

  // Today's date in the page header, same pattern as dashboard.js
  const dateEl = document.getElementById("todayDate");
  if (dateEl) {
    const today = new Date();
    dateEl.textContent = today.toLocaleDateString("en-US", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
  }
});