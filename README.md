# 🎉 Event Management System

A full-stack **Event Management System** designed to simplify the process of creating, managing, discovering, and participating in events.

The platform provides separate functionality for **event organizers** and **event participants**. Organizers can create and manage events, while users can browse available events, view event information, register for events, and manage their event participation.

The project is developed using a modern **JavaScript full-stack architecture**, with a React-based frontend and Node.js/Express backend connected to MongoDB.

---

## 📌 Project Overview

The Event Management System solves the problem of managing events through a centralized web application.

Instead of managing event information, participants, and registrations manually, the system provides a digital platform where:

* Users can create accounts.
* Users can securely log in.
* Users can browse available events.
* Users can view complete event information.
* Event organizers can create events.
* Organizers can update their events.
* Organizers can remove events when required.
* Users can register for available events.
* Users can manage their event bookings.
* Authentication is handled securely using JWT.
* Passwords are protected using bcrypt hashing.
* MongoDB stores application data.

---

# 🎯 Objectives

The main objectives of this project are:

1. To create a centralized event management platform.
2. To provide secure user authentication.
3. To allow organizers to create and manage events.
4. To allow users to discover available events.
5. To provide an event registration/booking system.
6. To maintain event and user information in MongoDB.
7. To connect a React frontend with a Node.js/Express backend.
8. To practice real-world full-stack development concepts.
9. To implement REST-style API communication.
10. To create a responsive and user-friendly interface.

---

# ✨ Main Features

## 👤 User Management

The system supports user account management.

### User features

* User registration
* User login
* User logout
* Secure password storage
* JWT-based authentication
* Authenticated user sessions
* User-specific event activities

Passwords are not stored as plain text. The backend uses **bcryptjs** for password hashing.

---

## 🔐 Authentication

Authentication is handled by the backend using:

* JSON Web Token (JWT)
* bcrypt password hashing
* Express middleware
* MongoDB/Mongoose

### Authentication process

```text
User
  │
  │ Register
  ▼
Frontend
  │
  │ HTTP Request
  ▼
Express API
  │
  ├── Validate user information
  │
  ├── Hash password
  │
  ▼
MongoDB
  │
  └── Store user
```

For login:

```text
User enters email/password
          │
          ▼
       Frontend
          │
          ▼
      Login API
          │
          ▼
    Find user in MongoDB
          │
          ▼
 Compare password
       using bcrypt
          │
          ▼
   Generate JWT token
          │
          ▼
    Return authentication
          │
          ▼
       Frontend
```

JWT is included in the backend dependencies and is used for authentication.

---

# 📅 Event Management

The event-management module is the core part of the application.

An organizer can manage event information such as:

* Event title
* Event description
* Event date
* Event time
* Event location
* Event category
* Event image/details
* Event capacity or other event-related information supported by the application

### Event lifecycle

```text
Create Event
     │
     ▼
Event stored in MongoDB
     │
     ▼
Event appears in event listing
     │
     ├───────────────┐
     ▼               ▼
 View Event       Register
     │               │
     ▼               ▼
 Update/Delete    Booking
```

---

# 📝 Event Registration / Booking

Registered users can participate in available events through the registration system.

### Registration workflow

```text
User
 │
 ▼
Browse Events
 │
 ▼
Select Event
 │
 ▼
View Event Details
 │
 ▼
Click Register
 │
 ▼
Authentication Check
 │
 ▼
Registration Request
 │
 ▼
Backend Validation
 │
 ▼
MongoDB
 │
 ▼
Registration Saved
 │
 ▼
Registration Confirmation
```

The backend is responsible for validating the request before storing the relevant information.

---

# 🔄 How the Complete System Works

The application follows a client-server architecture.

```text
                   ┌──────────────────────┐
                   │       User           │
                   └──────────┬───────────┘
                              │
                              ▼
                   ┌──────────────────────┐
                   │   React Frontend     │
                   │       +             │
                   │    Tailwind CSS      │
                   └──────────┬───────────┘
                              │
                       HTTP / API Requests
                              │
                              ▼
                   ┌──────────────────────┐
                   │   Node.js + Express  │
                   │      Backend         │
                   └──────────┬───────────┘
                              │
                 ┌────────────┴────────────┐
                 │                         │
                 ▼                         ▼
        Authentication              Event Logic
        JWT + bcrypt                Registration
                 │                         │
                 └────────────┬────────────┘
                              │
                              ▼
                   ┌──────────────────────┐
                   │       MongoDB        │
                   │      Database        │
                   └──────────────────────┘
```

