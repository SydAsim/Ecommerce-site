# E-Commerce Backend: Folder Structure

## Root-Level Structure

```
ecommerce-backend/
├── src/
│   ├── domain/                          # Core business logic (entities, events)
│   │   ├── entities/
│   │   │   ├── User.entity.js
│   │   │   ├── Product.entity.js
│   │   │   ├── Order.entity.js
│   │   │   ├── Cart.entity.js
│   │   │   ├── Coupon.entity.js
│   │   │   ├── Review.entity.js
│   │   │   └── Category.entity.js
│   │   ├── valueObjects/
│   │   │   └── Money.vo.js
│   │   └── events/
│   │       ├── OrderPlaced.event.js
│   │       ├── LowStock.event.js
│   │       └── PaymentFailed.event.js
│   │
│   ├── application/                     # Use cases & orchestration
│   │   ├── useCases/
│   │   │   ├── auth/
│   │   │   │   ├── RegisterUser.js
│   │   │   │   └── LoginUser.js
│   │   │   ├── products/
│   │   │   │   ├── CreateProduct.js
│   │   │   │   ├── SearchProducts.js
│   │   │   │   └── UpdateStock.js
│   │   │   ├── cart/
│   │   │   │   ├── AddToCart.js
│   │   │   │   └── GetCart.js
│   │   │   ├── orders/
│   │   │   │   ├── CreateOrder.js
│   │   │   │   └── UpdateOrderStatus.js
│   │   │   ├── coupons/
│   │   │   │   └── ApplyCoupon.js
│   │   │   ├── payments/
│   │   │   │   └── ProcessPayment.js
│   │   │   ├── users/
│   │   │   │   └── UpdateProfile.js
│   │   │   ├── reviews/
│   │   │   │   └── SubmitReview.js
│   │   │   └── notifications/
│   │   │       └── SendNotification.js
│   │   └── services/
│   │       ├── InventoryService.js
│   │       ├── RecommendationService.js
│   │       └── ReportService.js
│   │
│   ├── infrastructure/                  # DB, integrations, config
│   │   ├── persistence/
│   │   │   ├── repositories/
│   │   │   │   ├── UserRepository.js
│   │   │   │   ├── ProductRepository.js
│   │   │   │   └── OrderRepository.js
│   │   │   └── schemas/
│   │   │       ├── User.schema.js
│   │   │       ├── Product.schema.js
│   │   │       ├── Order.schema.js
│   │   │       ├── Cart.schema.js
│   │   │       ├── Coupon.schema.js
│   │   │       ├── Review.schema.js
│   │   │       └── Category.schema.js
│   │   ├── integrations/
│   │   │   ├── stripe/
│   │   │   │   ├── StripeAdapter.js
│   │   │   │   └── StripeWebhookHandler.js
│   │   │   ├── email/
│   │   │   │   └── NodemailerAdapter.js
│   │   │   ├── storage/
│   │   │   │   └── CloudinaryAdapter.js
│   │   │   └── analytics/
│   │   │       └── MongoAnalyticsAdapter.js
│   │   ├── config/
│   │   │   ├── database.js
│   │   │   ├── logger.js
│   │   │   ├── swagger.js
│   │   │   └── env.js
│   │   └── utils/
│   │       ├── validators.js
│   │       ├── errors.js
│   │       ├── cron.js
│   │       └── helpers.js
│   │
│   ├── interfaces/                      # HTTP layer (controllers, routes, middleware)
│   │   ├── controllers/
│   │   │   ├── AuthController.js
│   │   │   ├── ProductController.js
│   │   │   ├── CartController.js
│   │   │   ├── OrderController.js
│   │   │   ├── AdminController.js
│   │   │   └── ReviewController.js
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   ├── products.routes.js
│   │   │   ├── cart.routes.js
│   │   │   ├── orders.routes.js
│   │   │   ├── admin.routes.js
│   │   │   ├── reviews.routes.js
│   │   │   └── index.js
│   │   └── middleware/
│   │       ├── authMiddleware.js
│   │       ├── validationMiddleware.js
│   │       ├── errorHandler.js
│   │       ├── rateLimiter.js
│   │       └── uploadMiddleware.js
│   │
│   └── server.js                        # App bootstrap
│
├── tests/                               # Test suites
│   ├── unit/
│   │   ├── domain.entities.test.js
│   │   └── services.test.js
│   ├── integration/
│   │   ├── orderCheckout.flow.test.js
│   │   └── auth.flow.test.js
│   └── e2e/
│       ├── adminDashboard.test.js
│       └── customerJourney.test.js
│
├── docs/                                # Documentation & diagrams
│   ├── api/
│   │   └── swagger.json
│   ├── diagrams/
│   │   ├── ERD.png
│   │   ├── DFD.png
│   │   ├── UseCase.png
│   │   └── Sequence.png
│   └── SETUP.md
│
├── .env.example                         # Environment template
├── .gitignore
├── docker-compose.yml                   # Local dev with Mongo
├── Dockerfile
├── package.json
├── jest.config.js                       # Test config
├── .eslintrc.json                       # Code quality
├── README.md
└── server.js                            # Entry point
```

