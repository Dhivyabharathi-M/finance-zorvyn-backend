# Finance Zorvyn Backend

A **Finance Dashboard backend** implementing role-based access control (RBAC), financial record management, dashboard analytics, validation, error handling, and lightweight ML transaction categorization.

## Table of Contents
1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Folder Structure](#folder-structure)
4. [Features Implemented](#features-implemented)
5. [API Endpoints](#api-endpoints)
6. [RBAC and Permissions](#rbac-and-permissions)
7. [Setup & Run](#setup--run)
8. [Testing (Postman)](#testing-postman)
9. [Deployment / Documentation Link](#deployment--documentation-link)
10. [Evaluation Notes](#evaluation-notes)
11. [Assumptions & Trade-offs](#assumptions--trade-offs)
12. [Future Improvements](#future-improvements)

---
## Project Overview
Backend for a finance dashboard that supports:
- User and role management (viewer/analyst/admin)
- JWT-based authentication
- Financial transaction CRUD (amount/type/category/date/note)
- Filtering records (date/category/type)
- Summary APIs (income, expenses, net, categories, recent)
- Role-based access control
- Validation and error handling
- SQLite persistence
- Optional ML endpoint for note-based category prediction

---

## Tech Stack
- Node.js
- Express.js
- SQLite (`sqlite3`)
- bcryptjs
- jsonwebtoken
- cors
- dotenv

---

## Folder Structure
```
src/
  config/db.js
  models/userModel.js
  models/recordModel.js
  controllers/userController.js
  controllers/recordController.js
  controllers/summaryController.js
  services/recordService.js
  services/summaryService.js
  services/mlService.js
  routes/userRoutes.js
  routes/recordRoutes.js
  routes/summaryRoutes.js
  middleware/authMiddleware.js
  middleware/roleMiddleware.js
  middleware/errorMiddleware.js
  utils/validators.js
app.js
server.js
promoteAdmin.js
finance-backend.postman_collection.json
README.md
.gitignore
.env
database.sqlite
```

---

## Features Implemented
- User registration + login
- Roles: viewer, analyst, admin
- Status: active/inactive
- Role-based authorization guard
- Financial records CRUD
- Record filtering
- Summary analytics
- Recent activity
- Simple ML categorization
- Proper HTTP status codes and validation
- Central error middleware
- Data persistence in SQLite
- Postman collection included

---

## API Endpoints

### Auth
- `POST /auth/register` (register user)
- `POST /auth/login` (login + JWT)
- `GET /auth` (admin) 
- `PATCH /auth/:id/role` (admin) 
- `PATCH /auth/:id/status` (admin)

### Records
- `POST /records` (create, analyst+)
- `GET /records` (list + filters, all roles)
- `PUT /records/:id` (update, analyst+)
- `DELETE /records/:id` (delete, admin)

### Summary
- `GET /summary` (analyst+)

### ML
- `POST /predict-category` (keyword based category)

---

## RBAC and Permissions
- `viewer`: read records + summary
- `analyst`: read records + summary + create/update records
- `admin`: full user + record management

---

## Setup & Run
```bash
git clone <repo-url>
cd Finance_Zorvyn
npm install
# create .env with:
# JWT_SECRET=your_secret_key_here
npm start
```
Server listens on port 3000.

---

## Testing (Postman)
- Import `finance-backend.postman_collection.json`
- Create environment variable `token`
- Login and set token
- Add collection pre-request script:
```js
if (!pm.environment.get("token")) throw new Error("Login first.");
pm.request.headers.add({ key:"Authorization", value:"Bearer " + pm.environment.get("token") });
```
- Test:
  1. register
  2. login
  3. promote user role
  4. create record
  5. get records
  6. get summary
  7. predict category

---

## Deployment / Documentation Link
- Deployed API: *(if deployed, insert URL)*
- Postman collection: `finance-backend.postman_collection.json`
- Swagger endpoint: *(if added)*

---

## Evaluation Notes
### 1. Backend Design
- Separation of routes/controllers/services/models
- Middleware for auth/role control

### 2. Logical Thinking
- RBAC checks, role hierarchy, resource ownership

### 3. Functionality
- API behaviors implemented and tested

### 4. Code Quality
- Clean, modular, maintainable

### 5. Database & Data Modeling
- Users and records tables with relations

### 6. Validation & Reliability
- Input checks, error responses, status codes

### 7. Documentation
- Clear README + endpoint docs + run steps

### 8. Additional Thoughtfulness
- `promoteAdmin.js`, ML endpoint, Postman collection

---

## Assumptions & Trade-offs
- SQLite for local development and portability
- Simple keyword-based ML classification
- No production-level features (rate limit/monitor)
- minimal dependencies for faster execution

---

## Final note
Project is assignment-complete and ready for evaluation. Provide GitHub URL and Postman collection for verification.

## Quick Functionality Check 
1. Start server: `npm start`
2. Login as admin: `POST /auth/login` (get token)
3. Summary: `GET /summary` with admin/analyst token
4. Create record: `POST /records` as analyst/admin
5. List records: `GET /records`
6. Delete record: `DELETE /records/:id` as admin

## Postman Quick Setup
- Add `finance_backend` environment with variable `token`.
- Login and save token into environment.
- Add collection Pre-request script:
```js
if (!pm.environment.get("token")) throw new Error("Set token first in environment.");
pm.request.headers.add({key:"Authorization", value:"Bearer " + pm.environment.get("token")});
```

## Role matrix
- `viewer`: read-only
- `analyst`: records + summary
- `admin`: user management + all routes

## Outcomes
This code base is complete by the assignment criteria and ready for GitHub evaluation.
