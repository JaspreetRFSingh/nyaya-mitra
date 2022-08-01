# NyayaMitra API Documentation

## Base URL
`http://localhost:8080/api`

## Authentication Endpoints

### POST /auth/login
Login with email and password

### POST /auth/register
Register new client

### POST /auth/register/lawyer
Register new lawyer

### GET /auth/me
Get current user details

## FAQ Endpoints

### GET /faqs
List all FAQs

### GET /faqs/{id}
Get FAQ by ID

### GET /faqs/category/{category}
Filter FAQs by category

## Lawyer Endpoints

### GET /lawyers
List all lawyers

### GET /lawyers/{id}
Get lawyer details

## Court Endpoints

### GET /courts
List all courts

### GET /courts/{id}
Get court details

## Document Endpoints

### GET /documents
List user documents

### POST /documents/generate
Generate new document

### GET /documents/{id}/download
Download document PDF
