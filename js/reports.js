/* ═══════════════════════════════════════════════
   Class Management System — reports.js
   Renders the Report Overview mini charts, Recent
   Reports list, and the Detailed Reports table, and
   wires up the category tabs + search box.
   Replace the data arrays with real API calls whenever
   ready.
   ═══════════════════════════════════════════════ */

const enrollmentBreakdown = [
  { name: "Active",     count: 102, color: "#10b981" },
  { name: "Inactive",   count: 18,  color: "#f59e0b" },
  { name: "Graduated",  count: 4,   color: "#8b5cf6" }
];

const performanceGrades = {
  labels: ["A", "B", "C", "D", "F"],
  values: [38, 45, 28, 10, 3]
};

const paymentBreakdown = [
  { name: "Paid",    count: 103, color: "#10b981" },
  { name: "Pending", count: 15,  color: "#f59e0b" },
  { name: "Overdue", count: 6,   color: "#ec4899" }
];

const attendanceTrend = {
  labels: ["W1", "W2", "W3", "W4"],
  values: [78, 83, 80, 86]
};

const recentReports = [
  { name: "Student Report - July 2026",     date: "Jul 8, 2026", size: "2.4 MB" },
  { name: "Payment Report - July 2026",     date: "Jul 5, 2026", size: "1.8 MB" },
  { name: "Attendance Report - July 2026",  date: "Jul 5, 2026", size: "3.1 MB" },
  { name: "Subject Report - July 2026",     date: "Jul 1, 2026", size: "2.0 MB" }
];

const detailedReports = [
  { name: "Student List Report",        category: "Student",    date: "2026-07-08", size: "2.4 MB" },
  { name: "Student Performance Report", category: "Student",    date: "2026-07-05", size: "1.9 MB" },
  { name: "Class Wise Report",          category: "Student",    date: "2026-07-03", size: "2.1 MB" },
  { name: "New Enrollment Report",      category: "Student",    date: "2026-07-01", size: "1.8 MB" },
  { name: "Subject Pass Rate Report",    category: "Subject",    date: "2026-07-02", size: "1.6 MB" },
  { name: "Payment Collection Report",   category: "Payment",    date: "2026-07-04", size: "2.2 MB" },
  { name: "Weekly Attendance Report",    category: "Attendance", date: "2026-07-06", size: "3.1 MB" }
];

let activeCategory = "Student";

/* ---------------- Report Overview mini charts ---------------- */
function renderEnrollmentDonut() {
  const ctx = document.getElementById("enrollmentDonut");
  if (ctx && typeof Chart !== "undefined") {
    new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: enrollmentBreakdown.map((e) => e.name),
        datasets: [{
          data: enrollmentBreakdown.map((e) => e.count),
          backgroundColor: enrollmentBreakdown.map((e) => e.color),
          borderWidth: 0
        }]
      },
      options: { responsive: true, maintainAspectRatio: false, cutout: "70%", plugins: { legend: { display: false } } }
    });
  }

  const legend = document.getElementById("enrollmentLegend");
  legend.innerHTML = enrollmentBreakdown.map((e) => `
    <div class="mini-legend-row">
      <span class="mini-legend-dot" style="background:${e.color};"></span>
      <span class="mini-legend-name">${e.name}</span>
      <span class="mini-legend-count">${e.count}</span>
    </div>
  `).join("");
}

function renderPerformanceBarChart() {
  const ctx = document.getElementById("performanceBarChart");
  if (!ctx || typeof Chart === "undefined") return;
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: performanceGrades.labels,
      datasets: [{
        data: performanceGrades.values,
        backgroundColor: "#f59e0b",
        borderRadius: 5,
        maxBarThickness: 22
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { display: false },
        x: { grid: { display: false }, ticks: { font: { size: 10 } } }
      }
    }
  });
}

function renderPaymentDonut() {
  const ctx = document.getElementById("paymentDonut");
  if (ctx && typeof Chart !== "undefined") {
    new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: paymentBreakdown.map((p) => p.name),
        datasets: [{
          data: paymentBreakdown.map((p) => p.count),
          backgroundColor: paymentBreakdown.map((p) => p.color),
          borderWidth: 0
        }]
      },
      options: { responsive: true, maintainAspectRatio: false, cutout: "70%", plugins: { legend: { display: false } } }
    });
  }

  const legend = document.getElementById("paymentLegend");
  legend.innerHTML = paymentBreakdown.map((p) => `
    <div class="mini-legend-row">
      <span class="mini-legend-dot" style="background:${p.color};"></span>
      <span class="mini-legend-name">${p.name}</span>
      <span class="mini-legend-count">${p.count}</span>
    </div>
  `).join("");
}

