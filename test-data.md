# API Testing - Dummy Data

## Base URL
`http://localhost:3000/api/v1`

---

## 1. AUTH ROUTES

### POST /signup (Create Admin User)
```json
{
  "name": "Admin User",
  "email": "admin@test.com",
  "password": "admin123",
  "role": "admin"
}
```


### POST /signup (Create Regular User)
```json
{
  "name": "John Doe",
  "email": "john@test.com",
  "password": "john123"
}
```

### POST /signup (Create Another User)
```json
{
  "name": "Jane Smith",
  "email": "jane@test.com",
  "password": "jane123"
}
```

### POST /signin (Admin Login)
```json
{
  "email": "admin@test.com",
  "password": "admin123"
}
```
**Save the token from response!**
token :
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5NjRkYjRmZDNkM2UwZjU1NGM0YjE4ZCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc2ODIxNzQyOH0.Gp4pCsUHti8sjiEyab-iCb170jtOQDXjsBKma-0tStg

### POST /signin (User Login)
```json
{
  "email": "john@test.com",
  "password": "john123"
}
```
**Save the token from response!**
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5NjRkYjZmZDNkM2UwZjU1NGM0YjE5MSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzY4MjE3NDk5fQ.UKbURNltcTiWKTUEJcJeh_BnsMb_xDPxn3PNlU3PC6w

---

## 2. PROJECT ROUTES
**Note: Add header `Authorization: Bearer <your-admin-token>` for all requests**

### POST /project (Create Project - Admin Only)
```json
{
  "title": "E-Commerce Website",
  "description": "Building a full-stack e-commerce platform with React and Node.js"
}
```

### POST /project (Create Another Project - Admin Only)
```json
{
  "title": "Mobile App Development",
  "description": "Developing a cross-platform mobile app using React Native"
}
```

### POST /project (Create Third Project - Admin Only)
```json
{
  "title": "API Integration Project",
  "description": "Integrating third-party APIs for payment and notifications"
}
```

### GET /project (View All Projects)
**Headers:** `Authorization: Bearer <your-token>`

No body required - Returns all projects for admin, or user's projects for regular users

### GET /project/:id (View Specific Project)
**Headers:** `Authorization: Bearer <your-token>`

Replace `:id` with actual project ID from previous response

Example: `GET /project/65a1234567890abcdef12345`

### DELETE /project/:id (Delete Project - Admin Only)
**Headers:** `Authorization: Bearer <your-admin-token>`

Replace `:id` with actual project ID

Example: `DELETE /project/65a1234567890abcdef12345`

---

## 3. TASK ROUTES
**Note: Add header `Authorization: Bearer <your-admin-token>` for POST/PATCH/DELETE**

### POST /tasks (Create Task - Admin Only)
```json
{
  "title": "Design Homepage",
  "description": "Create mockups and designs for the homepage",
  "project": "<project-id-from-previous-response>",
  "assignedto": "<user-id-from-signup-response>",
  "status": "todo",
  "priority": "high",
  "duedate": "2026-02-01"
}
```

### POST /tasks (Create Another Task - Admin Only)
```json
{
  "title": "Setup Authentication",
  "description": "Implement JWT authentication for the API",
  "project": "<project-id>",
  "assignedto": "<user-id>",
  "status": "in_progress",
  "priority": "high",
  "duedate": "2026-01-20"
}
```

### POST /tasks (Create Third Task - Admin Only)
```json
{
  "title": "Write Unit Tests",
  "description": "Write comprehensive unit tests for all routes",
  "project": "<project-id>",
  "assignedto": "<user-id>",
  "status": "todo",
  "priority": "medium",
  "duedate": "2026-02-15"
}
```

### GET /tasks (View All Tasks)
**Headers:** `Authorization: Bearer <your-token>`

No body required - Returns all tasks for admin, or user's assigned tasks for regular users

### GET /tasks/:id (View Specific Task)
**Headers:** `Authorization: Bearer <your-token>`

Replace `:id` with actual task ID from previous response

Example: `GET /tasks/65a1234567890abcdef12345`

### PATCH /tasks/:id (Update Task - Admin Only)
**Headers:** `Authorization: Bearer <your-admin-token>`

```json
{
  "status": "done",
  "priority": "low"
}
```

You can update any field: `title`, `description`, `status`, `priority`, `assignedto`, `duedate`

### DELETE /tasks/:id (Delete Task - Admin Only)
**Headers:** `Authorization: Bearer <your-admin-token>`

Replace `:id` with actual task ID

Example: `DELETE /tasks/65a1234567890abcdef12345`

---

## Testing Flow

### Step-by-Step Testing:

1. **Create Admin User** → POST /signup (admin)
2. **Create Regular Users** → POST /signup (john, jane)
3. **Login as Admin** → POST /signin (save admin token)
4. **Login as User** → POST /signin (save user token)
5. **Create Projects** → POST /project (use admin token, save project IDs)
6. **View All Projects** → GET /project (test with admin and user tokens)
7. **View Specific Project** → GET /project/:id
8. **Create Tasks** → POST /tasks (use admin token, use saved project and user IDs)
9. **View All Tasks** → GET /tasks (test with admin and user tokens)
10. **View Specific Task** → GET /tasks/:id
11. **Update Task** → PATCH /tasks/:id (use admin token)
12. **Delete Task** → DELETE /tasks/:id (use admin token)
13. **Delete Project** → DELETE /project/:id (use admin token)

---

## Common Headers for All Requests

```
Content-Type: application/json
Authorization: Bearer <your-jwt-token-here>
```

---

## Example Full Request (using cURL)

### Signup:
```bash
curl -X POST http://localhost:3000/api/v1/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Admin User","email":"admin@test.com","password":"admin123","role":"admin"}'
```

### Signin:
```bash
curl -X POST http://localhost:3000/api/v1/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@test.com","password":"admin123"}'
```

### Create Project:
```bash
curl -X POST http://localhost:3000/api/v1/project \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"title":"E-Commerce Website","description":"Building a full-stack e-commerce platform"}'
```

### Create Task:
```bash
curl -X POST http://localhost:3000/api/v1/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN_HERE" \
  -d '{"title":"Design Homepage","description":"Create mockups","project":"PROJECT_ID","assignedto":"USER_ID","status":"todo","priority":"high"}'
```

---

## Status Codes Reference

- **200** - Success
- **201** - Created
- **400** - Bad Request (validation error)
- **401** - Unauthorized (invalid token/password)
- **403** - Forbidden (not admin/no access)
- **404** - Not Found
- **409** - Conflict (email exists)
- **500** - Internal Server Error

---

## Notes:
- Replace `<project-id>`, `<user-id>`, `<task-id>` with actual IDs from responses
- Admin token is required for: creating/deleting projects, creating/updating/deleting tasks
- Regular user can view only their assigned tasks and projects they're members of
- All passwords should be at least 6 characters (zod validation)
