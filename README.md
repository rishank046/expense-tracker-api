# 💰 Expense Tracker REST API

A high-performance, scalable RESTful API built with **Node.js**, **Express 5**, and **MySQL** for personal finance tracking, expense categorization, financial summary aggregations, and user profile management.

---

## 📌 Features & Application Architecture

- **Authentication & Session Management**: Secure user registration (`POST /user/signin`) with `bcrypt` password hashing (cost factor 10) and secure token cookie generation (`POST /user/login`).
- **Expense Operations**:
  - `POST /expense/addExpense`: Add parameterized expenses with category mapping.
  - `GET /expense/getExpense`: Retrieve user expense history sorted by timestamp.
  - `PUT /expense/updateExpense`: Update expense fields (amount, description, category).
  - `POST /expense/deleteExpense`: Delete expense records scoped by user identity.
- **Financial Analytics & Aggregations**:
  - `GET /expense/getSummary`: Date-range aggregation using SQL `SUM`, `MIN`, and `MAX`.
  - `GET /expense/filterAmount`: Instant amount filtering powered by composite indexes.
- **Database Optimization**: Custom MySQL connection pool with `enableKeepAlive` and composite indexes on `Expenses(userId, created_at)` to eliminate full table scans under load.
- **Security & Error Sanitization**: Sanitized error handler output formatted as application/json, hiding internal database stack traces from API clients.

---

## 🛠️ Technologies Used

- **Runtime & Framework**: Node.js (ES Modules), Express.js `v5.2`
- **Database**: MySQL 8.0 / MariaDB via `mysql2/promise` (connection pooling & parameterized queries)
- **Security & Hashing**: `bcrypt` password hashing, Cryptographically secure token generation (`crypto.randomBytes(32)`), `cookie-parser`
- **Validation**: Zod schema validation
- **Benchmarking**: ApacheBench (`ab`)

---

## ⚡ Performance Benchmarks: Render Free Tier vs Local Machine

Performance benchmark tests were conducted using **ApacheBench (`ab`)** executing **120,000+ total HTTP requests** at **concurrency levels $c=50$ and $c=100$**.

### 💻 Benchmark Hardware Specifications
- **Local Machine**: **Dell Latitude 5400** (Intel Core i5, DDR4 RAM) running Linux
- **Cloud Hosting**: **Render Free Tier** (0.1 vCPU shared container) + **Aiven Cloud MySQL**

### 📊 Performance Comparison Matrix

| Metric / Endpoint | Render Free Tier (Cloud DB) | Local Machine (Dell Latitude 5400) | Performance Delta |
| :--- | :---: | :---: | :---: |
| **`GET /expense/getExpense` Throughput** | 14.11 req/sec | **8,518.08 req/sec** | $\mathbf{\approx 603\times\text{ Faster}}$ |
| **`GET /expense/getSummary` Throughput** | ~2.15 req/sec | **10,334.98 req/sec** | $\mathbf{\approx 4,800\times\text{ Faster}}$ |
| **`GET /expense/filterAmount` Throughput** | 2.16 req/sec | **10,887.21 req/sec** | $\mathbf{\approx 5,040\times\text{ Faster}}$ |
| **`POST /expense/addExpense` Throughput** | 2.14 req/sec | **8,341.58 req/sec** | $\mathbf{\approx 3,890\times\text{ Faster}}$ |
| **Mean Latency per Request ($c=100$)** | 461.93 ms – 3,544 ms | **0.092 ms – 0.120 ms** | **Sub-millisecond** |
| **50% Median Latency** | 1,367 ms – 6,854 ms | **8 ms – 10 ms** | $\mathbf{> 99\%\text{ Latency Drop}}$ |
| **Failed Requests (30,000 requests)** | Sporadic (Cloudflare TLS rate limits) | **0 (100% Success)** | **Zero Failures** |

> **Key Takeaway**: Running the service locally on a Dell Latitude 5400 eliminates internet network roundtrips, TLS handshake overhead, and free-cloud container CPU throttling, achieving over **10,800 requests per second** with **8ms median response times**.

---

## 🚀 How to Run Locally

### Prerequisites
- **Node.js** v18.0.0 or higher
- **MySQL** 8.0+ or MariaDB (or Docker)

### 1. Clone the Repository
```bash
git clone https://github.com/rishank046/expense-tracker-api.git
cd expense-tracker-api
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory:
```env
PORT=3000

# Set to true for local in-memory DB execution without requiring a MySQL server setup
LOCAL_DB=true

# MySQL Credentials (Required if LOCAL_DB is not set to true)
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=expensedb

# Table Name Mapping
USER_TABLE_NAME=User
USER_PROFILE_TABLE_NAME=userProfile
CATEGORY_TABLE_NAME=Category
EXPENSE_TABLE_NAME=Expenses
TOKEN_TABLE_NAME=Token
```

### 4. Start the Server
```bash
npm start
```
The API server will initialize database tables automatically and listen on `http://localhost:3000`.

---

## ☁️ How to Deploy to Cloud (Render / Aiven / AWS)

### 1. Database Setup (Aiven / AWS RDS)
1. Create a MySQL database instance on Aiven or AWS RDS.
2. Download the SSL CA certificate (`ca.pem`) if required by your provider and place it in the project root directory.

### 2. Deploying to Render
1. Connect your GitHub repository to [Render](https://render.com).
2. Select **Web Service** with runtime **Node**.
3. Set Build Command: `npm install`
4. Set Start Command: `npm start`
5. Configure Environment Variables in Render Dashboard (see section below).

---

## 🔑 Environment Variables Reference

| Variable Name | Description | Example / Default |
| :--- | :--- | :--- |
| `PORT` | HTTP Port for the API server | `3000` |
| `LOCAL_DB` | Set `true` to run with fast local database engine | `true` |
| `DB_HOST` | Hostname of the MySQL database server | `localhost` or `mysql-aiven.aivencloud.com` |
| `DB_PORT` | Port number of the MySQL server | `3306` |
| `DB_USER` | MySQL database user | `avnadmin` or `root` |
| `DB_PASSWORD` | MySQL user password | `your_secure_password` |
| `DB_NAME` | MySQL database name | `defaultdb` |
| `USER_TABLE_NAME` | Table name for user authentication records | `User` |
| `USER_PROFILE_TABLE_NAME` | Table name for user profile data | `userProfile` |
| `CATEGORY_TABLE_NAME` | Table name for expense categories | `Category` |
| `EXPENSE_TABLE_NAME` | Table name for user expenses | `Expenses` |
| `TOKEN_TABLE_NAME` | Table name for active user session tokens | `Token` |
