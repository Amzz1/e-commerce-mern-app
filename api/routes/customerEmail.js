import express from 'express'
import CustomerEmail from '../models/CustomerEmail.js';
const router = express.Router()

router.post('/subscribe',async (req, res) => {
    const { email } = req.body;
  
    try {
      const newEmail = new CustomerEmail({ email });
      await newEmail.save();
  
      res.json({ message: 'Email subscribed successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error subscribing email' });
    }
  })

export default router

