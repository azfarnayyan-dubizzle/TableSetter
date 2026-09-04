# ⚙️ backend

### Backend — TableSetter API

REST API powering the TableSetter restaurant management & customer insights platform.

---

## 🛠️ Tech Stack

- 🐘 Laravel (PHP 8.2)
- 🔐 Laravel Sanctum (authentication)
- 🔍 Laravel Scout (search abstraction)
- 🐘 PostgreSQL — primary database

---

## 🧰 Dev / Debug Tools

| Tool | Purpose |
|---|---|
| 🧪 Laravel Tinker | Interactive REPL |
| 🔭 Laravel Telescope | Request / query / exception inspector |
| 📮 Postman | API testing — collection in `postman-collection-&testing/` |

---

## 🚀 Getting Started

### ✅ Prerequisites
- 🐳 Docker
- 🐘 PHP 8.2+ / Composer

### ⚙️ Setup

```bash
cp .env.example .env
./vendor/bin/sail up -d
./vendor/bin/sail artisan migrate --seed
./vendor/bin/sail artisan scout:import "App\Models\Restaurant"
```

### 🧭 Local URLs

| Tool | URL |
|---|---|
| 🔭 Telescope | `http://localhost/telescope` |
| 📡 API | `http://localhost/api` |

---

## 📁 Structure

```
backend/
├── app/
│   └── Http/Controllers/
│       ├── Auth/
│       ├── Customer/
│       ├── Owner/
│       └── Public/
├── routes/
│   └── web.php
└── database/
    └── migrations/
```

---

## 📡 API Routes

| Group | Base Path |
|---|---|
| 🔐 Auth | `/api/customer/*`, `/api/owner/*` |
| 🙋 Customer | `/api/customer/*` |
| 🏪 Owner | `/api/owner/*` |
| 🌍 Public | `/api/restaurants`, `/api/search/restaurants` |

> Full endpoint list and diagrams live in the [root README](../README.md).

---