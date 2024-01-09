const mongoose = require("mongoose");


const checkInSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  customerName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  idNumber: { type: String, required: true },
  pickupPoint: { type: String, required: true },
  dropoffPoint: { type: String, required: true },
  itemType: { type: String, enum: ["fragile", "not-fragile"], required: true },
  description: { type: String, required: true },
  vehicleType: {
    type: String,
    enum: ["pick-up", "bike", "bicycle", "transit"],
    required: true,
  },
  driverAssigned: { type: String, required: true },
  expectedDeliveryDate: { type: Date, required: true },
  status: {
    type: String,
    enum: ["pending", "onroute", "delivered"],
    default: "pending",
  },
},
{timestamps:true,});

const CheckIn = mongoose.model("CheckIn", checkInSchema);

module.exports = CheckIn;