const express = require('express');
const router = express.Router();
const Subscriber = require('../models/Subscriber');

router.post('/', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ status: 'error', message: 'Invalid email format' });
    }
    const subscriber = new Subscriber({ email });
    await subscriber.save();
    res.status(201).json({ status: 'success', message: 'Subscribed successfully' });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ status: 'error', message: 'Email already subscribed' });
    } else {
      res.status(500).json({ status: 'error', message: 'Server error' });
    }
  }
});

router.get('/', async (req, res) => {
  try {
    const subscribers = await Subscriber.find();
    res.json({ status: 'success', data: subscribers });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
});

module.exports = router;