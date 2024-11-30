const express = require('express')
const nodemailer = require('nodemailer')
const mongoose = require('mongoose')
const bcrypt  = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('./models/user')
const PasswordReset = require('./models/PasswordReset')
require('dotenv').config();

const app = express();
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGOOSE_URI)

.then(()=>{
    console.log('mongooDB connected sucessfully');
    
}).catch((err)=>{
   console.log(err);
   
})

// Nodemailer setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-email-password',
    },
  });

  // Forgot password route
app.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
  
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }
  
    const resetToken = jwt.sign({ userId: user._id }, 'secretkey');
    
    const resetLink = `http://localhost:5173/reset-password/${resetToken}`;

    const reset = new PasswordReset({ userId: user._id, token: resetToken, expiry: Date.now() + 3600000 });
    await reset.save();

     // Send email
  await transporter.sendMail({
    from:"lokeshbsccomputerscience@getMaxListeners.com",
    to: user.email,
    subject: 'Password Reset',
    html: `<p>Click the link to reset your password: <a href="${resetLink}">Reset Password</a></p>`,
  });

  res.json({ message: 'Password reset link has been sent to your email' });
});

// Reset password route
app.post('/reset-password', async (req, res) => {
    const { token, newPassword } = req.body;
  
    try {
      const decoded = jwt.verify(token, 'secretkey');
      const resetRequest = await PasswordReset.findOne({ token });
  
      if (!resetRequest || resetRequest.expiry < Date.now()) {
        return res.status(400).json({ error: 'Reset link has expired or is invalid' });
      }

      const user = await User.findById(decoded.userId);
      const hashedPassword = await bcrypt.hash(newPassword, 10);
  
      user.password = hashedPassword;
      await user.save();
  
      // Remove the reset token from the database
      await PasswordReset.deleteOne({ token });
  
      res.json({ message: 'Password has been reset successfully' });
    } catch (err) {
      res.status(400).json({ error: 'Invalid or expired token' });
    }
  });

  // Start the server
app.listen(3001, () => {
    console.log('Server is running on port http://localhost:3001');
  });