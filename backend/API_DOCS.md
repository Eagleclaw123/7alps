# 7Alps Backend — API Documentation

**Base URL:** `http://localhost:3000/api/v1`  
**Content-Type:** `application/json` (unless uploading files — use `multipart/form-data`)  
**Auth header:** `Authorization: Bearer <token>`

---

## Auth — `/api/v1/auth`

### POST `/auth/login`

Admin login. No auth required.

**Body:**

```json
{ "email": "string", "password": "string" }
```

**Response `200`:**

```json
{
  "status": "success",
  "token": "<jwt>",
  "data": {
    "user": { "_id", "Name", "Email", "role", "lastLoginTime" },
    "dashboardURL": "/admin",
    "lastLoginTime": "ISO string"
  }
}
```

---

### POST `/auth/logout`

🔒 Requires auth.

**Response `200`:** `{ "status": "success", "message": "Logged out successfully" }`

---

### GET `/auth/status`

🔒 Requires auth. Returns the currently logged-in admin's profile.

**Response `200`:** `{ "status": "success", "data": { "user": {...} } }`

---

### GET `/auth/health`

Server + DB health check. No auth required.

**Response `200`:**

```json
{
  "status": "success",
  "data": { "server": "up", "database": "connected", "timestamp": "..." }
}
```

---

### POST `/auth/signup/send-otp`

Step 1 of admin signup. Sends OTP to email. No auth required.

**Body:**

```json
{
  "email": "string",
  "name": "string",
  "phoneNumber": "string",
  "role": "Admin | SuperAdmin"
}
```

**Response `200`:** `{ "status": "success", "message": "OTP sent to email..." }`

---

### POST `/auth/signup/verify-otp`

Step 2 of admin signup. Verifies OTP and creates account. No auth required.

**Body:**

```json
{
  "email": "string",
  "otp": "string",
  "password": "string",
  "passwordConfirm": "string"
}
```

**Response `201`:** Same shape as login response.

---

### POST `/auth/signup/resend-otp`

Resend signup OTP. No auth required.

**Body:** `{ "email": "string" }`  
**Response `200`:** `{ "status": "success", "message": "New OTP sent to email." }`

---

### POST `/auth/forgotPassword`

Sends a password-reset OTP to the email. No auth required.

**Body:** `{ "email": "string" }`  
**Response `200`:** `{ "status": "success", "message": "OTP sent to email!" }`

---

### POST `/auth/verifyOTP`

Verifies the password-reset OTP. No auth required.

**Body:** `{ "email": "string", "otp": "string" }`  
**Response `200`:** `{ "status": "success", "message": "OTP verified successfully" }`

---

### POST `/auth/resetPasswordAfterOTP`

Sets a new password after OTP verification. No auth required.

**Body:** `{ "email": "string", "password": "string", "passwordConfirm": "string" }`  
**Response `200`:** Same shape as login response.

---

### PATCH `/auth/reset-password/:token`

🔒 Requires auth. Resets password via token (alternative flow).

**Body:** `{ "password": "string", "passwordConfirm": "string" }`  
**Response `200`:** Same shape as login response.

---

### PATCH `/auth/updatePassword`

🔒 Requires auth. Change password while logged in.

**Body:** `{ "currentPassword": "string", "newPassword": "string", "confirmPassword": "string" }`  
**Response `200`:** Same shape as login response.

---

## Admin Management — `/api/v1/admin`

🔒 All routes require auth + role `Admin` or `SuperAdmin`.

### GET `/admin/dashboard/stats`

Returns total active admin count.

**Response `200`:**

```json
{ "status": "success", "data": { "totalAdmins": 2 } }
```

---

### GET `/admin`

Get all active admins.

**Response `200`:** `{ "status": "success", "results": N, "data": { "admins": [...] } }`

---

### GET `/admin/:id`

Get a single admin by ID.

**Response `200`:** `{ "status": "success", "data": { "admin": {...} } }`

---

### PATCH `/admin/:id`

Update an admin (name, phone, role). Do **not** send `password` here.

**Body:** `{ "Name": "string", "PhoneNumber": "string", "role": "Admin | SuperAdmin" }`  
**Response `200`:** `{ "status": "success", "data": { "admin": {...} } }`

---

