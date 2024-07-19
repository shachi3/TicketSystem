const express = require('express');
const router = express.Router();
const ZeroCard = require('../models/ZeroCards');
const Journey = require('../models/Journey');

const charges = {
 KID: 30,
 ADULT: 100,
 SENIOR_CITIZEN: 20,
};

// Create ZeroCard
router.post('/zerocard', async (req, res) => {
 const { cardNumber, balance } = req.body;

 try {
  const zeroCard = new ZeroCard({ cardNumber, balance });
  await zeroCard.save();
  res.json({ message: 'ZeroCard created', zeroCard });
 } catch (err) {
  res.status(500).json({ message: err.message });
 }
});

// Record Journey
router.post('/travel', async (req, res) => {
 const { cardNumber, passengerType, journeyType } = req.body;

 try {
  let zeroCard = await ZeroCard.findOne({ cardNumber });
  if (!zeroCard) {
   return res.status(404).json({ message: 'ZeroCard not found' });
  }

  let charge = charges[passengerType];
  if (journeyType === 'return') {
   charge /= 2;
  }

  if (zeroCard.balance < charge) {
   return res.status(400).json({ message: 'Insufficient balance' });
  }

  zeroCard.balance -= charge;
  await zeroCard.save();

  const journey = new Journey({ cardNumber, passengerType, journeyType });
  await journey.save();

  res.json({ message: 'Journey recorded', balance: zeroCard.balance });
 } catch (err) {
  res.status(500).json({ message: err.message });
 }
});

// Fetch Summary
router.get('/summary', async (req, res) => {
 try {
  const journeys = await Journey.find();
  const collectionSummary = { totalAmount: 0, totalDiscount: 0 };
  const passengerSummary = { KID: 0, ADULT: 0, SENIOR_CITIZEN: 0 };

  journeys.forEach(journey => {
   const charge = charges[journey.passengerType];
   if (journey.journeyType === 'return') {
    collectionSummary.totalAmount += charge / 2;
    collectionSummary.totalDiscount += charge / 2;
   } else {
    collectionSummary.totalAmount += charge;
   }

   passengerSummary[journey.passengerType]++;
  });

  res.json({ collectionSummary, passengerSummary });
 } catch (err) {
  res.status(500).json({ message: err.message });
 }
});

module.exports = router;
