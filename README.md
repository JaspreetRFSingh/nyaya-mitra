# NyayaMitra - Indian Legal Advice & Document Management System

## Overview

NyayaMitra (न्याय मित्र - "Legal Friend") is a comprehensive legal technology platform designed for the Indian legal system. It connects citizens with qualified lawyers, provides automated legal document generation, and offers free legal guidance through an extensive FAQ system.

## Features

### For Citizens (Clients)
- **Legal Consultation Booking**: Schedule video/phone consultations with verified lawyers
- **Automated Document Generation**: Create legal documents like affidavits, notices, petitions
- **Case Tracking**: Monitor your case status and hearing dates
- **Legal Aid Information**: Know your rights and legal aid availability
- **FAQ Database**: Instant answers to common legal questions

### For Lawyers
- **Practice Management**: Manage consultations, clients, and cases
- **Document Templates**: Access and customize legal document templates
- **Calendar Integration**: Manage hearing dates and appointments
- **Client Communication**: Secure messaging with clients

### Document Types Supported
- Affidavits (General, Income, Residence, etc.)
- Legal Notices (Cheque Bounce, Recovery, Defamation, etc.)
- RTI Applications
- Consumer Court Complaints
- Property Documents (Rent Agreement, Sale Deed)
- Family Law Documents (Divorce Petition, Maintenance)
- Criminal Law Documents (Bail Application, FIR)
- Civil Court Petitions
- Contract Agreements

### Indian Legal System Integration
- Court hierarchy (Supreme Court, High Courts, District Courts)
- Case types (Civil, Criminal, Family, Consumer, RTI)
- Legal aid provisions (NALSA, SLSA, DLSA)
- Court fees calculator
- Limitation period checker

## Technology Stack

### Backend
- Java 8
- Spring Boot 2.7.x
- Spring Security (JWT Authentication)
- MongoDB
- Maven

### Frontend
- React 18
- React Router
- Axios
- Material-UI
- Formik & Yup (Form handling)

## Project Structure

```
nyaya-mitra/
├── backend/          # Spring Boot application
├── frontend/         # React application
└── docs/            # Documentation
```

## Getting Started

### Prerequisites
- Java 8 or higher
- Node.js 16 or higher
- MongoDB 4.4 or higher
- Maven 3.6+

### Backend Setup
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

## Configuration

Create `application.properties` in `backend/src/main/resources/`:
```properties
spring.data.mongodb.uri=mongodb://localhost:27017/nyayamitra
jwt.secret=your-secret-key
jwt.expiration=86400000
```

## Legal Disclaimer

This platform provides legal information and document generation tools but does not substitute professional legal advice. Users should consult qualified advocates for specific legal matters.

## License

MIT License - See LICENSE file for details

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

## Support

For support, email: support@nyayamitra.in
