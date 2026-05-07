<img width="1918" height="896" alt="Screenshot 2026-05-07 181033" src="https://github.com/user-attachments/assets/fe70536d-4859-4c2a-8941-b531407774f4" />

live(url) : https://node-js-1-7kjk.onrender.com

Express CRUD REST API 🚀

A simple and beginner-friendly CRUD REST API built using Express.js and Node.js.
This project demonstrates how to create, read, update, and delete tasks with proper routing, middleware, and centralized error handling.

📌 Features

✅ Get all tasks
✅ Get task by ID
✅ Add new task
✅ Update task using PATCH method
✅ Update task using PUT method
✅ Delete task
✅ Custom Error Handling
✅ Centralized Middleware
✅ REST API Architecture
✅ Beginner Friendly Project

🛠️ Technologies Used
Node.js
Express.js
JavaScript
REST API
📂 Folder Structure
Express_CRUD/
│
├── middleware/
│   └── export.js
│
├── app.js
├── package.json
├── package-lock.json
└── README.md
⚙️ Installation & Setup
1️⃣ Clone Repository
git clone <your-github-repository-link>
2️⃣ Open Project Folder
cd Express_CRUD
3️⃣ Install Dependencies
npm install
4️⃣ Start Server
node app.js

OR

npm start
🚀 Server Running
http://localhost:5000
📌 API Endpoints
🏠 Home Route
GET /
URL
http://localhost:5000/
Response
"This is home page"
📋 Get All Tasks
GET /TaskList
URL
http://localhost:5000/TaskList
Success Response
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "ankit",
      "city": "bhavnagar"
    }
  ]
}
🔍 Get Task By ID
GET /TaskList/:id
Example
http://localhost:5000/TaskList/1
Success Response
{
  "success": true,
  "message": "id is found",
  "tasklist": {
    "id": 1,
    "name": "ankit",
    "city": "bhavnagar"
  }
}
➕ Add New Task
POST /addTask
URL
http://localhost:5000/addTask
Request Body
{
  "name": "Rahul",
  "city": "Rajkot"
}
Success Response
{
  "success": true,
  "message": "task added successfully",
  "data": {
    "id": 123456789,
    "name": "Rahul",
    "city": "Rajkot"
  }
}
✏️ Update Task (PATCH)
PATCH /updateTask/:id

PATCH is used for partial updates.

Example URL
http://localhost:5000/updateTask/1
Request Body
{
  "name": "Prince"
}

OR

{
  "city": "Junagadh"
}
Success Response
{
  "success": true,
  "message": "Update successfully",
  "tasklist": {
    "id": 1,
    "name": "Prince",
    "city": "bhavnagar"
  }
}
🔄 Update Task (PUT)
PUT /updateTask/:id

PUT is used for full updates.

Example URL
http://localhost:5000/updateTask/1
Request Body
{
  "name": "Ankit",
  "city": "Surat"
}
❌ Delete Task
DELETE /deleteTask/:id
Example URL
http://localhost:5000/deleteTask/1
Success Response
{
  "success": true,
  "message": "delete successfully"
}
⚠️ Error Handling

This project includes:

Custom HttpError Class
Route Not Found Middleware
Centralized Error Middleware
❌ Example Error Response
{
  "success": false,
  "message": "Route not found"
}
🧠 Concepts Covered
Express Routing
Middleware
REST API
CRUD Operations
Error Handling
HTTP Status Codes
JSON Responses
Request Params
Request Body
PATCH vs PUT
📮 Testing API

You can test this API using:

Postman
Thunder Client
Insomnia
🔥 Future Improvements
MongoDB Database Integration
Mongoose Models
JWT Authentication
User Login & Signup
MVC Folder Structure
Environment Variables
Validation Middleware
Deployment
👨‍💻 Author
ANKIT MOR

MERN Stack Developer
Passionate about Backend Development & REST APIs

⭐ Support

If you like this project, give it a ⭐ on GitHub.
