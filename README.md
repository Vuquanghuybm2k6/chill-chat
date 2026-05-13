# 💬 Chill Chat - Realtime Chat Application

Chill Chat is a realtime chat application built with Node.js, Express.js, MongoDB, and Socket.IO.
The project supports realtime messaging, friend management, one-on-one chat rooms, group chats, authentication, and realtime synchronization between users.

---

# 🌐 Live Demo

## Demo Account

### User Account

* Email: vuquanga@gmail.com
* Password: 1

---

# 📸 Screenshots

## Login Page

<img width="1535" height="782" alt="image" src="https://github.com/user-attachments/assets/9abc0f91-1234-438f-9301-4f48899527d8" />


## Chat Room

<img width="1536" height="825" alt="image" src="https://github.com/user-attachments/assets/a7cb02fb-81ef-4dbe-9f2b-fab2493474e1" />


## Friend System

<img width="1533" height="822" alt="image" src="https://github.com/user-attachments/assets/7e53644c-2fbc-4937-b3e4-42cda31117a2" />


---

# 🚀 Main Features

## 🔐 Authentication

* User registration
* Login / logout
* Forgot password system
* Route protection middleware
* Token-based authentication
* Upload user avatar

## 👤 User System

* User profile management
* Edit personal information
* Online/offline status tracking
* Display user list

## 🤝 Friend System

* Send friend requests
* Accept / reject requests
* Cancel friend requests
* Remove friends
* Realtime friend request synchronization

## 💬 Chat System

* Realtime messaging using Socket.IO
* One-to-one private chat rooms
* Group chat rooms
* Chat room management
* Display chat history
* Realtime chat updates

## 🔔 Realtime Features

* Online/offline presence
* Realtime messaging
* Instant friend request updates
* Live chat room synchronization

---

# ✨ Technical Highlights

* Realtime communication using Socket.IO
* MVC architecture pattern
* Authentication & Authorization system
* Route protection middleware
* Middleware-based request validation
* RESTful API design
* MongoDB schema modeling with Mongoose
* Dynamic EJS rendering
* Modular project structure
* File upload handling with Multer
* Forgot password email integration with Nodemailer

---

# 🏗️ Architecture

```text
Client
   ↓
Express Server
   ↓
MongoDB
   ↓
Socket.IO Realtime Communication
```

## Architecture Overview

* Client sends HTTP requests to the Express server
* Express handles routing, middleware, authentication, and validation
* MongoDB stores users, chat rooms, friend relationships, and messages
* Socket.IO handles realtime communication between connected users
* Server synchronizes realtime events instantly without page refresh

---

# 🔄 Realtime Flow

## Socket.IO Workflow

1. User logs into the application
2. Client establishes Socket.IO connection
3. Server stores socketId for each connected user
4. Users emit realtime events:

   * send_message
   * friend_request
   * typing
   * online_status
5. Server broadcasts updates to target users
6. Chat interface updates instantly

---

# 🧱 Tech Stack

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* Socket.IO

## Frontend

* EJS Template Engine
* HTML
* CSS
* JavaScript

## Additional Libraries

* Multer
* Nodemailer
* dotenv

---

# 📁 Project Structure

```bash
chill-chat/
│
├── config/
├── controllers/
├── helpers/
├── middlewares/
├── models/
├── public/
├── routes/
├── sockets/
├── validates/
├── views/
│
├── .env
├── index.js
├── package.json
└── README.md
```

---

# 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
# Server
PORT=3000

# Database
MONGO_URL=your_mongodb_connection_string

# Email Service
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_email_app_password

# Cloudinary
CLOUD_NAME=your_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
```

> Example values only. Do not use real production credentials.

---

# ▶️ Installation

Clone the repository:

```bash
git clone https://github.com/your-username/chill-chat.git
```

Move to project directory:

```bash
cd chill-chat
```

Install dependencies:

```bash
npm install
```

---

# ▶️ Run Project

Run in development mode:

```bash
npm run dev
```

Run in production mode:

```bash
npm start
```

---

# 👨‍💻 Author

* Name: Vu Quang Huy
* Project: Chill Chat
* Year: 2026