---

# 🏗️ System Architecture

The project is divided into two major applications:

```text
Event--Management--System
│
├── Backend
│   ├── Node.js
│   ├── Express.js
│   ├── MongoDB
│   ├── Mongoose
│   ├── JWT
│   ├── bcryptjs
│   ├── CORS
│   └── dotenv
│
└── Frontend
    ├── React
    ├── Tailwind CSS
    └── API communication
```

The repository currently contains separate `Backend` and `Frontend` directories.

---

# 🖥️ Frontend

The frontend provides the user interface of the application.

It is responsible for:

* Displaying events
* Registration forms
* Login and signup interfaces
* Event details
* Event creation forms
* Event management interfaces
* Navigation
* Sending requests to the backend
* Displaying backend responses
* Providing responsive styling

Tailwind CSS is included in the frontend configuration.

### Frontend responsibility

```text
User Action
     │
     ▼
React Component
     │
     ▼
API Request
     │
     ▼
Backend
     │
     ▼
API Response
     │
     ▼
React State Update
     │
     ▼
Updated UI
```

---

# ⚙️ Backend

The backend provides the application's server-side functionality.

The backend is built with:

* Node.js
* Express.js
* MongoDB
* Mongoose
* JSON Web Token
* bcryptjs
* CORS
* dotenv

These dependencies are defined in the project's backend `package.json`.

The backend handles:

* User authentication
* User registration
* Login
* Password verification
* JWT generation
* Event operations
* Event registration
* Database communication
* API requests
* Authentication/authorization checks

---

# 🗄️ Database

The project uses **MongoDB** as its database and **Mongoose** as the ODM for communicating with MongoDB.

The database is responsible for persistent storage of application information.

Conceptually, the system contains data related to:

```text
Users
  │
  ├── Account information
  ├── Authentication information
  └── User activities

Events
  │
  ├── Event information
  ├── Organizer information
  └── Event status/details

Registrations
  │
  ├── User
  ├── Event
  └── Registration information
```

The exact schema depends on the models implemented in the current backend.

---

# 🔑 JWT Authentication Flow

JWT is used to authenticate users.

### Step 1 — User Login

The user submits:

```text
Email
Password
```

### Step 2 — Backend

The backend:

1. Finds the user.
2. Retrieves the stored password hash.
3. Compares the submitted password with bcrypt.
4. Creates a JWT if authentication succeeds.

### Step 3 — Token

The authenticated client uses the token when accessing protected resources.

```text
Login
  ↓
Verify Credentials
  ↓
Generate JWT
  ↓
Client Stores Authentication Information
  ↓
Protected API Request
  ↓
Backend Verifies JWT
  ↓
Allow / Reject Request
```

---

# 🔒 Password Security

Passwords should never be stored as plain text.

The project uses `bcryptjs` for password hashing.

Conceptually:

```text
Original Password
       │
       ▼
     bcrypt
       │
       ▼
Password Hash
       │
       ▼
    MongoDB
```

During login:

```text
Entered Password
       │
       ▼
bcrypt Comparison
       │
       ▼
Stored Hash
       │
       ▼
Valid / Invalid
```

---

# 🌐 API Communication

The frontend and backend communicate through HTTP requests.

Typical communication:

```text
React Frontend
      │
      │ HTTP Request
      ▼
Express Backend
      │
      ▼
Business Logic
      │
      ▼
MongoDB
      │
      ▼
Express Backend
      │
      │ JSON Response
      ▼
React Frontend
```

This separation allows the frontend and backend to be developed and maintained independently.

---

# 📂 Project Structure

The repository is organized into two main parts:

```text
Event--Management--System/
│
├── Backend/
│   ├── package.json
│   └── ...
│
├── Frontend/
│   └── ...
│
└── README.md
```

The GitHub repository currently exposes `Backend` and `Frontend` as its two main project directories.

