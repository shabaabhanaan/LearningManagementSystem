# Learning Management System (LMS)

A full-stack Learning Management System built with **React** (frontend) and **Node.js/Express** (backend), featuring a modern UI and role-based access control for students, instructors, and admins.

## 🚀 Core Features

### Authentication & Roles
- 🔐 JWT-based authentication
- 👥 Roles: **Student**, **Instructor**, **Admin**
- 🛡️ Password hashing with bcrypt
- 🔑 Protected API routes using middleware

### Course Management
- 📚 Create, edit, and delete courses (admin & instructor)
- 🖼️ Support for course thumbnails, content links, and video URLs
- 🌐 Courses exposed via REST API and consumed by the React frontend

### Dashboards
- 🧑‍🎓 **Student dashboard**
  - View available courses with media
  - Edit basic profile details
  - Open and manage support tickets
- 🧑‍🏫 **Instructor dashboard**
  - Quick access to course creation and listingn  - "My Courses" grid with thumbnails
- 🧑‍💼 **Admin dashboard**
  - Manage users (filter by role, delete)
  - View and manage all support tickets with role & status filters
  - Manage courses via the Courses page (add / edit / delete)

### Support Tickets
- 🎫 Students can create, edit, and delete their own tickets
- 📨 Tickets are tied to the authenticated user (userId, userName, userRole)
- 🧮 Admins can see all tickets, filter by role & status, and update status

---

## 🛠️ Technology Stack

### Frontend
- **React 18+**
- **React Router DOM 7+**
- **Axios** for HTTP requests
- **Framer Motion** for hero/feature animations
- **React Icons / Lucide Icons** for iconography

### Backend
- **Node.js** / **Express**
- **MongoDB** with **Mongoose**
- **jsonwebtoken (JWT)** for auth
- **bcrypt** for password hashing
- **cors**, **dotenv**

### Tooling
- **Nodemon** for backend dev
- **Create React App** toolchain (React Scripts) for frontend

---

## 📋 Prerequisites

- Node.js (v16+ recommended)
- npm
- MongoDB instance (local or Atlas)
- Git

---

## 🔧 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/shabaabhanaan/LearningManagementSystem.git
cd "Learning Management System"
```

### 2. Backend Setup
```bash
cd backend
npm install

# .env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

### 4. Optional: Seed Sample Data

In `backend/` you can populate the database with sample data:

```bash
# Seed courses
node scripts/seedCourses.js

# Seed users (admin/instructor/students) and tickets
node scripts/seedUsersAndTickets.js
```

> Default seeded credentials (from `seedUsersAndTickets.js`):
> - admin@example.com / **Password123!**
> - instructor1@example.com / **Password123!**
> - student1@example.com / **Password123!**

---

## 🚀 Running the Application

### Start Backend
```bash
cd backend
npm start
# or
npx nodemon index.js
```
Backend: `http://localhost:5000`

### Start Frontend
```bash
cd frontend
npm start
```
Frontend: `http://localhost:3000`

---

## 📁 Project Structure

```text
Learning Management System/
├── backend/
│   ├── models/            # User, Course, Ticket schemas
│   ├── routes/            # auth, courses, students, instructors, tickets
│   ├── controllers/       # Auth & course controllers
│   ├── middleware/        # authMiddleware (authenticate/authorizeRoles)
│   ├── scripts/           # seedCourses, seedUsersAndTickets
│   ├── app.js             # Express app (for tests)
│   ├── index.js           # Server bootstrap
│   └── package.json
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/    # Navbar, Login/Register, CourseList, etc.
│       ├── pages/
│       │   ├── Home.jsx   # Marketing/hero + features
│       │   └── Dashboard/ # Admin/Instructor/Student dashboards
│       ├── api.js         # Axios instance with base URL & auth header
│       ├── App.jsx        # App routes
│       ├── index.js       # React entry point
│       └── components.css # Design system (buttons, cards, forms)
└── README.md
```

---

## 🔌 Key API Endpoints

### Auth
- `POST /api/auth/register` – Register a new user
- `POST /api/auth/login` – Login and receive JWT
- `GET /api/auth/users` – List all users (admin only)
- `DELETE /api/auth/users/:id` – Delete user (admin only)

### Courses
- `GET /api/courses` – List courses (auth required)
- `POST /api/courses` – Create course (admin/instructor)
- `GET /api/courses/:id` – Get course by id
- `PUT /api/courses/:id` – Update course (admin/instructor)
- `DELETE /api/courses/:id` – Delete course (admin/instructor)

### Tickets
- `GET /api/tickets` –
  - Admin: all tickets
  - Other roles: own tickets only
- `POST /api/tickets` – Create ticket
- `PUT /api/tickets/:id` – Update ticket (subject/message/status)
- `DELETE /api/tickets/:id` – Delete ticket

---

## 🎨 UI/UX Highlights

- Responsive layout with sticky navbar
- Modern hero section with gradients and animations
- Role badge in navbar (Student / Instructor / Admin)
- Card-based dashboards and ticket tables
- Consistent button & form styling via `components.css`

---

## 🧪 Testing

Backend includes a small Jest + Supertest example for the Express app (`backend/tests/app.test.js`). Frontend uses CRA’s Jest setup:

```bash
# Frontend tests
cd frontend
npm test

# Backend tests
cd backend
npm test
```

---

## 🤝 Contributing

1. Fork this repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit changes: `git commit -m "Add my feature"`
4. Push branch: `git push origin feature/my-feature`
5. Open a Pull Request

---

## 📄 License

This project is currently distributed under the **ISC** license (see package.json).

---

**Happy learning with LearningHub! 🎓**