## Key Improvements:

| Aspect | Change | Reason |
|--------|--------|--------|
| **Simplification** | Removed "modules/" folder | Premature; use if team >5 |
| **Naming** | `*.js` consistent (no `.usecase`, `.entity` suffixes in paths) | Cleaner imports |
| **Admin** | Integrated into controllers/routes (not separate) | Admin routes gated by RBAC middleware |
| **Config** | Dedicated `config/` folder | Centralized env/db/logger setup |
| **Tests** | Structured unit/integration/e2e | Matches SRS 3.3.6 coverage goal |
| **Entry** | `server.js` at root (not buried) | Standard Node.js convention |

## Usage Example:

```javascript
// In src/interfaces/routes/products.routes.js
const router = require('express').Router();
const ProductController = require('../controllers/ProductController');
const { authenticate } = require('../middleware/authMiddleware');

router.get('/', ProductController.listProducts);           // Public
router.post('/', authenticate, ProductController.create); // Admin

module.exports = router;
```

## Migration from README structure:
If you've started with the verbose version, consolidate:
- Move all `/admin/*` controllers into **AdminController.js** (RBAC gates them).
- Merge `domain/events` into services that emit them.
- Delete `modules/` unless scaling to multiple teams.

**Result:** ~60 files instead of 100+; faster navigation, easier testing.

---

## **Detailed File Explanations**

### **Domain Layer** (Business Logic)

#### `src/domain/entities/`

| File | Purpose | What It Does |
|------|---------|-------------|
| **User.entity.js** | Defines User business object | Represents a customer/admin with properties: id, name, email, password hash, role, address, createdAt. No DB logic. |
| **Product.entity.js** | Defines Product business object | Represents a product: id, name, price, stock, category, description, images, ratings. Pure data structure. |
| **Order.entity.js** | Defines Order business object | Represents a purchase: id, userId, items[], totalPrice, status, shippingAddress, paymentMethod, createdAt. |
| **Cart.entity.js** | Defines Cart business object | Represents a shopping cart: userId, items[], totalPrice, createdAt. Ephemeral. |
| **Coupon.entity.js** | Defines Coupon business object | Represents a discount: id, code, type (%), value, minCart, expiryDate, usageLimit, usedCount. |
| **Review.entity.js** | Defines Review business object | Represents product feedback: id, userId, productId, rating (1-5), text, approved, createdAt. |
| **Category.entity.js** | Defines Category business object | Represents product grouping: id, name, parent (null or parentId for hierarchy), icon. |

#### `src/domain/valueObjects/`

| File | Purpose | What It Does |
|------|---------|-------------|
| **Money.vo.js** | Immutable currency object | Encapsulates price + currency (e.g., {amount: 99.99, currency: 'USD'}). Prevents invalid amounts. |