---

# 🛠️ Technology Stack

## Frontend

| Technology   | Purpose                   |
| ------------ | ------------------------- |
| React        | Building user interfaces  |
| Tailwind CSS | Styling and responsive UI |
| JavaScript   | Application logic         |

## Backend

| Technology | Purpose                    |
| ---------- | -------------------------- |
| Node.js    | JavaScript runtime         |
| Express.js | Backend/API framework      |
| Mongoose   | MongoDB object modeling    |
| MongoDB    | Database                   |
| JWT        | Authentication             |
| bcryptjs   | Password hashing           |
| CORS       | Cross-origin communication |
| dotenv     | Environment configuration  |
| Nodemon    | Development server         |

The backend package configuration confirms Express, Mongoose, JWT, bcryptjs, CORS, dotenv, and Nodemon are used by the project.

---

# ⚙️ Installation and Setup

## 1. Clone the Repository

```bash
git clone https://github.com/Suryajoshi31/Event--Management--System.git
```

Then:

```bash
cd Event--Management--System
```

---

# 🔧 Backend Setup

Move into the backend directory:

```bash
cd Backend
```

Install dependencies:

```bash
npm install
```

The backend provides both normal and development scripts:

```bash
npm start
```

or:

```bash
npm run dev
```

The project's package configuration defines `node index.js` for the start script and `nodemon index.js` for development.

---

# 🔐 Environment Variables

Create a `.env` file inside the backend directory.

Example:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Use the actual variable names expected by your backend source code.

### Important

Do not commit the `.env` file to GitHub.

Add:

```text
.env
```

to `.gitignore`.

---

# 🗄️ MongoDB Setup

You need a MongoDB database to run the backend.

You can use:

* MongoDB locally
* MongoDB Atlas

After MongoDB is available, configure the connection string in the backend environment variables.

Example:

```env
MONGO_URI=mongodb://127.0.0.1:27017/event_management
```

or an Atlas connection string:

```env
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>/<database>
```

---

# ▶️ Running the Backend

From the `Backend` directory:

```bash
npm run dev
```

The server will start using Nodemon during development.

For normal execution:

```bash
npm start
```

---

# 💻 Frontend Setup

Open another terminal.

Move to the frontend:

```bash
cd Frontend
```

Install dependencies:

```bash
npm install
```

Then start the frontend using the appropriate development command defined by the frontend application.

For a Vite-based React application, this is normally:

```bash
npm run dev
```

---

# 🔄 Complete Development Workflow

When developing the project, run both applications.

### Terminal 1 — Backend

```bash
cd Backend
npm run dev
```

### Terminal 2 — Frontend

```bash
cd Frontend
npm run dev
```

The frontend communicates with the backend API.

```text
             Browser
                │
                ▼
        React Frontend
                │
                │ API Requests
                ▼
        Express Backend
                │
                ▼
             MongoDB
```

---

# 👤 User Workflow

A normal user follows this process:

```text
Open Website
    │
    ▼
Create Account
    │
    ▼
Login
    │
    ▼
Browse Events
    │
    ▼
Select Event
    │
    ▼
View Event Details
    │
    ▼
Register for Event
    │
    ▼
Registration Saved
    │
    ▼
Manage Registered Events
```

---

# 👨‍💼 Organizer Workflow

An event organizer follows this process:

```text
Login
  │
  ▼
Organizer Dashboard
  │
  ▼
Create Event
  │
  ▼
Enter Event Information
  │
  ▼
Submit Event
  │
  ▼
Event Saved in MongoDB
  │
  ▼
Event Available to Users
  │
  ├──────────────┐
  ▼              ▼
Update Event   Delete Event
```

---

# 🔁 Event Registration Processing

The complete registration process can be represented as:

```text
User selects event
        │
        ▼
Frontend sends registration request
        │
        ▼
Backend receives request
        │
        ▼
Authentication verification
        │
        ▼
Check event
        │
        ▼
Validate registration
        │
        ▼
Save registration
        │
        ▼
Return response
        │
        ▼
Frontend updates UI
```

This approach keeps database operations on the server instead of allowing the frontend to directly access MongoDB.

