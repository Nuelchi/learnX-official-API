### LearnX Official API

A backend API for the LearnX Learning Management System (LMS) built with Node.js, Express, and MongoDB. This project provides user authentication, course management,Progress Tracking, mentor management, payment processing, and certification features for an educational platform.

## 🚀 Features

# 🔑 Authentication & Authorization
	•	User registration & login with JWT authentication
	•	Role-based access control (Admin, Mentor, Learner)

# 📚 Course Management
	•	Create, read, update, and delete courses (Admin only)
	•	View all available courses
	•	Enroll in courses (Learner)
	•	Access course content and track progress

# 👩‍🏫 Mentor Management
	•	Add, update, and remove mentors (Admin only)
	•	Assign mentors to courses

# 📜 Certification
	•	Issue certifications upon course completion (Admin)
	•	View and download certifications (Learner)

# 💳 Payment Integration: Paystack
	•	Secure payment processing with Paystack for course enrollment

# 🔐 Security & Middleware
	•	JWT authentication for protected routes
	•	Input validation & error handling

# 🛠️ Tech Stack
	•	Backend: Node.js, Express
	•	Database: MongoDB (Mongoose ODM)
	•	Authentication: JSON Web Token (JWT)
	•	Payment Integration: Paystack

## ⚙️ Installation

1️⃣ Clone Repository
```bash
git clone https://github.com/Nuelchi/TS-E-commerce.git
cd TS-E-commerce
```

### 2️⃣ Install Dependencies and setup typescript with src and dist folders

## 📦 Dependencies

### **Main Dependencies**
- `@types/passport`
- `@types/passport-google-oauth20`
- `bcrypt`
- `bcryptjs`
- `dotenv`
- `express`
- `express-session`
- `jsonwebtoken`
- `mongodb`
- `mongoose`
- `passport`
- `passport-google-oauth20`
- `validator`
- `node-cron`
- `axios` *(for Paystack integration)*

### **Development Dependencies**
- `@types/bcryptjs`
- `@types/express`
- `@types/express-session`
- `@types/jsonwebtoken`
- `@types/node`
- `@types/validator`
- `nodemon`
- `ts-node`
- `typescript`

## ⚙️ Install 📦 Dependencies
```bash
npm install ...
```

### 3️⃣ Setup Environment Variables
Create a `.env` file in the root directory and add the following:

PORT=9000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PAYSTACK_SECRET_KEY=your_paystack_secret
FRONTEND_URL=your_frontend_url


### 4️⃣ Run the Server
```bash
npm run dev
```
Server runs on `http://localhost:9000`



## API Endpoints


### Authentication
| Method | Endpoint                     | Description                       |
|--------|------------------------------|-----------------------------------|
| POST   | `/api/v1/user/signUp`        | Register a new user               |
| POST   | `/api/v1/admin/signUp`       | Register a new admin              |
| POST   | `/api/v1/user/login`         | Login user & get token            |
| POST   | `/api/v1/admin/login`        | Login admin                       |
| POST   | `/api/v1/resetPassword`      | Reset user password               |


### Users
| Method | Endpoint                      | Description                         |
|--------|-------------------------------|-------------------------------------|
| GET    | `/api/v1/user/allUser`        | Get details of all users            |
| GET    | `/api/v1/user/allUser/:id`    | Get details of a single user        |
| PUT    | `/api/v1/user/update/:id`     | Update details of a single user     |


### Mentors
| Method | Endpoint                    | Description                            |
|--------|-----------------------------|----------------------------------------|
| POST   | `/api/v1/mentor/addMentor`  | Register a new mentor for LearnX       |
| GET    | `/api/v1/mentor/getMentor`  | Get details of all registered mentors  |



### Courses
| Method | Endpoint                       | Description                           |
|--------|--------------------------------|---------------------------------------|
| POST   | `/api/v1/course/addCourse`     | Add a new course (Admin)              |
| GET    | `/api/v1/course/getCourses`    | Get all available courses             |
| GET    | `/api/v1/course/:id`           | Get details of a single course        |
| PUT    | `/api/v1/course/update/:id`    | Update course details (Admin)         |
| DELETE | `/api/v1/course/delete/:id`    | Delete a course (Admin)               |



### Payment
| Method | Endpoint                        | Description                           |
|--------|---------------------------------|---------------------------------------|
| POST   | `/api/v1/payment/initiate`      | Initiate a payment (for course)       |
| GET    | `/api/v1/payment/verify/:ref`   | Verify payment status by reference    |
| GET    | `/api/v1/payment/allPayments`   | Get all payment records               |


### Tracking
| Method | Endpoint                        | Description                           |
|--------|---------------------------------|---------------------------------------|
| GET    | `/api/v1/tracking/allTracking`  | Get all tracking records              |
| GET    | `/api/v1/tracking/oneTrack/:id` | Get a specific tracking record        |
| GET    | `/api/v1/tracking/userTrack`    | Get tracking details for a user       |

### Certifications
| Method | Endpoint                        | Description                           |
|--------|---------------------------------|---------------------------------------|
| POST   | `/api/v1/certification/addCert` | Add a new certificate (Admin)         |
| GET    | `/api/v1/certification/getCert` | Get certification for a user          |


### Weekly Tasks
| Method | Endpoint                        | Description                           |
|--------|---------------------------------|---------------------------------------|
| POST   | `/api/v1/task/submitTask`       | Submit a weekly task                  |
| GET    | `/api/v1/task/gradeTask`        | Get all submitted tasks               |


## 🚀 Future Improvements
- ✅ Implement unit tests with Jest
- ✅ Deploy the API to production
- ✅ Add support for advanced analytics on learner progress


## 📩 Contact
For inquiries or collaborations:
- GitHub: [Nuelchi](https://github.com/Nuelchi)
- LinkedIn: [Emmanuel Nwafor](https://www.linkedin.com/in/mrnuel-a9935b1b1)
- Email: edubem80@gmail.com