#### `src/domain/events/`

| File | Purpose | What It Does |
|------|---------|-------------|
| **OrderPlaced.event.js** | Event fired when order created | Payload: {orderId, userId, totalPrice, timestamp}. Triggers email, inventory updates. |
| **LowStock.event.js** | Event fired when stock <10 | Payload: {productId, currentStock}. Alerts admin. |
| **PaymentFailed.event.js** | Event fired on payment error | Payload: {orderId, reason, timestamp}. Notifies customer, logs for dispute. |

---

### **Application Layer** (Use Cases & Orchestration)

#### `src/application/useCases/auth/`

| File | Purpose | What It Does |
|------|---------|-------------|
| **RegisterUser.js** | Use case for sign-up | Input: {name, email, password}. Validates unique email, hashes pwd, creates User entity, returns JWT. |
| **LoginUser.js** | Use case for login | Input: {email, password}. Validates credentials, returns JWT token (24hr expiry) + refresh token. |

#### `src/application/useCases/products/`

| File | Purpose | What It Does |
|------|---------|-------------|
| **CreateProduct.js** | Admin-only: Add product | Input: {name, price, stock, category, images, description}. Saves to DB, triggers event if stock low. |
| **SearchProducts.js** | Customer: Browse products | Input: {keyword, category, minPrice, maxPrice, page}. Queries with filters, returns paginated results + facets. |
| **UpdateStock.js** | Internal: Adjust inventory | Input: {productId, quantity}. Decrements stock after order; emits LowStock event if needed. |

#### `src/application/useCases/cart/`

| File | Purpose | What It Does |
|------|---------|-------------|
| **AddToCart.js** | Customer: Add item to cart | Input: {userId, productId, quantity}. Validates stock, updates cart entity, calculates total. |
| **GetCart.js** | Customer: Fetch cart | Input: {userId}. Returns full cart with prices, totals, applies active coupons. |

#### `src/application/useCases/orders/`

| File | Purpose | What It Does |
|------|---------|-------------|
| **CreateOrder.js** | Customer: Checkout | Input: {userId, items[], shippingAddress, paymentMethod}. Snapshots prices, deducts stock, creates Order, emits OrderPlaced event. |
| **UpdateOrderStatus.js** | Admin/System: Update order state | Input: {orderId, newStatus}. Transitions order (pending→paid→shipped→delivered). Guards invalid transitions. |

#### `src/application/useCases/coupons/`

| File | Purpose | What It Does |
|------|---------|-------------|
| **ApplyCoupon.js** | Customer: Validate & apply coupon | Input: {cartId, couponCode}. Checks expiry, usage limits, min cart value; returns discount amount. |

#### `src/application/useCases/payments/`

| File | Purpose | What It Does |
|------|---------|-------------|
| **ProcessPayment.js** | System: Handle Stripe payment | Input: {orderId, amount, paymentIntentId}. Confirms intent, updates order status, emits PaymentFailed/Success events. |

#### `src/application/useCases/users/`

| File | Purpose | What It Does |
|------|---------|-------------|
| **UpdateProfile.js** | Customer: Edit account | Input: {userId, name, addresses[], preferences}. Validates, saves to User repository. |

#### `src/application/useCases/reviews/`

| File | Purpose | What It Does |
|------|---------|-------------|
| **SubmitReview.js** | Customer: Post product review | Input: {userId, productId, rating, text}. Validates post-purchase; saves pending approval; aggregates avg rating. |

#### `src/application/useCases/notifications/`

| File | Purpose | What It Does |
|------|---------|-------------|
| **SendNotification.js** | System: Email/SMS trigger | Input: {type, userId, data}. Dispatches order confirmation, abandoned cart alert, low stock notifications. |

#### `src/application/services/`

