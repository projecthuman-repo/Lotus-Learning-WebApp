// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const User = require('./models/User'); // Assuming you have a User model defined

// Create an Express app
const app = express();

app.use(cors());

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB using Mongoose
mongoose.connect('mongodb://localhost:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Error connecting to MongoDB:', err);
});

// Route for user login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare the provided password with the stored hashed password
    bcrypt
      .hash(password, 10)
      .then((hash) => {
        console.log('Hash ', hash);
      })
      .catch((err) => console.error(err.message));

    const passwordMatch = await bcrypt.compareSync(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Password is correct, user is authenticated
    res.json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
});

app.post('/register', async (req, res) => {
  const { name, email, password, accountType, country, stateProvince, school } =
    req.body;

  try {
    // Check if the user with the same email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: 'Email already in use' });
    }

    // Hash the password
    // bcrypt
    //   .hash(password, 10)
    //   .then((hash) => {
    //     console.log('Hash ', hash);
    //   })
    //   .catch((err) => console.error(err.message));

    // Create a new user
    const newUser = new User({
      name: name,
      email: email,
      password: password,
      accountType: accountType,
      country: country,
      stateProvince: stateProvince,
      school: school,
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
});

// Start the server
const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// // To connect with your mongoDB database
// const mongoose = require('mongoose');

// const connectToMongo = async () => {
//   await mongoose.connect('mongodb://localhost:27017');
//   console.log('Connected to MongoDB');
// };

// connectToMongo();
// // mongoose.connect(
// //   'mongodb://localhost:27017',
// //   {
// //     dbName: 'TestLotusLearning',
// //     useNewUrlParser: true,
// //     useUnifiedTopology: true,
// //   },
// //   (err) =>
// //     err ? console.log(err) : console.log('Connected to yourDB-name database')
// // );

// // Schema for users of app
// const UserSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   date: {
//     type: Date,
//     default: Date.now,
//   },
// });
// const User = mongoose.model('users', UserSchema);
// User.createIndexes();

// // For backend and express
// const express = require('express');
// const app = express();
// const cors = require('cors');
// console.log('App listen at port 5000');
// app.use(express.json());
// app.use(cors());
// app.get('/', (req, resp) => {
//   resp.send('App is Working');
//   // You can check backend is working or not by
//   // entering http://localhost:5000

//   // If you see App is working means
//   // backend working properly
// });

// app.post('/login', async (req, resp) => {
//   try {
//     const user = new User(req.body);
//     let result = await user.save();
//     result = result.toObject();
//     if (result) {
//       delete result.password;
//       resp.send(req.body);
//       console.log(result);
//     } else {
//       console.log('User already register');
//     }
//   } catch (e) {
//     resp.send('Something Went Wrong');
//   }
// });
// app.listen(5000);
