# 7Alps Backend — API Documentation

**Base URL:** `http://localhost:3000/api/v1`  
**Content-Type:** `application/json` (unless uploading files — use `multipart/form-data`)  
**Auth header:** `Authorization: Bearer <token>`

---

## Auth — `/api/v1/auth` (Admin)

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

### GET `/admin/orders`

Returns all orders across all customers, newest first, with the customer's name/mobile populated.

**Response `200`:** `{ "status": "success", "results": N, "data": { "orders": [...] } }`

---

### GET `/admin/orders/:id`

Get a single order by ID (admin view).

**Response `200`:** `{ "status": "success", "data": { "order": {...} } }`

---

### PATCH `/admin/orders/:id/status`

Update an order's fulfillment status.

**Body:** `{ "status": "Confirmed | Processing | Shipped | Delivered | Cancelled" }`  
**Response `200`:** `{ "status": "success", "data": { "order": {...} } }`

---

## Products — `/api/v1/products`

Products carry **variants** (weight/size options), each with its own price, MRP, and
stock. There is no single top-level price/stock anymore — pricing and inventory always
come from a specific variant.

### 🌐 Public endpoints (no auth)

#### GET `/products/public`

Returns all **active** products. Optional query params:

| Param      | Type   | Description                                                    |
| ---------- | ------ | ---------------------------------------------------------------- |
| `category` | string | Filter by category (`Hair Care`, `Skin Care`, `Health & Wellness`) |

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
        "category": "Skin Care",
        "subCategory": "...",
        "taglines": ["Nature's Timeless Luxury"],
        "shortDescription": "...",
        "description": "...",
        "keyHighlights": ["100% Natural", "No Chemicals"],
        "ingredients": ["Pure Sun-Dried Sandalwood Powder"],
        "usageSuggestions": ["Mix with rose water for a face pack"],
        "storageInstructions": "Store in a cool, dry place...",
        "tags": ["natural", "organic"],
        "variants": [
          { "label": "100g", "price": 249, "mrp": 299, "stock": 20, "isDefault": true },
          { "label": "250g", "price": 499, "mrp": 599, "stock": 10, "isDefault": false }
        ],
        "coverImage": "https://pub-xxxxxxxx.r2.dev/products/1234567890-abc123.png",
        "images": ["https://pub-xxxxxxxx.r2.dev/products/1234567891-def456.png"],
        "active": true,
        "orderCount": 12,
        "inStock": true,
        "minPrice": 249,
        "maxPrice": 499,
        "createdAt": "...",
        "updatedAt": "..."
      }
    ]
  }
}
```

> **Images:** `coverImage`/`images` are full public URLs on Cloudflare R2 (uploaded there directly
> on create/update, deleted from R2 on replace/delete) — use them as-is, no URL building needed.  
> `inStock`, `minPrice`, `maxPrice` are computed virtuals (not stored).

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
| ---------- | ---------------- | ------------------------ |
| `active`   | `true` / `false` | Filter by active status |
| `category` | string           | Filter by category      |

---

#### POST `/products`

Create a new product. Send as `multipart/form-data`.

| Field                 | Type   | Required | Description                                                                |
| --------------------- | ------ | -------- | --------------------------------------------------------------------------- |
| `name`                | string | ✅       | Product name (slug auto-generated)                                        |
| `category`             | string | ✅       | One of `Hair Care`, `Skin Care`, `Health & Wellness`                       |
| `subCategory`          | string |          | Optional                                                                   |
| `variants`             | JSON string | ✅  | `[{ "label", "price", "mrp"?, "stock"?, "isDefault"? }, ...]` — at least 1 |
| `shortDescription`     | string |          | One-liner for cards/listings                                              |
| `description`          | string |          | Full description                                                          |
| `taglines`             | JSON array or comma-separated string |  | Marketing one-liners                              |
| `keyHighlights`        | JSON array or comma-separated string |  | Bullet features                                    |
| `ingredients`          | JSON array or comma-separated string |  | Ingredient list                                    |
| `usageSuggestions`     | JSON array or comma-separated string |  | Bullet usage tips                                  |
| `storageInstructions`  | string |          | Storage guidance                                                           |
| `tags`                 | JSON array or comma-separated string |  | Search/filter tags                                 |
| `active`               | boolean |          | Default `true`                                                            |
| `coverImage`           | file   |          | Main image (max 5 MB) — uploaded to Cloudflare R2                          |
| `images`               | file[] |          | Gallery images, up to 5 (max 5 MB each) — uploaded to Cloudflare R2        |

**Response `201`:** `{ "status": "success", "data": { "product": {...} } }`

---

#### GET `/products/:id`

Get a single product by ID (admin view — works even if inactive).

---

#### PATCH `/products/:id`

Update a product. Send as `multipart/form-data`. Only send fields you want to change.
Uploading new `coverImage` / `images` uploads the new files to R2 and deletes the old
ones from R2.

**Fields:** Same as POST.

---

#### PATCH `/products/:id/toggle-status`

Toggle a product's `active` field between `true` and `false`.

---

#### DELETE `/products/:id`

Permanently deletes the product and removes its images from R2.

**Response `204`:** No body.

---

## Customer Auth — `/api/v1/customer`

Passwordless, mobile-number + OTP based (no password field on the Customer model).
A single send-otp/verify-otp pair handles **both** signup and login: if the mobile
number doesn't belong to an existing customer, the account is created on OTP
verification.

> ⚠️ No SMS gateway is wired up yet (same status as payments — deferred). In
> non-production, the OTP is logged to the server console (`[DEV OTP] <mobile>: <otp>`)
> instead of being sent via SMS. **`123456` is also always accepted as a universal
> fallback OTP** for any mobile number until a real SMS provider is wired up — remove
> this once one is added.

### POST `/customer/send-otp`

**Body:** `{ "mobile": "10-digit string", "name": "string (required only for new numbers)" }`  
**Response `200`:** `{ "status": "success", "message": "OTP sent successfully." }`

---

### POST `/customer/verify-otp`

**Body:** `{ "mobile": "string", "otp": "string" }`  
**Response `200`:**

```json
{
  "status": "success",
  "token": "<jwt>",
  "data": { "customer": { "_id", "name", "mobile", "addresses", "lastLoginTime" } }
}
```

---

### GET `/customer/status`

🔒 Requires auth. Returns the logged-in customer's profile.

---

### POST `/customer/logout`

🔒 Requires auth.

---

### PATCH `/customer/addresses`

🔒 Requires auth. Replaces the customer's address book.

**Body:** `{ "addresses": [{ "label", "line1", "line2"?, "city", "state", "pincode", "phone"?, "isDefault"? }] }`

---

## Cart — `/api/v1/customer/cart`

🔒 All routes require customer auth. One cart per customer; prices are always read
live from the product's current variant (never cached on the cart), so the cart is
never out of sync with catalog changes.

### GET `/customer/cart`

**Response `200`:**

```json
{
  "status": "success",
  "data": {
    "cart": {
      "_id": "...",
      "items": [
        {
          "product": "...",
          "name": "...",
          "coverImage": "...",
          "category": "...",
          "variantLabel": "100g",
          "price": 249,
          "quantity": 2,
          "subtotal": 498,
          "inStock": true
        }
      ],
      "subtotal": 498,
      "shipping": 99,
      "total": 597
    }
  }
}
```

Free shipping over ₹999 subtotal.

---

### POST `/customer/cart/items`

Add an item (or increment if the same product+variant is already in the cart).

**Body:** `{ "productId": "string", "variantLabel": "string", "quantity": 1 }`

---

### PATCH `/customer/cart/items/:productId`

**Body:** `{ "variantLabel": "string", "type": "increase" | "decrease" }`

---

### DELETE `/customer/cart/items/:productId?variantLabel=100g`

Removes a specific product+variant line from the cart.

---

### DELETE `/customer/cart`

Clears the entire cart.

---

## Orders — `/api/v1/customer/orders`

🔒 All routes require customer auth. **No payment gateway yet** — orders are created
and confirmed immediately (`status: "Confirmed"`, `paymentStatus: "Pending"`,
`paymentMethod: "COD"`). The payment layer will be added in a later phase.

### POST `/customer/orders`

Creates an order from the customer's current cart: validates stock per variant,
snapshots price/name at order time, decrements variant stock, bumps the product's
`orderCount`, clears the cart — all atomically in a transaction.

**Body:**

```json
{
  "shippingAddress": {
    "name": "string",
    "phone": "string",
    "line1": "string",
    "line2": "string (optional)",
    "city": "string",
    "state": "string",
    "pincode": "string"
  }
}
```

**Response `201`:** `{ "status": "success", "data": { "order": {...} } }`  
**Response `400`:** Empty cart, missing address fields, or insufficient stock.

---

### GET `/customer/orders`

Returns the logged-in customer's order history, newest first.

---

### GET `/customer/orders/:id`

Get a single order belonging to the logged-in customer.

---

## Error Responses

All errors follow this shape:

```json
{ "status": "fail" | "error", "message": "Human-readable message" }
```

| Status | Meaning                                      |
| ------ | --------------------------------------------- |
| `400`  | Bad request / validation error               |
| `401`  | Not authenticated / wrong credentials        |
| `403`  | Authenticated but not authorised             |
| `404`  | Resource not found                           |
| `429`  | Rate limit exceeded (100 req / 5 min per IP) |
| `500`  | Internal server error                        |
