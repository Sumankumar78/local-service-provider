const express = require('express');
const path = require('path');

// 1. Initialize app FIRST (Moved this up)
const app = express();
const PORT = process.env.PORT || 3000;

// 2. Define your data
const providers = [
  {
    id: 1,
    name: 'Ravi Kumar',
    service: 'Electrician',
    rating: 4.8,
    reviews: 120,
    distanceKm: 2.1,
    etaMinutes: 20,
    priceFrom: 350,
    priceUnit: 'visit',
    budgetLevel: 'low',
    lat: 12.975,
    lng: 77.603
  },
  {
    id: 2,
    name: 'Anita Sharma',
    service: 'Plumber',
    rating: 4.9,
    reviews: 85,
    distanceKm: 3.5,
    etaMinutes: 30,
    priceFrom: 400,
    priceUnit: 'visit',
    budgetLevel: 'medium',
    lat: 12.965,
    lng: 77.59
  },
  {
    id: 3,
    name: 'Vikas Singh',
    service: 'Driver',
    rating: 4.7,
    reviews: 60,
    distanceKm: 1.2,
    etaMinutes: 10,
    priceFrom: 250,
    priceUnit: 'trip',
    budgetLevel: 'low',
    lat: 12.98,
    lng: 77.61
  },
  {
    id: 4,
    name: 'Meena Crafts',
    service: 'Carpenter',
    rating: 4.5,
    reviews: 15,
    distanceKm: 4.0,
    etaMinutes: 35,
    priceFrom: 500,
    priceUnit: 'visit',
    budgetLevel: 'high',
    lat: 12.96,
    lng: 77.58
  }
];

// 3. NOW use middleware (after app is initialized)
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/providers', (req, res) => {
  let result = [...providers];
  const { service, maxDistanceKm, budget } = req.query;

  if (service) result = result.filter(p => p.service.toLowerCase() === service.toLowerCase());
  if (maxDistanceKm) result = result.filter(p => p.distanceKm <= Number(maxDistanceKm));
  if (budget) result = result.filter(p => p.budgetLevel === budget);

  res.json(result);
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));