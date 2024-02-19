const express = require('express');
const router = express.Router();
const CheckIn = require("../models/CheckInSchema");

router.post('/', async (req, res) => {
  const phoneNumber = req.body.phoneNumber;
  console.log('Received phone number for tracking:', phoneNumber);

  try {
    const foundDocument = await CheckIn.findOne({ phoneNumber });
    console.log('Retrieved package status:', foundDocument);

    if (!foundDocument) {
      console.log('Document not found in the database.');
      return res.status(404).json({ error: 'Package not found' });
    }

    const packageStatus = foundDocument.status;

    res.status(200).json({ status: packageStatus });
  } catch (error) {
    console.error('Error fetching package status:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
