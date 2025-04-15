# RefRangeHub: Medical Reference Management Platform

RefRangeHub is a comprehensive web-based solution that enables healthcare professionals and researchers to efficiently manage medical studies, reference ranges, and departmental data. This platform streamlines study organization and reference range tracking to support evidence-based decision-making in clinical settings.

## Key Features

- **Secure Authentication**: JWT token-based login system with protected user registration
- **Reference Range Management**: Create, view, update, and delete reference ranges with comprehensive filtering options by department, analyte, age, sex, and pregnancy status
- **Study Management**: Organize medical studies and link them with relevant reference ranges
- **Department Organization**: Efficiently categorize and manage departmental data

## Screenshots

### Reference Range Management  
![Reference Range Form](./screenshots/ReferenceRangeForm.png)  
![Reference Range List](./screenshots/ReferenceRangeList.png)

### Study Management  
![Studies List and Form](./screenshots/StudiesListAndForm.png)

### Dashboard  
![Dashboard](./screenshots/Dashboard.png)

## Technology Stack

- **Backend**: Go, Gin, GORM, PostgreSQL, JWT
- **Frontend**: React, Tailwind CSS

## Setup Instructions

### Prerequisites

- Go [Download](https://golang.org/dl/)
- PostgreSQL [Download](https://www.postgresql.org/download/)
- Node.js & npm [Download](https://nodejs.org/en/download/)

### Environment Configuration

Create a `.env` file in the backend root directory:
```
DATABASE_URL=postgres://your_user:your_password@your_host:your_port/your_database
```

### Installation

1. **Backend Setup**
   ```
   git clone https://github.com/SethGK/refhub.git
   cd refhub
   go mod tidy
   go run main.go
   ```

2. **Frontend Setup**
   ```
   cd refhub/client
   npm install
   npm start
   ```

3. **Database Setup**
   - Create a PostgreSQL database using psql or pgAdmin
   - GORM's AutoMigrate functionality will create the necessary tables on application startup

## Contributing

Contributions are welcome. Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/YourFeatureName`
3. Commit your changes: `git commit -m "Add: description of your feature"`
4. Push to your branch: `git push origin feature/YourFeatureName`
5. Open a pull request with a detailed description of your changes