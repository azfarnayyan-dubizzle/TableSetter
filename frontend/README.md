# 🎨 frontend

### Frontend — TableSetter Web App

Web client for the TableSetter restaurant management & customer insights platform.

---

## 🛠️ Tech Stack

- ⚛️ React 19.x
- ▲ Next.js 16.x (App Router)
- 🔷 TypeScript 5.x
- 🐜 Ant Design (AntD) 5.x
- 📡 Axios
- ☁️ Deploy: Vercel

---

## 🧱 Structure — Atomic Design

```
backend/
└── src/
    ├── atoms/
    ├── icons/
    ├── molecules/
    ├── organisms/
    └── templates/
```

| Layer | Contains |
|---|---|
| `atoms/` | Smallest reusable UI pieces — buttons, inputs, labels |
| `icons/` | Icon components |
| `molecules/` | Small groups of atoms — form fields, cards |
| `organisms/` | Larger composed sections — nav bar, review list |
| `templates/` | Page-level layouts |

---

## 🚀 Getting Started

### ✅ Prerequisites
- 🟢 Node.js 20+
- Backend (`backend`) running locally or a reachable API URL

### ⚙️ Setup

```bash
npm install
npm run dev
```

### 🔑 Environment

Set your API base URL (e.g. in `.env.local`):

```bash
NEXT_PUBLIC_API_URL=http://localhost/api
```

---

## 🔗 Connects To

- 🔐 Auth — Laravel Sanctum (token-based)
- 📡 Data fetching — Axios + TanStack React Query
- ⚙️ Backend — `backend` (Laravel API)

> Full architecture diagrams and feature list live in the [root README](../README.md).

---