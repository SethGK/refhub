# RefRangeHub

**RefRangeHub** is a RESTful backend service built in **Go** using the **Gin** framework. It allows users to manage studies and their associated medical reference ranges. Built with **JWT authentication**, **PostgreSQL**, and **Docker**.

---

##  Features

* **User registration and login** with JWT authentication
* **CRUD operations** for:
    * Reference Ranges
    * Medical Studies
* **PostgreSQL database** integration with **GORM**
* **Authentication middleware** to protect user data
* **Minimal test suite** with `api_tests.sh`

---

##  Tech Stack

* **Language**: Go 1.22
* **Web Framework**: Gin
* **Database**: PostgreSQL
* **ORM**: GORM
* **Authentication**: JWT
* **Containerization**: Docker & Docker Compose

---

##  Initial Set Up

###  Prerequisites

* **Docker** & **Docker Compose** installed
* **Go** (if running locally without Docker)
* **PostgreSQL** (if running locally without Docker)

---

###  Local Setup (without Docker)

1.  **Copy environment file:**
    ```bash
    cp .env.example .env
    ```
    Edit `.env` and fill in your PostgreSQL database connection URL.

2.  **Start PostgreSQL and create database:**
    Ensure PostgreSQL is running and create the `refhub` database:
    ```bash
    createdb refhub
    ```

3.  **Run the application:**
    ```bash
    go run main.go
    ```

###  Docker Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/SethGK/refhub.git](https://github.com/SethGK/refhub.git)
    cd refhub
    ```

2.  **Build and run with Docker Compose:**
    ```bash
    docker-compose up --build -d
    ```
    The `-d` flag runs the containers in detached mode (in the background).

3.  **Access the application:**
    The app will be running at `http://localhost:8080`.

###  Authentication

1.  **Register a new user:**
    Send a `POST` request to the `/register` endpoint with user credentials (e.g., username, password) in the request body.

2.  **Log in and get JWT:**
    Send a `POST` request to the `/login` endpoint with your registered username and password in the request body. The response will contain a **JWT token**.

3.  **Authorize requests:**
    For all protected routes, include the JWT token in the `Authorization` header as a **Bearer token**. For example:
    ```
    Authorization: Bearer <your_jwt_token>
    ```

###  API Endpoints

| Method | Route                 | Description                                  | Authentication Required | Request Body (Example)                  |
| :----- | :-------------------- | :------------------------------------------- | :-------------------- | :-------------------------------------- |
| `POST` | `/register`          | Register a new user                          | No                    | `{"username": "...", "password": "..."}` |
| `POST` | `/login`             | Login and receive a JWT token                | No                    | `{"username": "...", "password": "..."}` |
| `GET`  | `/reference_ranges`  | Get all reference ranges                     | Yes                   | None                                    |
| `POST` | `/reference_ranges`  | Create a new reference range                 | Yes                   | `{"name": "...", "min": ..., "max": ...}` |
| `PUT`  | `/reference_ranges/:id` | Update an existing reference range (by ID) | Yes                   | `{"name": "...", "min": ..., "max": ...}` |
| `DELETE` | `/reference_ranges/:id` | Delete a reference range (by ID)           | Yes                   | None                                    |
| `GET`  | `/studies`           | Get all medical studies                      | Yes           | None                                    |
| `POST` | `/studies`           | Create a new medical study                   | Yes          | `{"name": "...", "description": "..."}`  |
| `PUT`  | `/studies/:id`       | Update an existing medical study (by ID)     | Yes           | `{"name": "...", "description": "..."}`  |
| `DELETE` | `/studies/:id`       | Delete a medical study (by ID)             | Yes           | None                                    |

**Note:** The `/studies` endpoints likely also require authentication, although it's not explicitly stated in the "Features" section.

###  License

MIT — feel free to use, fork, and modify.