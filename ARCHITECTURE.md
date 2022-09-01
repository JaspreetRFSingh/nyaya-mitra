# NyayaMitra Architecture

## System Architecture

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│   React     │────▶│  Spring Boot │────▶│   MongoDB   │
│  Frontend   │     │   Backend    │     │  Database   │
└─────────────┘     └──────────────┘     └─────────────┘
      │                    │
      │                    │
      ▼                    ▼
┌─────────────┐     ┌──────────────┐
│ Material-UI │     │   iText7     │
│   Components│     │  PDF Engine  │
└─────────────┘     └──────────────┘
```

## Backend Architecture

- **Controller Layer**: REST API endpoints
- **Service Layer**: Business logic
- **Repository Layer**: Data access
- **Model Layer**: Domain entities
- **Security Layer**: JWT authentication

## Frontend Architecture

- **Pages**: Route components
- **Components**: Reusable UI elements
- **Context**: Global state management
- **Services**: API client layer
- **Utils**: Helper functions