function renderAttendanceLineChart() {
  const ctx = document.getElementById("attendanceLineChart");
  if (!ctx || typeof Chart === "undefined") return;
  new Chart(ctx, {
    type: "line",
    data: {
      labels: attendanceTrend.labels,
      datasets: [{
        data: attendanceTrend.values,
        borderColor: "#2563eb",
        backgroundColor: "rgba(37, 99, 235, 0.08)",
        borderWidth: 2,
        pointBackgroundColor: "#2563eb",
        pointRadius: 3,
        tension: 0.35,
        fill: true
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { display: false },
        x: { grid: { display: false }, ticks: { font: { size: 10 } } }
      }
    }
  });
}

/* ---------------- Recent Reports list ---------------- */
function renderRecentReports() {
  const container = document.getElementById("recentReportsList");
  container.innerHTML = recentReports.map((r) => `
    <div class="recent-report-row">
      <div class="recent-report-icon"><i class="fa-solid fa-file-pdf"></i></div>
      <div class="recent-report-info">
        <div class="recent-report-name">${r.name}</div>
        <div class="recent-report-meta">${r.date} &middot; ${r.size}</div>
      </div>
      <button class="recent-report-download" title="Download" onclick="downloadReport('${r.name}')">
        <i class="fa-solid fa-download"></i>
      </button>
    </div>
  `).join("");
}

/* ---------------- Detailed Reports table ---------------- */
function formatDisplayDate(isoDate) {
  const date = new Date(isoDate + "T00:00:00");
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function renderDetailedReportsTable() {
  const searchTerm = document.getElementById("detailedSearch").value.trim().toLowerCase();

  const filtered = detailedReports.filter((r) => {
    const matchesCategory = r.category === activeCategory;
    const matchesSearch = searchTerm === "" || r.name.toLowerCase().includes(searchTerm);
    return matchesCategory && matchesSearch;
  });

  const tbody = document.getElementById("detailedReportsTableBody");

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr><td colspan="5" style="text-align:center; padding:28px; color:#94a3b8;">
        No reports found in this category.
      </td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map((r) => `
    <tr>
      <td class="report-name-cell">${r.name}</td>
      <td>${r.category}</td>
      <td>${formatDisplayDate(r.date)}</td>
      <td>${r.size}</td>
      <td>
        <button class="download-btn-row" onclick="downloadReport('${r.name}')">
          <i class="fa-solid fa-download"></i> Download
        </button>
      </td>
    </tr>
  `).join("");
}

/* ---------------- Category tabs ---------------- */
function setupReportTabs() {
  document.querySelectorAll(".report-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".report-tab").forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      activeCategory = tab.dataset.category;
      renderDetailedReportsTable();
    });
  });
}

/* ---------------- Actions (placeholders ready for real export logic) ---------------- */
function generateReport(type) {
  // Wire this up to a real report-generation endpoint whenever ready
  console.log("Generate report:", type);
  alert(`Generating ${type} Report... this is where a real export would download.`);
}

function downloadReport(name) {
  const reportName = (name || "Report").trim();
  const matchingReport = detailedReports.find((r) => r.name === reportName) || null;

  if (!window.jspdf || !window.jspdf.jsPDF) {
    console.error("jsPDF library failed to load.");
    alert("PDF export is not available right now.");
    return;
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFillColor(255, 244, 236);
  doc.rect(0, 0, 210, 40, "F");
  doc.setTextColor(154, 52, 18);
  doc.setFontSize(18);
  doc.text(reportName, 14, 22);

  doc.setTextColor(30, 41, 59);
  doc.setFontSize(11);
  doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 34);

  const details = [
    `Category: ${matchingReport ? matchingReport.category : "General"}`,
    `Date: ${matchingReport ? formatDisplayDate(matchingReport.date) : new Date().toLocaleDateString()}`,
    `Size: ${matchingReport ? matchingReport.size : "N/A"}`,
    "",
    "This PDF was generated from the Class Management System reports page."
  ];

  details.forEach((line, index) => {
    doc.text(line, 14, 52 + index * 8);
  });

  const safeFileName = reportName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "report";
  doc.save(`${safeFileName}.pdf`);
}

document.addEventListener("DOMContentLoaded", () => {
  renderEnrollmentDonut();
  renderPerformanceBarChart();
  renderPaymentDonut();
  renderAttendanceLineChart();
  renderRecentReports();
  renderDetailedReportsTable();
  setupReportTabs();

  document.getElementById("detailedSearch").addEventListener("input", renderDetailedReportsTable);
  document.getElementById("downloadOverviewBtn").addEventListener("click", () => downloadReport("Report Overview"));

  const dateEl = document.getElementById("todayDate");
  if (dateEl) {
    const today = new Date();
    dateEl.textContent = today.toLocaleDateString("en-US", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
  }
});