---

# 🧩 Important Full-Stack Concepts Demonstrated

This project demonstrates several practical software-development concepts:

### Frontend

* React component-based development
* State management
* Forms
* API communication
* Conditional rendering
* Responsive design
* Tailwind CSS

### Backend

* Node.js
* Express.js
* REST-style APIs
* Middleware
* Authentication
* Authorization
* JWT
* Password hashing
* Error handling
* Environment variables

### Database

* MongoDB
* Mongoose
* Schemas
* Models
* CRUD operations
* Relationships/references

### Development

* Git
* GitHub
* npm
* Nodemon
* Environment configuration

---

# 🔄 CRUD Operations

The Event Management System follows the basic CRUD pattern.

## Create

Create a new:

* User
* Event
* Registration

## Read

Retrieve:

* User information
* Event lists
* Event details
* Registration information

## Update

Modify:

* User information
* Event information

## Delete

Remove:

* Events
* Other supported resources

```text
             CRUD
              │
      ┌───────┼───────┐
      │       │       │
    Create   Read   Update   Delete
      │       │       │       │
      └───────┴───────┴───────┘
              │
           MongoDB
```

---

# 🛡️ Security Considerations

The application includes several security-related technologies:

### Password Hashing

Passwords are protected with bcrypt.

### JWT Authentication

JWT is used to identify authenticated users.

### Environment Variables

Sensitive configuration such as database credentials and JWT secrets should be stored in `.env`.

### CORS

CORS is configured to allow communication between the frontend and backend when they are running on different origins.

---

# 🚀 Future Improvements

Possible future improvements include:

* Admin dashboard
* Role-based authorization
* Event categories and advanced filtering
* Event search
* Event capacity management
* Email notifications
* Event reminders
* Ticket generation
* QR-code based event check-in
* Payment integration
* Event reviews and ratings
* Organizer profiles
* User notification system
* Image upload using cloud storage
* Advanced analytics dashboard
* Pagination
* Better validation
* Automated testing
* Production deployment

---

# 🧪 Testing

Testing can be added to verify:

### Authentication

* Registration
* Login
* Invalid credentials
* Duplicate accounts
* Protected routes

### Events

* Create event
* Retrieve events
* Update event
* Delete event

### Registration

* Register for event
* Prevent invalid registrations
* Retrieve registered events

---

# 🚀 Deployment Architecture

For production deployment, the system can be separated into:

```text
                  Internet
                     │
        ┌────────────┴────────────┐
        │                         │
        ▼                         ▼
  Frontend Hosting          Backend Hosting
   React Application        Node/Express API
        │                         │
        │                         │
        └────────────┬────────────┘
                     │
                     ▼
                MongoDB Atlas
```

The frontend communicates with the deployed backend API, while the backend communicates with MongoDB.

---

# 📚 Learning Outcomes

Developing this project provides practical experience with:

* Full-stack web development
* React
* Node.js
* Express
* MongoDB
* Mongoose
* REST APIs
* Authentication
* JWT
* Password hashing
* CRUD operations
* Database management
* API integration
* Responsive UI development
* Git and GitHub
* Environment variables
* Project structure
* Client-server architecture

---

# 👨‍💻 Author

**Surya Joshi**

Computer Engineering Student
Full-Stack / MERN Stack Developer

---

# 🔗 Repository

GitHub Repository:

https://github.com/Suryajoshi31/Event--Management--System

---

# 📄 License

This project is developed for educational and portfolio purposes.

---

## ⭐ Project Summary

The Event Management System is a full-stack web application that connects event organizers and participants through a centralized platform.

The application uses:

**React + Tailwind CSS** for the frontend,

**Node.js + Express.js** for the backend,

**MongoDB + Mongoose** for data storage,

**JWT + bcryptjs** for authentication and password security.

The overall processing follows:

```text
User
 ↓
React Frontend
 ↓
HTTP/API Request
 ↓
Express Backend
 ↓
Authentication / Validation
 ↓
Business Logic
 ↓
MongoDB
 ↓
API Response
 ↓
React UI
```

This architecture provides a clear separation between the presentation layer, server-side logic, authentication, and database layer, making the application easier to maintain and extend.
