# Insurance Platform

## Project Description

Insurance Platform is a full-stack insurance management system built using Next.js, Express.js, MongoDB, JWT authentication, RBAC, HTTPS, and Keycloak integration.

The platform supports secure login, user profile management, policy management, amendments, reductions, claims processing, and protected role-based access for customers, internal staff and administrators.

The application demonstrates both authentication and authorization concepts by combining JWT-secured APIs, role-based route protection, ownership checks, and HTTPS communication.

---

## Setup Instructions

### 1. Clone the Repository

```
git clone <your-github-repository-url>
cd insurance-platform
```

### 2. Start MongoDB

If the MongoDB container already exists:
```
docker start mongodb
```

If you need to create the container for the first time:
```
docker run --name mongodb -p 27017:27017 -d mongodb/mongodb-community-server:latest
```

### 3. Configure Backend Environment Variables

Inside backend-api/, create a .env file using .env.example.

### 4. Configure Frontend Environment Variables

Inside frontend-web/, create a .env.local file using .env.local.example.

### 5. Install Backend Dependencies

```
cd backend-api
npm install
```

### 6. Install Frontend Dependencies

Open another terminal:
```
cd frontend-web
npm install
```

### 7. Start the Backend

```
cd backend-api
npm run dev
```

### 8. Start the Frontend

```
cd frontend-web
npm run dev
```

### 9. Start Keycloak

```
cd infrastructure
cd keycloak
docker compose up
```

### 10. Seed the Database

From the project root:
```
chmod ug+x ./seed.sh
./seed.sh
```

### 11. Open the Application

Frontend:
```
http://localhost:3000
```

Backend:
```
https://localhost:5001
```

Keycloak:
```
http://localhost:8080
```

---

## Certificate Setup Instructions

The backend uses HTTPS for secure local development.

The backend expects a .pfx certificate file and passphrase.

Example backend configuration:
```
HTTPS_PFX_PATH=./cert/server.pfx
HTTPS_PFX_PASSPHRASE=your_passphrase_here
```

### Certificate Setup Steps
	1.	Place the .pfx certificate file inside the backend certificate folder.
	2.	Update the HTTPS_PFX_PATH value if needed.
	3.	Make sure the HTTPS_PFX_PASSPHRASE matches the certificate.
	4.	Start the backend server.
	5.	Open the backend using HTTPS.

A self-signed certificate may trigger a browser warning during local development. This is expected and can be safely bypassed for testing.

---

## Environment Configuration Instructions

### Backend Environment Variables

Create backend-api/.env using backend-api/.env.example.

Example backend environment file:
```
NODE_ENV=development
PORT=5001
MONGODB_URI=mongodb://127.0.0.1:27017/insurance_platform
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=2h
FRONTEND_URL=http://localhost:3000

HTTPS_PFX_PATH=./cert/server.pfx
HTTPS_PFX_PASSPHRASE=your_passphrase_here

KEYCLOAK_BASE_URL=http://localhost:8080
KEYCLOAK_REALM=insurance-platform
KEYCLOAK_CLIENT_ID=backend-api
KEYCLOAK_CLIENT_SECRET=your_client_secret_here
KEYCLOAK_BACKEND_CALLBACK_URL=http://localhost:5001/api/keycloak/callback
KEYCLOAK_FRONTEND_SUCCESS_REDIRECT_URL=http://localhost:3000/dashboard
KEYCLOAK_FRONTEND_FAILURE_REDIRECT_URL=http://localhost:3000/login?error=keycloak
```

### Frontend Environment Variables

Create frontend-web/.env.local using frontend-web/.env.local.example.

Frontend environment file:
```
NEXT_PUBLIC_API_BASE_URL=https://localhost:5001/api
```

---

## Sample Users and Roles

The platform includes sample user roles for testing different permissions and workflows.

### Roles
- Admin
- Customer
- Agent
- Underwriter
- Claims Adjuster

### Example Users
- admin1 - Admin
- customer1 - Customer
- agent1 - Agent
- underwriter1 - Underwriter
- adjuster1 - Claims Adjuster

### Default Password
- All seeded users use the default password: Password123!

### User Details
- admin1 - Victoria Clark, Platform Administrator, Administration Department
- customer1 - Emma Watson, Customer, Toronto, Canada
- agent1 - Daniel Foster, Insurance Agent, Sales Department
- underwriter1 - Sophia Lee, Senior Underwriter, Underwriting Department
- adjuster1 - Olivia Brown, Claims Adjuster, Claims Department

### Account Status
- All seeded users are created with ACTIVE account status.
---

## Explanation of JWT Use

The platform uses JWT authentication for secure login and protected API access.

### Authentication Flow
	1.	The user submits valid login credentials.
	2.	The backend validates the credentials.
	3.	If authentication succeeds, the backend returns a JWT token.
	4.	The frontend stores the authenticated session information.
	5.	Protected API requests include the token in the request header.
	6.	The backend validates the token before allowing access.

JWT tokens are included in the Authorization header:
```
Authorization: Bearer <jwt_token>
```

Invalid or expired tokens are rejected.

---

## Explanation of User Profile Module

The user profile module allows authenticated users to view and manage their own profile information.

### Features
- View own profile
- Update own profile
- Ownership-based protection
- Restricted access to another user’s profile

The backend checks the authenticated user ID before returning profile data. This ensures that users cannot access another user’s information unless they have elevated permissions such as admin access.

---

## Explanation of RBAC Management

The platform uses role-based access control (RBAC) to restrict actions based on user roles.

### Supported Roles
- Admin
- Customer
- Agent
- Underwriter
- Claims Adjuster

### RBAC Rules
- Admin users can list users and assign roles.
- Customers can access only their own profiles and policies.
- Agents can create policies.
- Underwriters can approve amendments.
- Claims adjusters can approve or reject claims.
- Unauthorized role actions are rejected by the backend.

RBAC checks are handled through backend middleware to ensure secure access control.

---

## Explanation of Protected Routes

The frontend uses protected route logic to prevent unauthorized access to restricted pages.

### Protected Route Behavior
- Unauthenticated users are redirected to the login page.
- Logged-out users cannot access protected pages.
- Admin-only pages are blocked for non-admin users.
- Role-specific pages are only available to the correct role.
- Logout removes authenticated access and redirects the user.

Examples of protected routes include:
```
/dashboard
/profile
/admin
/policies
/claims
```
---