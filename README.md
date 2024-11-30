# Password Reset and Forgot Password API

This backend application provides a password reset feature that allows users to reset their password securely if they forget it. The application includes two main endpoints:

- **Forgot Password**: Sends a reset password link to the user's email.
- **Reset Password**: Allows the user to update their password using the reset link.

## Technologies Used:
- Node.js
- Express.js
- Nodemailer (for sending emails)
- JWT (for secure password reset links)
- bcryptjs (for password hashing)
- MongoDB (for storing user data)
- dotenv (for managing environment variables)

2. Install Dependencies:
Run the following command to install all the required dependencies:

--- npm install

Setup Environment Variables:

--  MAIL_USER and MAIL_PASS: Your email credentials (used to send the password reset email).
-- JWT_SECRET: A secret key to sign JWT tokens.
-- MONGO_URI: MongoDB connection string.

Testing the Application: You can test the endpoints using tools like Postman or Insomnia.

For Forgot Password, send a POST request to /forgot-password with a user's email. For Reset Password, use the reset link sent to your email and send a POST request to /reset-password/:token with a new password.

-## End points :

reset-password
forgot-password
