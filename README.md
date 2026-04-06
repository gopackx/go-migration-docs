# go-migration-docs

Documentation website for [go-migration](https://github.com/gopackx/go-migration) — a Laravel-inspired database migration and seeding system for Go.

Built with [Fumadocs](https://fumadocs.vercel.app/), Next.js, Tailwind CSS 4, and MDX.

## Getting Started

```bash
# Install dependencies
bun install

# Start the dev server
bun run dev

# Build for production
bun run build

# Start production server
bun run start
```

The dev server runs at [http://localhost:3000](http://localhost:3000).

## Documentation Sections

- Getting Started — installation, quick start, project structure
- Migrations — defining, registering, running, rollback, reset/refresh/fresh, transactions
- Schema Builder — tables, columns, modifiers, indexes, foreign keys
- Database Grammars — PostgreSQL, MySQL, SQLite type mappings
- Seeders — defining, running, dependencies
- Factories — generic Factory[T], Faker methods, named states
- Connections — connection manager, pool configuration, drivers
- Hooks — BeforeMigrate, AfterMigrate
- CLI Reference — all commands and flags
- Configuration — YAML, JSON, environment variables
- Framework Integration — Gin, Echo, Fiber, net/http
- Error Handling — typed errors, troubleshooting
- API Reference — complete method signatures for all packages

## Project Structure

```
app/                    # Next.js App Router pages and layouts
content/docs/           # MDX documentation content
lib/                    # Fumadocs loader configuration
source.config.ts        # Fumadocs content collection config
```

## Deployment

The site is configured for Vercel deployment. Push to your repository and connect it to Vercel — no additional configuration needed.
