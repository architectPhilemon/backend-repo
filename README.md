# Clinic Booking System Backend

A Node.js backend API for managing clinic appointments, doctors, and patients.

## Features

- User authentication and authorization
- Appointment scheduling and management
- Doctor profile management
- Patient profile management
- Secure password hashing
- MongoDB database integration

## Tech Stack

- Node.js
- Express.js
- MongoDB
- JWT for authentication
- bcryptjs for password hashing
- cors for Cross-Origin Resource Sharing

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas URI)
- npm or yarn package manager

## Installation

1. Clone the repository:
   ```bash
   git clone <your-repository-url>
   cd clinic-booking-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a .env file in the root directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/clinic-booking
   JWT_SECRET=your_jwt_secret_key_here
   NODE_ENV=development
   ```

4. Start the server:
   ```bash
   npm start
   ```

The server will start on http://localhost:5000

## API Endpoints

### Users
- POST /api/users/register - Register a new user
- POST /api/users/login - User login
- GET /api/users/profile - Get user profile
- PUT /api/users/profile - Update user profile

### Doctors
- GET /api/doctors - Get all doctors
- GET /api/doctors/:id - Get doctor by ID
- POST /api/doctors - Add new doctor
- PUT /api/doctors/:id - Update doctor
- DELETE /api/doctors/:id - Delete doctor

### Appointments
- GET /api/appointments - Get all appointments
- GET /api/appointments/:id - Get appointment by ID
- POST /api/appointments - Create new appointment
- PUT /api/appointments/:id - Update appointment
- DELETE /api/appointments/:id - Cancel appointment

## License

MIT

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request 