const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');

const mongoose = require('mongoose');

const graphqlSchema = require('./graphql/schema/schema');
const graphqlResolvers = require('./graphql/resolvers/resolvers');
const isAuth = require('./middleware/is-auth');

const app = express();

app.use(bodyParser.json());

app.use(isAuth);

app.use(
  '/graphql',
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true,
  })
);

mongoose
  .connect('mongodb://localhost:27017')
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });

// // Import required modules
// const express = require('express');
// const bodyParser = require('body-parser');

// const mongoose = require('mongoose');
// const { graphqlHTTP } = require('express-graphql');
// const schema = require('./graphql/schema');

// const multer = require('multer');

// const bcrypt = require('bcrypt');
// const cors = require('cors');

// const User = require('./models/User');
// const Game = require('./models/Game');
// const Course = require('./models/Course');
// const Enrollment = require('./models/Enrollment');

// const fs = require('fs');
// const path = require('path');

// // Create an Express app
// const app = express();

// app.use(bodyParser.json({ limit: '10mb' }));
// app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// app.use(cors());

// // Middleware
// // Specify the path where you want to create the 'uploads' directory
// const uploadsPath = path.join(__dirname, 'uploads');

// // Check if the directory exists, and create it if it doesn't
// if (!fs.existsSync(uploadsPath)) {
//   fs.mkdirSync(uploadsPath);
// }

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' + file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // Connect to MongoDB using Mongoose
// mongoose.connect('mongodb://localhost:27017', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// mongoose.connection.on('connected', () => {
//   console.log('Connected to MongoDB');
// });

// mongoose.connection.on('error', (err) => {
//   console.error('Error connecting to MongoDB:', err);
// });

// app.use(
//   '/graphql',
//   graphqlHTTP({
//     schema: graphqlSchema,
//     rootValue: graphql,
//     graphiql: true, // Enable the GraphQL interactive interface
//   })
// );

// // Route for user login
// app.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Find the user by email
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Compare the provided password with the stored hashed password
//     bcrypt
//       .hash(password, 10)
//       .then((hash) => {})
//       .catch((err) => console.error(err.message));

//     const passwordMatch = await bcrypt.compareSync(password, user.password);

//     if (!passwordMatch) {
//       return res.status(401).json({ message: 'Invalid password' });
//     }

//     // Password is correct, user is authenticated
//     res.json({ message: 'Login successful', user: user });
//   } catch (error) {
//     console.error('Error during login:', error);
//     res.status(500).json({ message: 'An error occurred' });
//   }
// });

// // Route for user register
// app.post('/register', upload.single('profilePic'), async (req, res) => {
//   const { name, email, password, accountType, country, stateProvince, school } =
//     req.body;

//   const { profilePic } = req.file.filename;

//   console.log(req.file.filename);
//   try {
//     // Check if the user with the same email already exists
//     const existingUser = await User.findOne({ email });

//     if (existingUser) {
//       return res.status(409).json({ message: 'Email already in use' });
//     }

//     // Create a new user
//     const newUser = new User({
//       name: name,
//       email: email,
//       password: password,
//       accountType: accountType,
//       country: country,
//       stateProvince: stateProvince,
//       school: school,
//       profilePic: req.file.filename,
//     });

//     await newUser.save();

//     res
//       .status(201)
//       .json({ message: 'User registered successfully', user: newUser });
//   } catch (error) {
//     // console.error('Error during registration:', error);
//     res.status(500).json({ message: 'An error occurred' });
//   }
// });

// // Route for fetching user by id
// app.get('/fetchUsers/:userId', async (req, res) => {
//   try {
//     const userId = req.params.userId;

//     if (!mongoose.Types.ObjectId.isValid(userId)) {
//       return res.status(400).json({ message: 'Invalid user ID' });
//     }

//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     res.status(201).json({ message: 'User fetched', user: user });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: 'Server error' });
//   }
// });

// // Route for fetching games
// app.get('/fetchGames', async (req, res) => {
//   try {
//     const games = await Game.find();
//     res.status(201).json({ message: 'Games fetched', games: games });
//   } catch (error) {
//     console.error('Error fetching games:', error);
//     res.status(500).json({ message: 'An error occurred fetching games' });
//   }
// });

// // Route for fetching courses
// // app.get('/fetchCourses', async (req, res) => {
// //   try {
// //     const courses = await Course.find();
// //     console.log(courses);
// //     res.status(201).json({ message: 'Courses fetched', courses: courses });
// //   } catch (error) {
// //     console.error('Error fetching courses:', error);
// //     res.status(500).json({ message: 'An error occurred fetching courses' });
// //   }
// // });

// // Route for fetching enrollments
// app.get('/fetchEnrollments', async (req, res) => {
//   try {
//     const enrollments = await Enrollment.find();
//     console.log(enrollments);
//     res
//       .status(201)
//       .json({ message: 'Enrollments fetched', enrollments: enrollments });
//   } catch (error) {
//     console.error('Error fetching enrollments:', error);
//     res.status(500).json({ message: 'An error occurred fetching enrollments' });
//   }
// });

// // Start the server
// const port = 5000;
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
