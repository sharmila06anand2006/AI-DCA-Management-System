# RecoveryIQ – Functional Prototype

RecoveryIQ is an enterprise-style debt recovery intelligence platform prototype.
This project demonstrates a React frontend integrated with a mock backend API,
simulating real-world enterprise workflows using asynchronous data fetching.

---

## Tech Stack
Frontend: React + TypeScript, Vite, Axios  
Backend: Node.js, Express (Mock APIs)  
Database: JSON file (prototype only)

---

## Project Structure
recoveryiq
├──RecoveryIQ1/
| ├── recoveryiq/          (Frontend)
| └── recoveryiq-backend/  (Backend - mock APIs)
└── README.md

---

## Demo Credentials
Email: admin@recoveryiq.com  
Password: 123456

---

## How to Run the Project

### Backend
Open a terminal:
cd recoveryiq-backend
npm install
node server.js

Backend runs at:
http://localhost:5000

---

### Frontend
Open a new terminal:
cd recoveryiq
npm install
npm run dev

Frontend runs at:
http://localhost:5173

---

## Environment Setup
Create a file named .env inside the recoveryiq folder and add:

VITE_API_URL=http://localhost:5000

Restart the frontend after adding this file.

---

## API Overview (Mock)
POST   /api/auth/login  
GET    /api/auth/me  
GET    /api/dashboard/stats  
GET    /api/cases  
GET    /api/cases/:id  
PATCH  /api/cases/:id/status  

---

## Notes
- This is a functional prototype, not a production system
- Uses fake authentication and dummy data
- Backend can be replaced with a real backend later without changing the frontend

---

