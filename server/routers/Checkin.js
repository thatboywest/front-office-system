const express = require("express");
const bodyParser = require("body-parser");

const router = express.Router();
const CheckIn = require("../models/CheckInSchema");
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post("/", async (req, res) => {
  try {
    const {
      date,
      customerName,
      phoneNumber,
      idNumber,
      pickupPoint,
      dropoffPoint,
      itemType,
      description,
      vehicleType,
      amountPaid,
      driverAssigned,
      expectedDeliveryDate,
    } = req.body;

    const checkIn = new CheckIn({
      date,
      customerName,
      phoneNumber,
      idNumber,
      pickupPoint,
      dropoffPoint,
      itemType,
      description,
      vehicleType,
      amountPaid,
      driverAssigned,
      expectedDeliveryDate,
    });

    const savedCheckIn = await checkIn.save();
    res.status(200).send(savedCheckIn);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send(error.message);
  }
});
router.put("/:id", async (req, res) => {
  try {
    const orderId = req.params.id;
    const { status } = req.body;

   
    const updatedCheckIn = await CheckIn.findByIdAndUpdate(orderId, { status }, { new: true });

    if (!updatedCheckIn) {
      return res.status(404).send("Check-in not found");
    }

    res.status(200).send(updatedCheckIn);
  } catch (error) {
    console.error('Error updating status:', error.message);
    res.status(500).send(error.message);
  }
});
// Get all check-ins for a specific user ID
router.get("/user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const checkIns = await CheckIn.find({ idNumber: userId });

    res.status(200).json(checkIns);
  } catch (error) {
    console.error('Error fetching check-ins for user:', error.message);
    res.status(500).json({ error: error.message });
  }
});


router.get("/", async (req, res) => {
  try {
    const checkIns = await CheckIn.find();
    res.status(200).send(checkIns);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send(error.message);
  }
});

module.exports = router;