### DELETE `/admin/:id`

Soft-delete (sets `active: false`).

**Response `204`:** No body.

---

## Products — `/api/v1/products`

### 🌐 Public endpoints (no auth)

#### GET `/products/public`

Returns all **active** products. Optional query params:

| Param      | Type   | Description                                                                            |
| ---------- | ------ | -------------------------------------------------------------------------------------- |
| `category` | string | Filter by category (`Soap`, `Shampoo`, `Hair Care`, `Skin Care`, `Body Care`, `Other`) |

**Response `200`:**

```json
{
  "status": "success",
  "results": 5,
  "data": {
    "products": [
      {
        "_id": "...",
        "name": "...",
        "slug": "...",
        "shortDescription": "...",
        "description": "...",
        "category": "Soap",
        "price": 149,
        "mrp": 199,
        "weight": "100g",
        "tags": ["natural", "organic"],
        "coverImage": "product-1234567890-123456.jpg",
        "images": ["product-xxx.jpg"],
        "active": true,
        "inStock": true,
        "orderCount": 12,
        "createdAt": "...",
        "updatedAt": "..."
      }
    ]
  }
}
```

> **Image URL:** `http://localhost:3000/images/products/<filename>`

---

#### GET `/products/public/:idOrSlug`

Returns a single active product by MongoDB `_id` or `slug`.

**Response `200`:** `{ "status": "success", "data": { "product": {...} } }`  
**Response `404`:** `{ "status": "fail", "message": "Product not found" }`

---

### 🔒 Admin endpoints (auth + Admin/SuperAdmin role)

#### GET `/products`

Returns **all** products including inactive ones.

| Param      | Type             | Description             |
| ---------- | ---------------- | ----------------------- |
| `active`   | `true` / `false` | Filter by active status |
| `category` | string           | Filter by category      |

**Response `200`:** Same shape as public GET, but includes inactive products.

---

#### POST `/products`

Create a new product. Send as `multipart/form-data`.

| Field              | Type    | Required | Description                             |
| ------------------ | ------- | -------- | --------------------------------------- |
| `name`             | string  | ✅       | Product name (slug auto-generated)      |
| `category`         | string  | ✅       | One of the 6 categories                 |
| `price`            | number  | ✅       | Selling price                           |
| `mrp`              | number  |          | Original / crossed-out price            |
| `shortDescription` | string  |          | One-liner                               |
| `description`      | string  |          | Full description                        |
| `weight`           | string  |          | e.g. `100g`, `200ml`                    |
| `tags`             | string  |          | Comma-separated: `natural,organic`      |
| `active`           | boolean |          | Default `true`                          |
| `inStock`          | boolean |          | Default `true`                          |
| `coverImage`       | file    |          | Main image (max 5 MB)                   |
| `images`           | file[]  |          | Gallery images, up to 5 (max 5 MB each) |

**Response `201`:** `{ "status": "success", "data": { "product": {...} } }`

---

#### GET `/products/:id`

Get a single product by ID (admin view — works even if inactive).

**Response `200`:** `{ "status": "success", "data": { "product": {...} } }`

---

#### PATCH `/products/:id`

Update a product. Send as `multipart/form-data`. Only send fields you want to change.  
Uploading new `coverImage` / `images` replaces and deletes the old files from disk.

**Fields:** Same as POST.  
**Response `200`:** `{ "status": "success", "data": { "product": {...} } }`

---

#### PATCH `/products/:id/toggle-status`

Toggle a product's `active` field between `true` and `false`.

**Body:** none  
**Response `200`:** `{ "status": "success", "data": { "product": { "active": false, ... } } }`

---

#### DELETE `/products/:id`

Permanently deletes the product and removes its images from disk.

**Response `204`:** No body.

---

## Error Responses

All errors follow this shape:

```json
{ "status": "fail" | "error", "message": "Human-readable message" }
```

| Status | Meaning                                      |
| ------ | -------------------------------------------- |
| `400`  | Bad request / validation error               |
| `401`  | Not authenticated / wrong credentials        |
| `403`  | Authenticated but not authorised             |
| `404`  | Resource not found                           |
| `429`  | Rate limit exceeded (100 req / 5 min per IP) |
| `500`  | Internal server error                        |
