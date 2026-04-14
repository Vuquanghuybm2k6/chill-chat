# 💬 Chill Chat - Realtime Chat Application

Chill Chat is a real-time chat application built with Node.js, Express, MongoDB, and Socket.IO.  
The project supports real-time messaging, friend connections, one-on-one chat rooms, and user management.

---

## 🚀 Features

### 🔐 Authentication
- User registration
- Login / logout
- Forgot password
- Upload user avatar
- Route protection middleware (require auth)
- Store user token (tokenUser)

---

### 👤 User System
- Display list of users
- User profile page
- Edit personal information
- Online/offline status indicator

---

### 🤝 Friend System
- Send friend requests
- Cancel friend requests
- Accept friend requests
- Reject friend requests
- Remove friends
- Display friend request list in real time
- Synchronize request counts in real time

---

### 💬 Chat System
- Real-time chat using Socket.IO
- Create one-on-one chat rooms after becoming friends
- Create group chat rooms 
- Display chat room list
- Show chat history per room
- Configure real-time communication channels

---

### 🔔 Real-time Features
- Real-time messaging
- Online status updates
- Real-time friend request updates
- Real-time chat list updates

---

### ⚙️ System Features
- Flash notification messages
- Custom 404 page
- User info middleware
- Cart/info middleware (if shared system is used)
- Input data validation

---

## 🧱 Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- Socket.IO
- EJS Template Engine
- HTML/CSS/JavaScript (Frontend)
- Multer (avatar upload)
- Nodemailer (forgot password email)
- dotenv

---

## 📁 Project Structure



```text
chill-chat/
│
├── config/ 
│ └── database.js
│
├── controllers/ 
│ └── client/
│
├── helpers/ 
│ └── client/
│ ├── generate.js
│ └── sendMail.js
│
├── middlewares/ 
│ └── client/
│
├── models/ 
│
├── public/ 
│ └── client/
│ ├── css/
│ └── js/
│
├── routes/ 
│ └── client/
│
├── sockets/ 
│ └── client/
│
├── validates/ 
│ └── client/
│
├── views/ 
│ └── client/
│ ├── layouts/
│ ├── mixins/
│ ├── pages/
│ └── partials/
│
├── .env 
├── index.js 
├── package.json
└── README.md

```
---

## ⚙️ Installation

```bash
# Clone project
git clone https://github.com/your-username/chill-chat.git

# Move to project
cd chill-chat

# Install dependencies
npm install
```

## 🔐 Environment Variables
```env
PORT=3000
MONGO_URL=your_mongodb_url

EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password

CLOUD_NAME=your_cloud_name
API_KEY=your_api_key
API_SECRET=your_api_secret
```
---
## 📡 Realtime System (Socket.IO)

- Connect socket when user logs in
- Emit chat message events
- Emit friend request events
- Update online status
- Broadcast realtime data between users

---

## 👨‍💻 Author
- Name: Vu Quang Huy
- Project: Chill Chat
- Year: 2026
