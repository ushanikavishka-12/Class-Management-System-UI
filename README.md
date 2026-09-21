# 🎓 Class Management System UI

A modern, responsive **Class Management System** frontend built with
HTML, Tailwind CSS, Bootstrap 5, and JavaScript.
Designed and implemented by the EgoTECH World team as a multi-page
UI system — no build tools required.

---

## 🚀 Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| HTML5 | — | Page structure |
| Tailwind CSS | CDN (Play) | Utility-first styling |
| Bootstrap | 5.3.3 | Grid system & components |
| JavaScript (ES6+) | — | Interactivity & data |
| Font Awesome | 6.5.1 | Icons |
| Chart.js | 4.4.1 | Dashboard charts |

---

## 📁 Project Structure

| Path | Description |
|---|---|
| `components/sidebar.html` | Left navigation sidebar — shared across all pages |
| `components/topbar.html` | Top search bar & admin chip — shared across all pages |
| `components/footer.html` | EgoTECH World footer — shared across all pages |
| `images/` | Project images & assets |
| `js/components.js` | Loads sidebar, topbar, footer into every page via fetch() |
| `js/dashboard.js` | Dashboard charts, calendar, activities |
| `js/students.js` | Students page logic |
| `styles/dashboard.css` | Shared layout styles (sidebar, topbar, footer) + dashboard styles |
| `styles/students.css` | Students page-specific styles |
| `dashboard.html` | 📊 Dashboard page |
| `students.html` | 👨‍🎓 Students page |

---

## 📄 Pages Overview

### ✅ Completed Pages

| Page | File | Description |
|---|---|---|
| Dashboard | `dashboard.html` | KPI cards, Student Overview line chart, Courses Distribution donut, Mini Calendar, Recent Activities, Quick Actions |
| Students | `students.html` | Student list, enrollment management, CRUD operations |

### 🔜 Planned Pages

| Page | File | Description |
|---|---|---|
| Courses | `courses.html` | Course management |
| Payments | `payments.html` | Payment records & tracking |
| Attendance | `attendance.html` | Attendance marking & reports |
| Reports | `reports.html` | Analytics & business reports |
| Settings | `settings.html` | System configuration |

---

## 🏗️ Architecture

### Shared Component System

Every page uses three shared HTML components loaded dynamically via
`fetch()` in `js/components.js`. The three placeholder divs —
`#sidebar-placeholder`, `#topbar-placeholder`, and
`#footer-placeholder` — must appear in every page for the
components to load correctly.

Active sidebar nav highlighting is automatic. Each page `<body>`
carries a `data-page` attribute that matches the `data-page` on
the corresponding `.nav-item` in the sidebar. `components.js`
reads it after loading the sidebar and adds the `.active` class
to the correct link.

The component system works in two modes without any configuration
change — when opened with **Live Server** it uses `fetch()` to
load the HTML files, and when opened directly as a `file://` URL
it falls back to inline HTML already embedded inside `components.js`.

### CSS Architecture

`styles/dashboard.css` is the shared stylesheet that every page
must load first. It contains the CSS variables, the app layout
(sidebar + main area), sidebar styles, topbar styles, and footer
styles. Each page then loads its own CSS file after `dashboard.css`
for page-specific overrides and styles.

### Adding a New Page

Every new page must follow this pattern — link `dashboard.css`
before the page CSS, set `data-page` on `<body>`, include the three
placeholder divs, and load `components.js` before the page script.
The sidebar active state is then handled automatically.

---

## 🎨 Design System

### Color Palette

| CSS Variable | Hex | Usage |
|---|---|---|
| `--cms-blue` | `#1a2a5e` | Sidebar background |
| `--cms-blue-mid` | `#1e3a7a` | Sidebar darker tones |
| `--cms-blue-nav` | `#2563eb` | Active nav, buttons, links |
| `--cms-blue-light` | `#eff6ff` | Blue tinted backgrounds |
| `--cms-green` | `#10b981` | Success, positive changes |
| `--cms-green-light` | `#d1fae5` | Green tinted backgrounds |
| `--cms-orange` | `#f59e0b` | Warnings, payments |
| `--cms-orange-light` | `#fef9c3` | Orange tinted backgrounds |
| `--cms-pink` | `#ec4899` | Attendance, highlights |
| `--cms-pink-light` | `#fce7f3` | Pink tinted backgrounds |
| `--cms-purple` | `#8b5cf6` | Record payment accent |
| `--cms-purple-light` | `#ede9fe` | Purple tinted backgrounds |
| `--cms-bg` | `#f1f5fb` | Page background |
| `--text-dark` | `#0f172a` | Primary text |
| `--text-muted` | `#64748b` | Secondary / muted text |
| `--border` | `#e2e8f0` | Borders & dividers |

### Typography

- **Font:** Segoe UI, system-ui, sans-serif
- **Page headings:** 700–800 weight
- **Card titles:** 700 weight, 14px
- **Body text:** 400–500 weight, 13px
- **Labels:** 600 weight, 11–12px

