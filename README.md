🍽️ StaySync – Hotel Food Management System
📌 Project Overview

StaySync is a modern Hotel Food Management System developed using React.js, Vite, JSON Server, Axios, React Router DOM, and Recharts. The application helps hotel staff efficiently manage menu items, food orders, kitchen operations, billing, inventory, reports, notifications, user profiles, and administrative activities through an interactive dashboard.

The system provides a complete restaurant and hotel food management solution with CRUD operations, data visualization, order tracking, billing management, inventory monitoring, and role-based user management.

🚀 Features
🔐 Authentication System
User Login
Customer Registration
Email Validation
Protected Routes
Session Management
Logout Functionality
📊 Dashboard
Total Orders
Revenue Analytics
Active Tables
Inventory Status
Order Statistics
Revenue Charts using Recharts
Real-time Summary Cards
🍽️ Menu Management
Add New Dishes
Edit Dishes
Delete Dishes
Search Food Items
Category Filters
Food Images
Availability Status
Price Management
600+ Menu Items
📦 Food Orders
Place Orders
Order Tracking
Pending Orders
Preparing Orders
Ready Orders
Delivered Orders
Order History
👨‍🍳 Kitchen Status
Kitchen Workflow Monitoring
Order Preparation Status
Chef Task Management
Ready Order Tracking
💳 Billing System
Auto Bill Generation
GST Calculation
Service Charge Calculation
Payment Status
Invoice Generation
Billing History
📋 Inventory Management
Inventory Tracking
Low Stock Alerts
Supplier Management
Stock Updates
Material Monitoring
📈 Reports
Revenue Reports
Sales Analytics
Order Reports
Category-wise Analysis
Monthly Performance Reports
Charts & Graphs
🔔 Notifications
New Order Alerts
Kitchen Updates
Billing Notifications
Inventory Alerts
System Notifications
👤 Profile Management
User Information
Role Management
Contact Details
Profile Update
⚙️ Admin Panel
User Management
Customer Accounts
Role Assignment
System Monitoring
Dashboard Controls
🛠️ Technologies Used
React.js
Vite
JSON Server
Axios
React Router DOM
Recharts
JavaScript (ES6+)
CSS3
HTML5
📂 Project Structure
src/
│
├── api/
│   └── api.js
│
├── pages/
│   ├── Dashboard.jsx
│   ├── MenuManagement.jsx
│   ├── FoodOrders.jsx
│   ├── KitchenStatus.jsx
│   ├── Billing.jsx
│   ├── Inventory.jsx
│   ├── Reports.jsx
│   ├── Notifications.jsx
│   ├── Profile.jsx
│   ├── AdminPanel.jsx
│   └── Login.jsx
│
├── routes/
│   └── AppRoutes.jsx
│
├── styles/
│   ├── App.css
│   ├── dashboard.css
│   └── index.css
│
├── App.jsx
├── main.jsx
│
db.json
package.json
⚙️ Installation
1️⃣ Clone Repository
git clone <repository-url>
2️⃣ Navigate to Project
cd react-demo
3️⃣ Install Dependencies
npm install
4️⃣ Start JSON Server
npm run server

JSON Server:

http://localhost:3001
5️⃣ Start React Application
npm run dev

React Application:

http://localhost:5173
📡 API Endpoints
GET    /users
POST   /users

GET    /menuItems
POST   /menuItems
PUT    /menuItems/:id
DELETE /menuItems/:id

GET    /orders
POST   /orders
PUT    /orders/:id
DELETE /orders/:id

GET    /inventory
POST   /inventory

GET    /bills
POST   /bills

GET    /notifications

GET    /dashboard
👨‍💻 Default Login Credentials
Admin
Email: admin@gmail.com
Password: admin123
Customer
Email: customer@gmail.com
Password: customer123
📊 Key Functionalities
Complete CRUD Operations
Dynamic Search Functionality
Category Filters
Data Persistence with JSON Server
Responsive UI Design
Real-time Dashboard Statistics
Order Tracking System
Inventory Monitoring
Revenue Analytics
User Authentication
🎯 Learning Outcomes

This project demonstrates:

React Component Architecture
State Management
Routing in React
API Integration with Axios
JSON Server Implementation
CRUD Operations
Dashboard Development
Responsive Web Design
Data Visualization
Front-End Engineering Concepts
📄 Conclusion

StaySync is a complete Hotel Food Management System that streamlines restaurant and hotel food operations through menu management, order processing, kitchen tracking, billing, inventory control, reporting, and administrative tools. The project showcases modern front-end development practices using React.js and JSON Server while providing a professional enterprise-level user experience.

👨‍🎓 Developed By

Akshay Gopisetti
KLH University
CSE Department
CGPA: 9.42
