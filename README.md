# 🖊️ Reminder Management System

A robust backend system built with **Node.js** and **Express.js** to manage reminders featuring secure user authentication, automated notifications, and flexible reminder operations.

---

## 🌟 Features

### **User Authentication**:
- Secure user registration and login using **JWT-based authentication**.
- Passwords hashed securely with **bcrypt**.
- Cookie-based token management for session handling.

### **Reminder Management**:
- Create reminders with recurrence options (“daily”, “weekly”, “monthly”).
- Retrieve, update, and delete reminders.
- Filter reminders by status (“pending” or “triggered”).

### **Automated Notifications**:
- Cron jobs to trigger reminders and log notifications in real-time.

---

## 🚀 Getting Started

Follow these steps to set up and run the project locally:

### **1. Clone the repository:**
```bash
git clone https://github.com/vikrantkkk/reminder-system.git
cd reminder-system
```

### **2. Install Dependencies:**
```bash
npm install
```

### **3. Set Up Environment Variables:**
Create a `.env` file in the root directory and configure the following variables:
```plaintext
PORT=3000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/reminders
JWT_SECRET=your_jwt_secret
NODE_ENV=Development
```

### **4. Start the Application:**
```bash
npm start
```

---

## 🗃️ API Endpoints

### **Authentication**
| Method | Endpoint                                     | Description           | Auth Required |
|--------|---------------------------------------------|-----------------------|---------------|
| POST   | `/api/v1/user/register`                     | Register a new user   | ✅            |
| POST   | `/api/v1/user/login`                        | Log in a user         | ✅            |

### **Reminder Operations**
| Method | Endpoint                                     | Description                           | Auth Required |
|--------|---------------------------------------------|---------------------------------------|---------------|
| POST   | `/api/v1/reminder/create-reminder`          | Create a new reminder                 | ✅            |
| GET    | `/api/v1/reminder/retrieve-reminder`        | Retrieve all reminders                | ✅            |
| GET    | `/api/v1/reminder/retrieve-reminder?status=pending&page=1&limit=5`        | Filter by `status`, `page`, and `limit` | ✅            |
| PUT    | `/api/v1/reminder/update-reminder/:id`      | Update a reminder                     | ✅            |
| DELETE | `/api/v1/reminder/delete-reminder/:id`      | Delete a reminder                     | ✅            |

---

## 📒 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT, bcrypt
- **Task Scheduling**: node-cron

---

## 💻 Usage Instructions

### **Register a User**
Send a `POST` request to `/api/v1/user/register` with:
```json
{
    "name": "Vikrant Kumar",
    "userName": "vikrantvkc",
    "password": "Random@123"
}
```

### **Log in**
Send a `POST` request to `/api/v1/user/login` to obtain your JWT token:
```json
{
    "userName": "vikrantvkc",
    "password": "Random@123"
}
```

### **Create a Reminder**
Send a `POST` request to `/api/v1/reminder/create-reminder` with:
```json
{
    "message": "Meeting with the client",
    "time": "04/12/2024 13:23:00",
    "recurrence": "daily"
}
```

---

## 📈 Future Enhancements

1. Add email/SMS notifications for triggered reminders.
2. Integrate **socket.io** for real-time notifications.
3. Build a frontend using **React.js** or **Next.js**.
4. Enhance logging and monitoring.

---

## 📄 License

This project is licensed under the **MIT License**.

---

Happy Coding! 🚀