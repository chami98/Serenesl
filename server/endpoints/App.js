const express = require('express');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');
const serviceAccount = require('./serviceAccountKey.json');
const app = express();
const cors = require('cors');
app.use(bodyParser.json());
app.use(cors());

const hospitalCategorization = require('./hospitalCategorization')
const touristDestinations = require('./functions/touristDestinations')
const itineraryData = require('./itineraryData')
const treatmentPlanData = require('./treatmentPlanData');
const tf = require('@tensorflow/tfjs-node');



// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Signup endpoint
app.post('/signup', async (req, res) => {
  try {
    let { name, email, password, country, hospitalName, location } = req.body;
    let accountType;

    // Check if accountType is provided in query parameter
    if (!req.query.accountType) {
      console.log('Missing accountType query parameter');
      return res.status(400).json({ error: 'Missing accountType query parameter' });
    }

    // Trim whitespace characters from accountType value
    accountType = req.query.accountType.trim();

    if (accountType !== 'tourist' && accountType !== 'hospital') {
      console.log('Invalid accountType query parameter');
      return res.status(400).json({ error: 'Invalid accountType query parameter. It must be either "tourist" or "hospital"' });
    }

    // Ensure required fields for each account type
    if (accountType === 'tourist') {
      if (!name || !email || !password || !country) {
        return res.status(400).json({ error: 'Missing required fields for tourist account' });
      }
      // Remove hospital specific fields
      hospitalName = undefined;
      location = undefined;
    } else if (accountType === 'hospital') {
      if (!hospitalName || !email || !password || !location) {
        return res.status(400).json({ error: 'Missing required fields for hospital account' });
      }
      // Remove tourist specific fields
      name = undefined;
      country = undefined;
    }

    // Create user with email and password
    const userRecord = await admin.auth().createUser({
      email: email,
      password: password,
      displayName: accountType === 'hospital' ? hospitalName : name
    });

    // Create user data object
    const userData = {
      uid: userRecord.uid,
      email: email,
      accountType: accountType
    };

    // Add optional fields if they are defined
    if (name) userData.name = name;
    if (country) userData.country = country;
    if (hospitalName) userData.hospitalName = hospitalName;
    if (location) userData.location = location;

    // Save user details to database
    await admin.firestore().collection('users').doc(userRecord.uid).set(userData);

    // User created successfully
    res.status(201).json({ message: 'User signed up successfully', user: userData });
  } catch (error) {
    // Error handling
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to signup user' });
  }
});

const loadModel = async () => {
  const model = await tf.loadLayersModel('model.json');
  return model;
};


app.get('/hospitalRecommendation', async (req, res) => {
  try {

    const model = await loadModel();


    const { categories } = req.query;

    if (!categories) {
      return res.status(400).json({ error: 'Categories are required' });
    }

    const categoryList = categories.split(',');


    const hospitalNames = categoryList.flatMap(category =>
      hospitalCategorization.hospitals[category].map(hospital => hospital.name)
    );
    const hospitalIndices = tf.oneHot(tf.tensor1d(hospitalNames.map(() => categories.indexOf(category))), categories.length);


    const predictions = model.predict(hospitalIndices).dataSync();
    const recommendedCategories = predictions.map(index => categories[index]);


    const recommendedHospitals = {};
    recommendedCategories.forEach(category => {
      if (hospitalCategorization.hospitals[category]) {
        recommendedHospitals["Hospitals"] = hospitalCategorization.hospitals[category];
      }
    });


    const wellnessCenter = hospitalCategorization.wellness_centers[Math.floor(Math.random() * hospitalCategorization.wellness_centers.length)];
    const ayurvedaHospital = hospitalCategorization.ayurveda_hospitals[Math.floor(Math.random() * hospitalCategorization.ayurveda_hospitals.length)];


    recommendedHospitals["WellnessCenter"] = wellnessCenter;
    recommendedHospitals["AyurvedaHospital"] = ayurvedaHospital;

    res.json(recommendedHospitals);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/itinerary', async (req, res) => {
  try {

    const model = await loadModel();


    const inputs = itineraryData.map(data => {
      const feature = [];
      feature.push(data.morning ? 1 : 0);
      feature.push(data.afternoon ? 1 : 0);
      feature.push(data.evening ? 1 : 0);
      return feature;
    });

    const predictions = model.predict(tf.tensor2d(inputs)).dataSync();
    const nextItineraryIndex = Array.from(predictions).indexOf(Math.max(...predictions));
    const nextItinerary = itineraryData[nextItineraryIndex];

    res.json(nextItinerary);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/treatmentPlan/:condition', async (req, res) => {
  try {

    const model = await loadModel();


    const { condition } = req.params;


    const prediction = model.predict(condition);


    res.json(prediction);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
