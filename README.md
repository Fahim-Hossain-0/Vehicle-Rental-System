🚗 Vehicle Rental System

Live URL: https://your-project-name.vercel.app

A backend Vehicle Rental System API built with Express.js and TypeScript, providing secure authentication, role-based access control, and full vehicle and booking management.

✨ Features

JWT-based authentication

Role-based authorization (Admin / Customer)

Vehicle management (Create, Update, Delete)

Vehicle booking system with date validation

Booking cancellation and return workflow

Business rule enforcement for booking status

Secure password hashing

RESTful API architecture

🛠️ Technology Stack

Node.js

Express.js

TypeScript

PostgreSQL

JWT Authentication

bcrypt

Vercel (Deployment)

⚙️ Setup & Usage Instructions
1️⃣ Clone the Repository
git clone https://github.com/your-username/vehicle-rental-system.git
cd vehicle-rental-system

2️⃣ Install Dependencies
npm install

3️⃣ Environment Variables

Create a .env file in the root directory:

connection_Str=your_postgresql_connection_string
JWT_SECRET=your_jwt_secret
port = port

4️⃣ Run the Project Locally
npm run dev


Server will run at:

http://localhost:5000

🚀 Deployment

The project is deployed on Vercel.
To deploy:

Push the repository to GitHub

Import the project into Vercel

Add environment variables in Vercel dashboard

Deploy

📡 API Base URL
/api/v1

👨‍💻 Author

Fahim Hossain

📄 License

This project is licensed under the MIT License.