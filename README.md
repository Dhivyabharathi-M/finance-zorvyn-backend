# Finance Data Processing and Access Control Backend

## Project Overview
This is a backend system for a Finance Dashboard that enables users to manage financial records, enforce role-based access control, and generate meaningful financial insights. The system supports multiple user roles (Admin, Analyst, Viewer) with different permissions and provides APIs for managing transactions, retrieving summaries, and ensuring secure and structured data access.

## Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: SQLite
- **Security**: bcrypt (password hashing), JWT (authentication)
- **API Testing**: Postman

## Setup Instructions
1. Clone or navigate to the project directory.
2. Install dependencies: `npm install`
3. Create a `.env` file with `JWT_SECRET=your_secret_key_here`
4. Run the server: `npm start`
5. The server will start on port 3000.

## API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login and get JWT token

### Users (Admin only)
- `GET /auth` - Get all users
- `PATCH /auth/:id/role` - Update user role
- `PATCH /auth/:id/status` - Update user status

### Records
- `POST /records` - Create a new record (Analyst+)
- `GET /records` - Get user's records (with optional filters: type, category, startDate, endDate)
- `PUT /records/:id` - Update a record (Analyst+)
- `DELETE /records/:id` - Delete a record (Admin only)

### Summary
- `GET /summary` - Get dashboard summary (Analyst+)

### ML (Bonus)
- `POST /predict-category` - Predict category from note

## Role-Based Access Control
- **Viewer**: Can only view records and summaries
- **Analyst**: Can view records, summaries, and create/update records
- **Admin**: Full access including user management and record deletion

## Design Decisions
- Modular architecture with separation of concerns (routes, controllers, services, models)
- SQLite for simplicity and ease of setup
- JWT for stateless authentication
- Middleware for role-based permissions
- Input validation and error handling
- Simple keyword-based ML for categorization

## Assumptions
- Users can only access their own records
- Dates are in YYYY-MM-DD format
- Amounts are positive numbers
- Roles are hierarchical: viewer < analyst < admin

## Zorvyn Alignment
- **Accuracy First**: Precise financial calculations and data handling
- **Security**: JWT authentication and bcrypt hashing
- **Modular Design**: Clean separation of layers for maintainability

## GitHub Publish Instructions
1. Create `.gitignore` with:
   - `node_modules`
   - `.env`
   - `database.sqlite`
   - `npm-debug.log`

2. Initialize and push repo:
```bash
cd "C:\Users\Suresh\Desktop\dhivya\Finance_Zorvyn"
git init
git add .
git commit -m "Initial finance backend implementation"
# create repository on GitHub web then copy URL
# example: https://github.com/<username>/finance-zorvyn-backend.git
git remote add origin https://github.com/<username>/finance-zorvyn-backend.git
git branch -M main
git push -u origin main
```

3. Check with `git status`, `git log`, and confirmed remote.

## Quick Functionality Check (before or after Git push)
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
