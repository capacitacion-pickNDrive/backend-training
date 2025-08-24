# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Strapi v5** headless CMS application built with TypeScript. Strapi is a flexible, open-source headless CMS that provides a powerful API and admin panel for content management.

## Development Commands

### Core Development
- `npm run develop` or `npm run dev` - Start development server with hot reload (default port: 1337)
- `npm run start` - Start production server without hot reload
- `npm run build` - Build the admin panel for production
- `npm run console` - Open Strapi console for programmatic access

### Other Commands
- `npm run deploy` - Deploy using Strapi's deployment features
- `npm run upgrade` - Upgrade Strapi to the latest version
- `npm run upgrade:dry` - Preview Strapi upgrade changes without applying them

## Docker Development

The project includes Docker configuration for containerized development:

```bash
# Build and start all services (Strapi + PostgreSQL)
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f strapi
```

**Docker Services:**
- `strapi` - Main application container (port 1337)
- `strapiDB` - PostgreSQL database container (port 5432)

## Project Structure

### Core Directories
- `src/` - Main application source code
  - `api/` - API routes, controllers, services, and models
  - `extensions/` - Strapi core extensions and customizations
  - `admin/` - Admin panel customizations (React/TypeScript)
  - `index.ts` - Application entry point with register/bootstrap hooks
- `config/` - Strapi configuration files
  - `database.ts` - Database connection configuration (supports PostgreSQL, MySQL, SQLite)
  - `server.ts` - Server configuration (host, port, app keys)
  - `admin.ts`, `api.ts`, `middlewares.ts`, `plugins.ts` - Feature-specific configs
- `public/` - Static assets and file uploads
- `database/migrations/` - Database migration files

### Configuration Files
- `tsconfig.json` - TypeScript configuration with CommonJS modules
- `docker-compose.yml` - Multi-service Docker setup with PostgreSQL
- `Dockerfile` - Production-ready Node.js 22 Alpine container
- `.env` - Environment variables (database, JWT secrets, app keys)

## Architecture Notes

### Database Configuration
The application supports multiple database types through environment variables:
- **PostgreSQL** (default in Docker): Full-featured production database
- **MySQL**: Alternative production database option
- **SQLite**: Development/testing database (file-based)

### Environment Management
All configuration is environment-driven using Strapi's `env()` helper:
- Database credentials and connection settings
- JWT secrets for authentication
- Application keys for session management
- Server host/port configuration

### TypeScript Setup
- Uses CommonJS modules for Node.js compatibility
- Excludes admin files from server compilation
- Builds to `dist/` directory
- Supports both .ts and .js files throughout the project

### Extension Points
- `src/index.ts` - Application lifecycle hooks (register, bootstrap)
- `src/extensions/` - Core Strapi functionality extensions
- `src/admin/` - Custom admin panel components and configuration
- `config/` - All aspects of Strapi configuration

## Important Notes

- **No built-in testing framework** - Project uses default Strapi setup without test configuration
- **Database migrations** are handled through Strapi's built-in migration system
- **File uploads** are stored in `public/uploads/` by default
- **Admin panel** is built separately from the API and can be customized extensively
- **API endpoints** are auto-generated based on content types defined in `src/api/`