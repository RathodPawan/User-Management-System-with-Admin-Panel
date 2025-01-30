# User Management System with Admin Panel

## Overview  
This project is a **User Management System** with an **Admin Panel** that enables:  
- User authentication  
- Profile management  
- Notification system based on availability  
- Admin-controlled critical and non-critical notifications  

The system ensures secure handling of user data and notifications with industry-standard encryption.  

---

## 🚀 Tech Stack  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB / PostgreSQL  
- **Authentication:** JWT (JSON Web Token)  
- **Hosting:** Render / Netlify / Vercel  
- **API Testing:** Postman  

---

## 📌 Features  

### 🔹 User Functionalities  
✅ **User Authentication:** Secure sign-up and login using email & password.  
✅ **Profile Management:** Users can update their **name, mobile number, bio, and availability time slots**.  
✅ **Profile Updates:** Users can modify their profile details anytime.  
✅ **Notification System:**  
- Users can send notifications with embedded text.  
- **Based on availability:**  
  - 📌 If available → Notification is sent immediately.  
  - ⏳ If unavailable → Notification is queued and sent later.  

### 🔹 Admin Functionalities  
✅ **Notification Management:**  
- Admin can send notifications to one or multiple users.  
- **Notification Types:**  
  - 🚨 **Critical Notifications:** Sent immediately, regardless of user availability.  
  - ⏳ **Non-Critical Notifications:** Delivered based on recipient availability.  

---

## ⚙ Installation & Setup  

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/RathodPawan/User-Management-System-with-Admin-Panel.git
cd User-Management-System-with-Admin-Panel
## 2️⃣ Install Dependencies  
```sh
npm install

## 3️⃣ Set Up Environment Variables  
Create a `.env` file in the root directory and add the following:  

```sh
PORT=5000
DATABASE_URL=<your-database-url>
JWT_SECRET=<your-secret-key>

## 4️⃣ Run the Application  
```sh
npm start
Server will start at: http://localhost:5000

## 🔥 API Endpoints & Testing  

### 🔹 Authentication  
| Endpoint               | Method | Description        |
|------------------------|--------|--------------------|
| `/api/auth/register`   | `POST` | User registration |
| `/api/auth/login`      | `POST` | User login        |

### 🔹 User Management  
| Endpoint          | Method | Description        |
|------------------|--------|--------------------|
| `/api/users/:id` | `GET`  | Get user profile  |
| `/api/users/:id` | `PUT`  | Update user profile |

### 🔹 Notification System  
| Endpoint                    | Method | Description          |
|-----------------------------|--------|----------------------|
| `/api/notifications/send`   | `POST` | Send notification   |
| `/api/notifications`        | `GET`  | Fetch all notifications |

📌 **API Testing:** All APIs have been tested using Postman. You can find sample request bodies and responses in the API documentation.  

---

## 🔐 Security & Data Handling  
✔ **Password Encryption:** Securely stored using **bcrypt.js**  
✔ **JWT Authentication:** Used for user sessions  
✔ **Validation & Error Handling:** Ensures proper request handling  

---

## 🌍 Deployment  
The application is hosted on: [Live Demo Link](#) (Update after deployment)  

---

## 🤝 Contributing  
1. Fork the repository  
2. Create a new branch:  
   ```sh
   git checkout -b feature-name
## Commit your changes:  
```sh
git commit -m "Added feature"
## Push to branch:  
```sh
git push origin feature-name
## Open a Pull Request

This version is **GitHub-friendly** with:  
✅ Proper **tables** for API endpoints  
✅ **Code blocks** for commands  
✅ **Bullet points** for clarity  


