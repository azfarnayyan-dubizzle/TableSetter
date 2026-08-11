# my-toblerone

Backend API for the Restaurant Discovery & Review Platform, built with Laravel 8.2, PostgreSQL, Redis, Typesense, and MinIO.

## Tech Stack
- Laravel (PHP 8.2) + Laravel Sail
- Laravel Sanctum (auth)
- Laravel Scout + Typesense (search)
- PostgreSQL (database)
- Redis (cache/queues)
- Laravel Telescope, Horizon, Scribe, Postman (dev tools)

## Git Branching Strategy

### Branches
| Branch | Purpose |
|---|---|
| `main` | Always stable, deployable code. Never commit directly. |
| `as per work` | Create meaningful branched for PR |

### Commit Message Convention
```
<type>: <short description>

as per work - meaningful name
feature     - new feature
fix      - bug fix
chore    - tooling/config/non-functional change
docs     - documentation only
test     - adding/updating tests
refactor - code change that doesn't add a feature or fix a bug
```

## Project Structure
```
app/
├── Http/
│   ├── Controllers/
│   ├── Requests/
│   └── Resources/
├── Models/
├── Services/
└── Policies/
database/
├── migrations/
├── factories/
└── seeders/
routes/
├── api.php
└── web.php
```
