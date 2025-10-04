# Learning Management System (LMS)

A comprehensive full-stack Learning Management System built with React and Node.js, featuring modern UI/UX design and robust backend functionality.

## 🚀 Features

### Authentication & User Management
- 🔐 Secure JWT-based authentication
- 👥 Multi-role support (Students, Instructors, Admins)
- 🛡️ Password hashing with bcrypt
- 🔑 Protected routes and API endpoints

### Course Management
- 📚 Create and manage courses
- 📝 Course enrollment system
- 📊 Progress tracking
- 🎯 Assignment and assessment tools

### Student Features
- 📖 Browse and enroll in courses
- 📈 Track learning progress
- 💬 Interactive course materials
- 🎫 Support ticket system

### Instructor Features
- 🏫 Course creation and management
- 👨‍🎓 Student progress monitoring
- 📋 Assignment grading
- 📊 Analytics and reporting

### Support System
- 🎫 Integrated support ticket system
- 💬 Help desk functionality
- 📞 Student-instructor communication

## 🛠️ Technology Stack

### Frontend
- **React 19.1.0** - Modern UI library
- **React Router DOM 7.6.3** - Client-side routing
- **Axios 1.10.0** - HTTP client
- **Framer Motion 12.23.22** - Animations
- **Lucide React 0.544.0** - Modern icons
- **React Icons 5.5.0** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express 5.1.0** - Web framework
- **MongoDB** - Database
- **Mongoose 8.16.1** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcrypt 6.0.0** - Password hashing
- **CORS 2.8.5** - Cross-origin resource sharing
- **dotenv 17.0.1** - Environment variables

### Development Tools
- **Nodemon 3.1.10** - Development server
- **React Scripts 5.0.1** - Build tools

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** (v6 or higher)
- **MongoDB** (local installation or MongoDB Atlas account)
- **Git**

## 🔧 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd "Learning Management System"
```

### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Environment Configuration
# Create .env file with the following variables:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

### 3. Frontend Setup
```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install
```

### 4. Database Setup
- Ensure MongoDB is running locally, or
- Set up MongoDB Atlas and update the `MONGO_URI` in your `.env` file

## 🚀 Running the Application

### Development Mode

#### Start Backend Server
```bash
# In the backend directory
cd backend
npm start
# or for development with auto-reload
npx nodemon index.js
```
The backend server will run on `http://localhost:5000`

#### Start Frontend Application
```bash
# In the frontend directory
cd frontend
npm start
```
The frontend application will run on `http://localhost:3000`

### Production Mode
```bash
# Build frontend for production
cd frontend
npm run build

# Start backend server
cd ../backend
npm start
```

## 📁 Project Structure

```
Learning Management System/
├── backend/
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   ├── controllers/      # Route controllers
│   ├── config/          # Configuration files
│   ├── .env             # Environment variables
│   ├── index.js         # Main server file
│   └── package.json     # Backend dependencies
├── frontend/
│   ├── public/          # Static files
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── hooks/       # Custom hooks
│   │   ├── utils/       # Utility functions
│   │   ├── api.js       # API configuration
│   │   ├── App.js       # Main app component
│   │   └── index.js     # Entry point
│   └── package.json     # Frontend dependencies
└── README.md           # Project documentation
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Courses
- `GET /api/courses` - Get all courses
- `POST /api/courses` - Create new course
- `GET /api/courses/:id` - Get course by ID
- `PUT /api/courses/:id` - Update course
- `DELETE /api/courses/:id` - Delete course

### Students
- `GET /api/students` - Get all students
- `POST /api/students` - Create student
- `GET /api/students/:id` - Get student by ID
- `PUT /api/students/:id` - Update student

### Instructors
- `GET /api/instructors` - Get all instructors
- `POST /api/instructors` - Create instructor
- `GET /api/instructors/:id` - Get instructor by ID
- `PUT /api/instructors/:id` - Update instructor

### Support Tickets
- `GET /api/tickets` - Get all tickets
- `POST /api/tickets` - Create new ticket
- `GET /api/tickets/:id` - Get ticket by ID
- `PUT /api/tickets/:id` - Update ticket status

## 🎨 UI/UX Features

- **Responsive Design** - Works on all device sizes
- **Modern Animations** - Smooth transitions with Framer Motion
- **Intuitive Navigation** - Easy-to-use interface
- **Accessible Components** - WCAG compliance
- **Dark/Light Mode** - Theme switching support

## 🧪 Testing

```bash
# Run frontend tests
cd frontend
npm test

# Run backend tests (if implemented)
cd backend
npm test
```

## 🔒 Security Features

- JWT token-based authentication
- Password encryption with bcrypt
- CORS protection
- Input validation and sanitization
- Protected API routes
- Secure environment variable handling

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👥 Authors

- **Your Name** - Initial work

## 🆘 Support

For support, please create an issue in the repository or contact the development team.

## 🚀 Deployment

### Heroku Deployment
1. Create a Heroku app
2. Add MongoDB Atlas connection string
3. Set environment variables
4. Deploy backend and build frontend

### Netlify/Vercel (Frontend)
1. Build the frontend (`npm run build`)
2. Deploy the build folder
3. Configure API endpoints

### MongoDB Atlas
1. Create a cluster
2. Set up database user
3. Whitelist IP addresses
4. Get connection string

## 📈 Future Enhancements

- [ ] Real-time messaging system
- [ ] Video conferencing integration
- [ ] Advanced analytics dashboard
- [ ] Mobile application
- [ ] Offline course support
- [ ] Multi-language support
- [ ] Advanced assessment tools
- [ ] Integration with external LTI tools

---

**Happy Learning! 🎓**