### Sidebar Navigation Items

| Label | Icon | `data-page` | Target File | Status |
|---|---|---|---|---|
| Dashboard | `fa-house` | `dashboard` | `dashboard.html` | ✅ Done |
| Students | `fa-users` | `students` | `students.html` | ✅ Done |
| Courses | `fa-book-open` | `courses` | `courses.html` | 🔜 Planned |
| Payments | `fa-credit-card` | `payments` | `payments.html` | 🔜 Planned |
| Attendance | `fa-calendar-check` | `attendance` | `attendance.html` | 🔜 Planned |
| Reports | `fa-chart-bar` | `reports` | `reports.html` | 🔜 Planned |
| Settings | `fa-gear` | `settings` | `settings.html` | 🔜 Planned |

---

## 📊 Dashboard Features

### KPI Cards

| Card | Value | Color |
|---|---|---|
| Total Students | 124 (+12% vs last month) | Blue |
| Total Courses | 8 (+2% vs last month) | Green |
| Total Payments | $ 2,480 (+18% vs last month) | Orange |
| Attendance Rate | 92% (+5% vs last month) | Pink |

### Charts

| Chart | Type | Description |
|---|---|---|
| Student Overview | Line (Chart.js) | Monthly student growth Jan–Jul |
| Courses Distribution | Doughnut (Chart.js) | 6 subjects with two-column legend |

### Other Sections

| Section | Description |
|---|---|
| Welcome Banner | Greeting, date, and banner image |
| Mini Calendar | Interactive JS calendar with prev/next month navigation and today highlighted |
| Recent Activities | 4 latest events with emoji avatars and timestamps |
| Quick Actions | Add Student, Add Course, Record Payment, Mark Attendance |

---

## 👨‍🎓 Students Page Features

| Feature | Description |
|---|---|
| KPI Cards | Total Students, Active, Inactive (live update on add/edit/delete) |
| Student Table | Full list with name, ID, course, contact, status |
| Search | Filter students by name, ID, or course in real time |
| Add Student | Modal form to register a new student |
| Edit Student | Pre-filled modal to update existing student details |
| View Student | Read-only detail view modal |
| Delete Student | Confirmation dialog then removes from list |
| Status Badges | Active (green) / Inactive (red) badges |

---

## 🛠️ How to Run

### Option 1 — Live Server (Recommended)

1. Open the project folder in VS Code
2. Install the **Live Server** extension if not already installed
3. Right-click `dashboard.html` and select **Open with Live Server**
4. The browser opens at `http://127.0.0.1:5500/dashboard.html`

### Option 2 — Direct File Open

1. Open `dashboard.html` directly in your browser
2. Shared components load from the inline fallback HTML
   inside `js/components.js`
3. All features work without a server

---

## 🔗 Page Flow

| From | To | Trigger |
|---|---|---|
| signin.html (planned) | dashboard.html | Successful login |
| dashboard.html | students.html | Sidebar nav |
| dashboard.html | Quick Action buttons | Add Student / Add Course |
| Any page | Any page | Sidebar navigation |

---

## 🤝 Team & Contribution

This project is developed by a team at **EgoTECH World**.

### Workflow

- One member owns and manages the GitHub repository
- Team members clone or pull the repo and implement assigned pages
- Each member works on their own branch and opens a pull request
- The shared component files inside `components/` must not be edited
  for page-specific changes — they are shared by every page
- Page-specific changes belong in the page's own HTML, CSS, and JS files

### New Page Checklist

| Step | Action |
|---|---|
| 1 | Create `[page].html` using the standard page template |
| 2 | Set `data-page="[page]"` on the `<body>` tag |
| 3 | Create `styles/[page].css` for page-specific styles |
| 4 | Create `js/[page].js` for page logic |
| 5 | Link `dashboard.css` first, then `[page].css` in the head |
| 6 | Add the three placeholder divs for sidebar, topbar, and footer |
| 7 | Load `components.js` before the page script |
| 8 | Sidebar active state is handled automatically — no extra work needed |

---

## 🏢 Company

**EgoTECH World Pvt Ltd**
Developing ready made and custom solutions for modern challenges.

- 🌐 Website: [egotechworld.com](https://egotechworld.com)
- 📘 Facebook: [facebook.com/egotechworld](https://facebook.com)
- 💼 LinkedIn: [linkedin.com/company/egotechworld](https://linkedin.com)

---

## 📅 Project Info

| Info | Detail |
|---|---|
| Project | Class Management System UI |
| Company | EGOTECHWORLD PVT LTD |
| Year | 2026 |
| Stack | HTML · Tailwind CSS · Bootstrap 5 · JavaScript |
| Charts | Chart.js 4.4.1 |
| Icons | Font Awesome 6.5.1 |
| Pages Done | 2 of 8 (Dashboard, Students) |
| Status | 🟡 In Progress |

---

*© 2026 egotechworld.com — EGOTECHWORLD PVT LTD. All Rights Reserved.*