// ===== Payments page =====

// Sample data - replace with real data / API later
let payments = [
  { name: "Kavindu Perera",       grade: "Grade 10", amount: 1500, status: "Paid",    method: "card" },
  { name: "Nirali Fernando",      grade: "Grade 9",  amount: 1000, status: "Pending", method: "bank" },
  { name: "Sumon Wijesinghe",     grade: "Grade 8",  amount: 1500, status: "Paid",    method: "cash" },
  { name: "Thewmi Wickramasinghe",grade: "Grade 10", amount: 1750, status: "Overdue", method: "bank" },
  { name: "Kinu Ranasinghe",      grade: "Grade 9",  amount: 1500, status: "Paid",    method: "card" },
  { name: "Amaya Silva",          grade: "Grade 9",  amount: 2000, status: "Paid",    method: "card" },
  { name: "Ruwan Jayasuriya",     grade: "Grade 10", amount: 1500, status: "Paid",    method: "bank" },
  { name: "Dilani Perera",        grade: "Grade 8",  amount: 1250, status: "Pending", method: "card" },
  { name: "Nimal Gunawardena",    grade: "Grade 9",  amount: 1500, status: "Paid",    method: "cash" },
  { name: "Sithara Bandara",      grade: "Grade 10", amount: 1750, status: "Paid",    method: "card" }
];

const PER_PAGE = 5;
let currentPage = 1;

const $ = (id) => document.getElementById(id);
const money = (n) => "Rs. " + n.toLocaleString("en-US");

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function toast(message) {
  const el = document.createElement("div");
  el.className = "pay-toast";
  el.textContent = message;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 2200);
}

// ----- Summary cards + payment methods -----
function renderStats() {
  const sum = (status) =>
    payments.filter((p) => p.status === status).reduce((t, p) => t + p.amount, 0);

  $("stat-total").textContent   = money(payments.reduce((t, p) => t + p.amount, 0));
  $("stat-paid").textContent    = money(sum("Paid"));
  $("stat-pending").textContent = money(sum("Pending"));
  $("stat-overdue").textContent = money(sum("Overdue"));

  ["card", "bank", "cash"].forEach((m) => {
    $("m-" + m).textContent = payments.filter((p) => p.method === m).length;
  });
}

// ----- Table -----
function renderTable() {
  const totalPages = Math.max(1, Math.ceil(payments.length / PER_PAGE));
  if (currentPage > totalPages) currentPage = totalPages;

  const start = (currentPage - 1) * PER_PAGE;
  const rows = payments.slice(start, start + PER_PAGE);
  const tbody = $("pay-tbody");

  if (rows.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" class="pay-empty">No payments yet. Click "+ Add payment" to record one.</td></tr>';
  } else {
    tbody.innerHTML = rows.map((p, i) => `
      <tr>
        <td>${escapeHtml(p.name)}</td>
        <td>${escapeHtml(p.grade)}</td>
        <td>${money(p.amount)}</td>
        <td><span class="badge ${p.status.toLowerCase()}">${p.status}</span></td>
        <td><button class="row-menu" data-index="${start + i}" title="Delete payment" aria-label="Delete payment"><i class="fa-solid fa-trash-can" aria-hidden="true"></i></button></td>
      </tr>`).join("");
  }

  const from = payments.length ? start + 1 : 0;
  const to = start + rows.length;
  $("pay-showing").textContent = `Showing ${from} to ${to} of ${payments.length} Payments`;

  renderPagination(totalPages);
}

function renderPagination(totalPages) {
  let html = `<button data-page="${currentPage - 1}" ${currentPage === 1 ? "disabled" : ""} aria-label="Previous page">&lt;</button>`;
  for (let i = 1; i <= totalPages; i++) {
    html += `<button data-page="${i}" class="${i === currentPage ? "active" : ""}">${i}</button>`;
  }
  html += `<button data-page="${currentPage + 1}" ${currentPage === totalPages ? "disabled" : ""} aria-label="Next page">&gt;</button>`;
  $("pagination").innerHTML = html;
}

function refresh() {
  renderStats();
  renderTable();
}

// ----- Events -----
$("pagination").addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-page]");
  if (!btn || btn.disabled) return;
  currentPage = Number(btn.dataset.page);
  renderTable();
});

$("pay-tbody").addEventListener("click", (e) => {
  const btn = e.target.closest(".row-menu");
  if (!btn) return;
  const p = payments[Number(btn.dataset.index)];
  if (confirm(`Delete the payment from ${p.name}?`)) {
    payments.splice(Number(btn.dataset.index), 1);
    refresh();
    toast("Payment deleted");
  }
});

// Add payment dialog
const dialog = $("pay-dialog");
const openDialog = () => { $("pay-form").reset(); dialog.showModal(); };

$("btn-add").addEventListener("click", openDialog);
$("qa-record").addEventListener("click", openDialog);
$("btn-cancel").addEventListener("click", () => dialog.close());

$("pay-form").addEventListener("submit", () => {
  payments.unshift({
    name: $("f-name").value.trim(),
    grade: $("f-grade").value,
    amount: Number($("f-amount").value),
    status: $("f-status").value,
    method: $("f-method").value
  });
  currentPage = 1;
  refresh();
  toast("Payment added");
});

// Quick actions (connect these to your backend later)
$("qa-remind").addEventListener("click", () => {
  const n = payments.filter((p) => p.status !== "Paid").length;
  toast(`Reminder sent to ${n} student${n === 1 ? "" : "s"} with unpaid fees`);
});
$("qa-invoice").addEventListener("click", () => toast("Invoices page coming soon"));

// Today's date in the header
$("today-date").textContent = "📅 " + new Date().toLocaleDateString("en-GB", {
  weekday: "short", day: "numeric", month: "short", year: "numeric"
});

refresh();