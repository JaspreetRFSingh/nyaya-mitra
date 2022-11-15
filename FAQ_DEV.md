## FAQ for Developers

### Q: How do I run the backend?
A: `cd backend && mvn spring-boot:run`

### Q: How do I run the frontend?
A: `cd frontend && npm start`

### Q: What MongoDB version is required?
A: MongoDB 4.4 or higher

### Q: How do I add a new FAQ?
A: Add to DataInitializer.java or use MongoDB Compass

### Q: How do I change the JWT secret?
A: Update `jwt.secret` in application.properties

### Q: Can I use this for production?
A: Review security docs and update configurations
