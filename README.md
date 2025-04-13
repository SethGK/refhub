# 🧪 RefRangeHub - Medical Reference Management Platform

RefRangeHub is a web-based platform designed to help healthcare professionals and researchers efficiently manage medical studies, reference ranges, and departmental data. It provides robust tools to organize studies, track analyte-specific reference ranges, and categorize data by departments.

---

## ✨ Features

### 🔐 User Authentication
- Secure registration and login
- JWT token-based authentication

### 📊 Reference Range Management
- Create, view, update, and delete reference ranges
- Associate reference ranges with departments
- Filter and sort reference ranges by department
  - Filter reference ranges by department, analyte name, and study.
  - Sort reference ranges by analyte name, age, and date.
- Specify reference ranges with detailed parameters:
  - Analyte name and unit.
  - Lower and upper bounds.
  - General notes.
  - Department association.
  - Age range (min and max).
  - Sex specification.
  - Pregnancy status.
  - Link to related studies.

### 📚 Study Management
- Create, view, update, and delete medical studies
- Link reference ranges to specific studies
- Provide study details:
  - Study name and description.
  - Publication date.
  - Link to external resources.
  - Associated reference ranges.

### 🏥 Department Management
- Create, view, and delete departments
- Categorize reference ranges by department

---

## 🛠️ Technologies Used

### Backend
- **Go** – Core backend language
- **Gin** – Web framework for routing and middleware
- **GORM** – ORM for PostgreSQL
- **PostgreSQL** – Relational database
- **JWT** – JSON Web Token authentication

### Frontend
- **React** – Dynamic frontend interface
- **Tailwind CSS** - Styling

---

## ⚙️ Setup Instructions

### Prerequisites

Before you begin, ensure you have the following installed:

- **Go:** [https://golang.org/dl/](https://golang.org/dl/)
- **PostgreSQL:** [https://www.postgresql.org/download/](https://www.postgresql.org/download/)
- **Node.js and npm:** [https://nodejs.org/](https://nodejs.org/) (for the React frontend)
- **.env file:** Create a `.env` file in the backend root directory and add the following:
  ```
  DATABASE_URL=postgres://your_user:your_password@your_host:your_port/your_database
  ```
  Replace `your_user`, `your_password`, `your_host`, `your_port`, and `your_database` with your PostgreSQL credentials.

### 1. Backend Setup

```bash
# Clone the repository
git clone <repository_url>
cd backend  # Navigate to the backend directory

# Install Go dependencies
go mod tidy

# Run the backend server
go run main.go
```

### 2. Frontend Setup

```bash
cd frontend # Navigate to the frontend directory

# Install Node.js dependencies
npm install

# Start the frontend development server
npm start
```

### 3. Database Setup

Create a PostgreSQL database: Use a tool like psql or a GUI like pgAdmin to create the database specified in your .env file.

Run Migrations: The backend should automatically create the necessary tables on startup using GORM's AutoMigrate feature based on the defined models. If you encounter issues, ensure your database connection is correct and the models are properly defined in your Go code.