| File | Purpose | What It Does |
|------|---------|-------------|
| **InventoryService.js** | Manages stock logic | Methods: `checkStock()`, `reserveStock()`, `releaseStock()`. Handles overbooking prevention. |
| **RecommendationService.js** | AI hook for product suggestions | Methods: `getRecommendations()`. Stub for ML; returns top-rated products as fallback. |
| **ReportService.js** | Generates admin reports | Methods: `salesReport()`, `customerInsights()`. Queries Mongo aggregation pipeline; outputs CSV/JSON. |

---

### **Infrastructure Layer** (Database, Integrations, Config)

#### `src/infrastructure/persistence/repositories/`

| File | Purpose | What It Does |
|------|---------|-------------|
| **UserRepository.js** | DB abstraction for Users | Methods: `create()`, `findById()`, `findByEmail()`, `update()`, `delete()`. Wraps Mongoose User model. |
| **ProductRepository.js** | DB abstraction for Products | Methods: `create()`, `findById()`, `search()`, `updateStock()`. Handles complex queries (filters, facets). |
| **OrderRepository.js** | DB abstraction for Orders | Methods: `create()`, `findById()`, `findByUserId()`, `updateStatus()`. Tracks order lifecycle. |

#### `src/infrastructure/persistence/schemas/`

| File | Purpose | What It Does |
|------|---------|-------------|
| **User.schema.js** | Mongoose User schema | Defines fields: name, email, passwordHash, role, addresses, createdAt. Indexes on email, role. |
| **Product.schema.js** | Mongoose Product schema | Defines: name, price, stock, category (ref), images[], ratings, description. Indexes on category, price. |
| **Order.schema.js** | Mongoose Order schema | Defines: userId (ref), items (product ref + qty), totalPrice, status, shipping, payment, timestamps. |
| **Cart.schema.js** | Mongoose Cart schema | Defines: userId or sessionId, items[], expiryDate (TTL index). |
| **Coupon.schema.js** | Mongoose Coupon schema | Defines: code, type, value, minCart, expiryDate, usageLimit, usedByUsers[]. |
| **Review.schema.js** | Mongoose Review schema | Defines: userId (ref), productId (ref), rating, text, approved, createdAt. |
| **Category.schema.js** | Mongoose Category schema | Defines: name, parentId (ref for hierarchy), icon. |

#### `src/infrastructure/integrations/stripe/`

| File | Purpose | What It Does |
|------|---------|-------------|
| **StripeAdapter.js** | Wrapper for Stripe API | Methods: `createPaymentIntent()`, `confirmPayment()`, `refund()`. Abstracts Stripe SDK. |
| **StripeWebhookHandler.js** | Processes Stripe webhooks | Listens to payment_intent.succeeded, payment_intent.payment_failed; updates order status. |

#### `src/infrastructure/integrations/email/`

| File | Purpose | What It Does |
|------|---------|-------------|
| **NodemailerAdapter.js** | Wrapper for email service | Methods: `sendConfirmation()`, `sendReset()`, `sendAbandonedCart()`. Uses SendGrid/SMTP. |

#### `src/infrastructure/integrations/storage/`

| File | Purpose | What It Does |
|------|---------|-------------|
| **CloudinaryAdapter.js** | Wrapper for image hosting | Methods: `uploadImage()`, `deleteImage()`. Auto-resizes; returns CDN URL. |

#### `src/infrastructure/integrations/analytics/`

| File | Purpose | What It Does |
|------|---------|-------------|
| **MongoAnalyticsAdapter.js** | Runs Mongo aggregation queries | Methods: `topProducts()`, `revenueTrend()`, `churnRate()`. Feeds ReportService. |

#### `src/infrastructure/config/`

| File | Purpose | What It Does |
|------|---------|-------------|
| **database.js** | MongoDB connection setup | Initializes Mongoose, sets connection options, handles reconnect logic. |
| **logger.js** | Winston logging config | Structured logging (INFO, WARN, ERROR); outputs to console + file. |
| **swagger.js** | API documentation generator | Reads route comments, generates OpenAPI 3.0 spec for /api/docs. |
| **env.js** | Environment variables loader | Validates .env file; exports config object (DB_URL, STRIPE_KEY, etc.). |

