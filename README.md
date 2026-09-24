# 🎓 Class Management System UI

Frontend UI for the **Class Management System**, designed and developed for **EGOTECH WORLD**.

---

## Project Overview

This project focuses on creating a modern, responsive, and user-friendly **Class Management System interface**. The UI was designed to provide an efficient experience for managing classes, students, subjects, payments, and other academic activities through a clean dashboard-based layout.

The project follows a reusable component architecture by separating common UI elements such as the **Sidebar**, **Topbar**, and **Footer** into reusable components loaded dynamically via JavaScript.

---

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- Bootstrap 5.3.3
- Tailwind CSS (CDN Play)
- Font Awesome 6.5.1
- Chart.js 4.4.1
- Figma (UI Design)

---

## Project Structure

| Path | Description |
|---|---|
| `components/footer.html` | EgoTECH World footer — shared across all pages |
| `components/sidebar.html` | Left navigation sidebar — shared across all pages |
| `components/topbar.html` | Top search bar & admin chip — shared across all pages |
| `images/` | Project images & assets |
| `js/components.js` | Loads sidebar, topbar, and footer into every page via fetch() |
| `js/dashboard.js` | Dashboard charts, calendar, and activity feed logic |
| `js/payment.js` | Payments page logic |
| `js/students.js` | Students page CRUD and filter logic |
| `js/subjects.js` | Subjects page CRUD, filter, and pagination logic |
| `styles/dashboard.css` | Shared layout styles (sidebar, topbar, footer) + dashboard styles |
| `styles/payment.css` | Payments page styles |
| `styles/students.css` | Students page styles |
| `styles/subjects.css` | Subjects page styles (orange sidebar design) |
| `dashboard.html` | 📊 Dashboard page |
| `payment.html` | 💳 Payments page |
| `students.html` | 👨‍🎓 Students page |
| `subjects.html` | 📚 Subjects page |
| `README.md` | Project documentation |

---

## Features

### Dashboard
- Modern class management dashboard interface
- 4 KPI cards — Total Students, Total Courses, Total Payments, Attendance Rate
- Student Overview interactive line chart (Chart.js)
- Courses Distribution donut chart (Chart.js)
- Interactive mini calendar with month navigation
- Recent Activities feed with timestamps
- Quick Actions panel — Add Student, Add Course, Record Payment, Mark Attendance
- Responsive dashboard layout

### Students Management
- 3 KPI cards — Total Students, Active, Inactive (live update)
- Full student list with name, ID, course, contact, and status
- Real-time search by name, ID, or course
- Add, Edit, View, and Delete student records
- Modal forms with validation
- Active / Inactive status badges
- Responsive student page layout

### Subjects Management
- 4 KPI cards — Total Subjects, Active Subjects, Inactive Subjects, Total Teachers (live update)
- Full subject list with code, name, grade, teacher, and status
- Real-time search by subject name, code, or teacher
- Grade filter and Status filter
- Add, Edit, View, and Delete subject records
- Paginated table — 8 subjects per page with page navigation
- Subject Categories right panel with icons and counts
- Quick Actions panel — Add New Subject, Manage Teachers, Subject Assignments, View Timetable
- Responsive subjects page layout

### Payments Management
- Payments tracking and management interface
- Payment records list and details display
- Search and filtering options
- Organized payment management interface

### Reusable Components
- Separate Sidebar component with active nav highlighting
- Separate Topbar component with search and admin chip
- Separate Footer component (EgoTECH World branded)
- `components.js` loads all three dynamically via fetch()
- Works with Live Server and direct file:// open (fallback HTML built in)
- Active sidebar item auto-highlighted using `data-page` attribute on `<body>`

### User Interface Design
- Clean and professional class management design
- Two design themes — dark blue sidebar (Dashboard, Students, Payments) and orange sidebar (Subjects)
- Responsive layout for different screen sizes
- Organized navigation structure
- User-friendly forms, tables, cards, modals, and badges

---

## Pages Developed

| Page | File | Status |
|---|---|---|
| Dashboard | `dashboard.html` | ✅ Complete |
| Students | `students.html` | ✅ Complete |
| Subjects | `subjects.html` | ✅ Complete |
| Payments | `payment.html` | ✅ Complete |
| Sidebar Component | `components/sidebar.html` | ✅ Complete |
| Topbar Component | `components/topbar.html` | ✅ Complete |
| Footer Component | `components/footer.html` | ✅ Complete |

---

## Planned Pages

| Page | File | Status |
|---|---|---|
| Attendance | `attendance.html` | 🔜 Planned |
| Reports | `reports.html` | 🔜 Planned |
| Settings | `settings.html` | 🔜 Planned |

---

## How to Run

### Option 1 — Live Server (Recommended)

1. Open the project folder in VS Code
2. Install the **Live Server** extension if not already installed
3. Right-click `dashboard.html` and select **Open with Live Server**
4. The browser opens at `http://127.0.0.1:5500/dashboard.html`

### Option 2 — Direct File Open

1. Open `dashboard.html` directly in your browser
2. Shared components load from the inline fallback HTML inside `js/components.js`
3. All features work without a server

---

## Development Process

1. Designed the user interface in **Figma**.
2. Created the frontend structure using **HTML5**.
3. Developed styling using **CSS3, Bootstrap 5, and Tailwind CSS**.
4. Added JavaScript functionality for components and page interactions.
5. Created reusable UI components for sidebar, topbar, and footer.
6. Organized files into separate folders for better project management.
7. Tested and refined the UI for better user experience.
8. Committed and pushed completed work to **GitHub**.

---

## Future Improvements

- Add Attendance management module
- Add Reports management module
- Add Settings page
- Connect with backend APIs
- Implement user authentication
- Add database integration
- Improve mobile responsiveness across all pages

---

## Author

Developed as a frontend UI project for **EGOTECH WORLD**.

---

*© 2026 egotechworld.com — EGOTECHWORLD PVT LTD. All Rights Reserved.*