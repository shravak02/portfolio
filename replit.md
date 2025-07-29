# Portfolio Website

## Overview

This is a modern, animated portfolio website built as a full-stack application using React, TypeScript, and Express. The project features a sleek, dark-themed design with neon accents, smooth animations, and interactive components to showcase personal projects, skills, and professional experience.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **UI Components**: Shadcn/ui component library built on Radix UI primitives
- **Animations**: Framer Motion for smooth animations and transitions
- **State Management**: TanStack Query for server state management
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Storage**: PostgreSQL-based sessions using connect-pg-simple
- **API Design**: RESTful endpoints with Express routing

### Development Environment
- **Package Manager**: npm with lockfile version 3
- **TypeScript**: Shared configuration across client, server, and shared modules
- **Hot Reload**: Vite dev server with HMR support
- **Development Tools**: Replit-specific plugins for enhanced development experience

## Key Components

### Frontend Components
1. **Navigation**: Fixed header with smooth scroll navigation and active section highlighting
2. **Hero Section**: Animated typewriter effect with particle background
3. **Skills Section**: Interactive skill bars with animated progress indicators
4. **Timeline**: Professional experience displayed in an animated timeline format
5. **Project Cards**: Hover-animated cards showcasing portfolio projects
6. **Contact Form**: Form handling with validation (prepared for backend integration)

### Backend Components
1. **Express Server**: Main application server with middleware for logging and error handling
2. **API Routes**: 
   - Resume download endpoint (`/api/download-resume`)
   - Contact form endpoint (`/api/contact`) - prepared for email integration
3. **Storage Layer**: Abstract storage interface with in-memory implementation for user management
4. **Vite Integration**: Development server setup with Vite middleware for seamless development

### Database Schema
- **Users Table**: Basic user authentication schema with username/password fields
- **Drizzle Configuration**: Type-safe ORM setup with PostgreSQL dialect
- **Migration Support**: Database migration system using Drizzle Kit

## Data Flow

1. **Client Requests**: React components make API calls using TanStack Query
2. **API Layer**: Express routes handle requests and business logic
3. **Data Processing**: Server processes requests and interacts with storage layer
4. **Database Operations**: Drizzle ORM handles type-safe database interactions
5. **Response**: JSON responses sent back to client with proper error handling
6. **State Management**: TanStack Query manages caching and synchronization

## External Dependencies

### Core Dependencies
- **UI Framework**: React, Vite, TypeScript
- **Styling**: Tailwind CSS, Radix UI components, Framer Motion
- **Database**: Drizzle ORM, @neondatabase/serverless, connect-pg-simple
- **Utilities**: date-fns, zod for validation, wouter for routing

### Development Dependencies
- **Build Tools**: esbuild for server bundling, PostCSS for CSS processing
- **Replit Integration**: Custom plugins for development environment enhancement

### Planned Integrations
- **Email Service**: For contact form functionality
- **File Storage**: For resume and asset management
- **Analytics**: For visitor tracking and engagement metrics

## Deployment Strategy

### Development
- **Local Development**: Vite dev server with Express backend
- **Hot Reload**: Full-stack hot reloading with Vite middleware
- **Environment**: NODE_ENV=development with enhanced debugging

### Production
- **Build Process**: 
  1. Vite builds client-side assets to `dist/public`
  2. esbuild bundles server code to `dist/index.js`
- **Server**: Express serves static files and API endpoints
- **Database**: PostgreSQL connection via environment variable
- **Environment**: NODE_ENV=production with optimized settings

### Configuration Management
- **Environment Variables**: DATABASE_URL for database connection
- **Build Outputs**: Separate client and server build processes
- **Static Assets**: Client assets served from Express in production

The architecture follows a modern full-stack pattern with clear separation of concerns, type safety throughout, and production-ready deployment configuration. The portfolio showcases modern web development practices with smooth animations, responsive design, and professional presentation.