#### `src/infrastructure/utils/`

| File | Purpose | What It Does |
|------|---------|-------------|
| **validators.js** | Custom validation logic | Functions: `isValidEmail()`, `isValidPassword()`, `sanitizeInput()`. Used by middleware. |
| **errors.js** | Custom error classes | AppError, ValidationError, NotFoundError. Standardizes error responses. |
| **cron.js** | Scheduled tasks | Jobs: `expireCoupons()`, `restockAlert()`, `abandonedCart()`. Runs on intervals. |
| **helpers.js** | Utility functions | `generateJWT()`, `hashPassword()`, `calculateDiscount()`, `formatCurrency()`. |

---

### **Interfaces Layer** (HTTP: Routes, Controllers, Middleware)

#### `src/interfaces/controllers/`

| File | Purpose | What It Does |
|------|---------|-------------|
| **AuthController.js** | Handles auth HTTP requests | Methods: `register()`, `login()`, `logout()`, `refreshToken()`. Calls RegisterUser/LoginUser use cases. |
| **ProductController.js** | Handles product HTTP requests | Methods: `list()`, `getDetail()`, `create()`, `update()`, `delete()`, `search()`. |
| **CartController.js** | Handles cart HTTP requests | Methods: `getCart()`, `addItem()`, `removeItem()`, `updateQty()`, `clear()`. |
| **OrderController.js** | Handles order HTTP requests | Methods: `checkout()`, `getOrder()`, `cancelOrder()`, `track()`. |
| **AdminController.js** | Admin-only endpoints | Methods: `dashboard()`, `banUser()`, `generateReport()`, `updateOrderBulk()`. RBAC-gated. |
| **ReviewController.js** | Handles review HTTP requests | Methods: `submitReview()`, `getReviews()`, `approveReview()` (admin). |

#### `src/interfaces/routes/`

| File | Purpose | What It Does |
|------|---------|-------------|
| **auth.routes.js** | Auth endpoints | Routes: POST /auth/register, POST /auth/login, POST /auth/refresh, POST /auth/logout. |
| **products.routes.js** | Product endpoints | Routes: GET /products, GET /products/:id, POST /products (admin), PUT /products/:id (admin), DELETE /products/:id (admin). |
| **cart.routes.js** | Cart endpoints | Routes: GET /cart, POST /cart/items, PATCH /cart/items/:id, DELETE /cart/items/:id. |
| **orders.routes.js** | Order endpoints | Routes: POST /orders (checkout), GET /orders/:id, GET /orders (my orders), PATCH /orders/:id/cancel. |
| **admin.routes.js** | Admin endpoints | Routes: GET /admin/dashboard, GET /admin/reports, PATCH /admin/users/:id/ban, PATCH /admin/orders/:id/status. |
| **reviews.routes.js** | Review endpoints | Routes: POST /reviews, GET /products/:id/reviews, PATCH /reviews/:id/approve (admin). |
| **index.js** | Main router combiner | Imports all routes above; mounts under /api/v1. Registers global middleware. |

#### `src/interfaces/middleware/`

| File | Purpose | What It Does |
|------|---------|-------------|
| **authMiddleware.js** | JWT verification | Checks Authorization header; validates token; attaches user to req.user. Rejects if expired/invalid. |
| **validationMiddleware.js** | Request validation | Uses Joi to validate body/params; returns 400 if invalid. Sanitizes input. |
| **errorHandler.js** | Global error catcher | Catches all exceptions; formats response (status, message, errors[]). Logs to Winston. |
| **rateLimiter.js** | DDoS protection | Limits 100 req/min per IP; returns 429 if exceeded. Uses redis or in-memory store. |
| **uploadMiddleware.js** | File upload handler | Uses Multer; validates file type (images only); uploads to Cloudinary; attaches URL to req. |

#### `src/server.js`

| File | Purpose | What It Does |
|------|---------|-------------|
| **server.js** | App entry point | Imports Express app, loads .env via config/env.js, connects to MongoDB via database.js, starts server on port 5000. |

---

### **Tests**

#### `tests/unit/`

| File | Purpose | What It Does |
|------|---------|-------------|
| **domain.entities.test.js** | Unit tests for entities | Tests Order entity creation, status transitions; Review entity validation. No DB. |
| **services.test.js** | Unit tests for services | Mocks repositories; tests InventoryService.checkStock(), ReportService.salesReport(). |

#### `tests/integration/`

| File | Purpose | What It Does |
|------|---------|-------------|
| **orderCheckout.flow.test.js** | Flow: cart → payment → order | Tests end-to-end checkout; mocks Stripe; verifies stock deduction, email sent. |
| **auth.flow.test.js** | Flow: register → login → auth header | Tests JWT creation, token refresh, logout. |

#### `tests/e2e/`

| File | Purpose | What It Does |
|------|---------|-------------|
| **adminDashboard.test.js** | Real API: admin features | Hits /admin/dashboard, /admin/reports endpoints; verifies RBAC denies customer access. |
| **customerJourney.test.js** | Real API: full customer flow | Browse → Add to cart → Apply coupon → Checkout → Track order. Real DB. |

---

### **Root Configuration Files**

| File | Purpose | What It Does |
|------|---------|-------------|
| **.env.example** | Template for secrets | Example: `DB_URL=mongodb://...`, `STRIPE_KEY=sk_...`, `JWT_SECRET=...`. Developers copy to .env. |
| **.gitignore** | Git exclusion list | Ignores: .env, node_modules/, .DS_Store, test coverage reports. |
| **docker-compose.yml** | Local dev environment | Spins up MongoDB + Express app; developers run `docker-compose up`. |
| **Dockerfile** | Production container spec | Multi-stage build; node:20-alpine base; runs `npm start`. |
| **package.json** | NPM metadata | Defines dependencies (express, mongoose, joi, etc.), scripts (start, test, lint). |
| **jest.config.js** | Jest test runner config | Sets testEnvironment, coverage thresholds (80%), test match patterns. |
| **.eslintrc.json** | Code style rules | Enforces airbnb style, no console logs, semicolons required. |
| **README.md** | Project documentation | Quickstart, API overview, deployment guide (your SRS doc). |

---

## **Architecture Summary**

| Layer | Purpose | Key Directories |
|-------|---------|-----------------|
| **Domain** | Business rules (entities, events) | `src/domain/` |
| **Application** | Use cases & orchestration | `src/application/useCases/`, `src/application/services/` |
| **Infrastructure** | DB, integrations, config | `src/infrastructure/persistence/`, `src/infrastructure/integrations/`, `src/infrastructure/config/` |
| **Interfaces** | HTTP API (controllers, routes, middleware) | `src/interfaces/` |
| **Tests** | Quality assurance | `tests/unit/`, `tests/integration/`, `tests/e2e/` |

---

## **Quick Reference: File Dependencies**

```
server.js (Entry Point)
  ↓
Express App (src/interfaces/routes/index.js)
  ↓
Routes (e.g., src/interfaces/routes/auth.routes.js)
  ↓
Controllers (src/interfaces/controllers/AuthController.js)
  ↓
Use Cases (src/application/useCases/auth/RegisterUser.js)
  ↓
Services (src/application/services/InventoryService.js)
  ↓
Repositories (src/infrastructure/persistence/repositories/UserRepository.js)
  ↓
Schemas & MongoDB (src/infrastructure/persistence/schemas/User.schema.js)
```

---

**Total: ~60 focused files instead of 1 giant file!** 🎯
**Clean separation of concerns | Easy to test | Production-ready** ✅