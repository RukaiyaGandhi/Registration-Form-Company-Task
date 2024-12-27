require("dotenv").config(); // Load environment variables from .env

const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// MySQL Database Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.connect((err) => {
    if (err) throw err;
    console.log("Database connected!");
});

// Register User Endpoint
app.post("/register", async (req, res) => {
    const { firstName, lastName, mobileNumber, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const query = `CALL CreateUser(?, ?, ?, ?, 'admin');`;

    db.query(query, [firstName, lastName, mobileNumber, passwordHash], (err) => {
        if (err) return res.status(500).send(err.message);
        res.send("User Registered Successfully!");
    });
});

// Login Endpoint
app.post("/login", async (req, res) => {
    const { mobileNumber, password } = req.body;
    const query = `CALL GetUser(?);`;

    db.query(query, [mobileNumber], async (err, results) => {
        if (err || results[0].length === 0) {
            return res.status(401).send("User not found");
        }

        const user = results[0][0];
        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

        if (!isPasswordValid) return res.status(401).send("Invalid credentials");

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({
            token,
            message: `Good ${getTimeOfDay()}, ${user.firstName} ${user.lastName}`,
        });
    });
});

// Helper Function: Time of Day
const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Morning";
    if (hour < 18) return "Afternoon";
    return "Evening";
};

// Start Server
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});



/* const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const app = express();
app.use(bodyParser.json());

// Create a connection to the MySQL database
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // Change this if you're using a different MySQL user
  password: "", // Your MySQL password
  database: "Equip9", // Make sure the database "Equip9" exists
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to the database!");
});

// Register a new user
app.post("/register", async (req, res) => {
  const { firstName, lastName, mobileNumber, password } = req.body;
  
  // Hash the password before storing it
  const passwordHash = await bcrypt.hash(password, 10);
  
  // Insert user into the database using a stored procedure
  const query = `CALL CreateUser(?, ?, ?, ?, 'admin');`;
  db.query(query, [firstName, lastName, mobileNumber, passwordHash], (err) => {
    if (err) {
      res.status(500).send({ error: err.message });
    } else {
      res.send("User Registered!");
    }
  });
});

// Login user and issue JWT token
app.post("/login", async (req, res) => {
  const { mobileNumber, password } = req.body;

  const query = `CALL GetUser(?);`;
  db.query(query, [mobileNumber], async (err, results) => {
    if (err || results[0].length === 0) {
      return res.status(401).send("User not found");
    }
    
    const user = results[0][0];
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    
    if (!isPasswordValid) {
      return res.status(401).send("Invalid password");
    }

    // Create JWT token
    const token = jwt.sign({ id: user.id }, "secretKey", { expiresIn: "1h" });

    // Respond with token and a personalized greeting
    const greeting = getGreetingBasedOnTimeOfDay();
    res.json({
      token,
      message: `Good ${greeting}, ${user.firstName} ${user.lastName}`,
    });
  });
});

// Get user data based on mobile number
app.get("/user/:mobileNumber", (req, res) => {
  const query = `CALL GetUser(?);`;
  db.query(query, [req.params.mobileNumber], (err, results) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.json(results[0]);
    }
  });
});

// Utility function to determine time of day for greeting
const getGreetingBasedOnTimeOfDay = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Morning";
  if (hour < 18) return "Afternoon";
  return "Evening";
};
// Load environment variables from the .env file
require("dotenv").config();

// Access the environment variables
const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const PORT = process.env.PORT || 5000;

// Start the Express server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
const express = require("express");
const userRoutes = require("./routes/userRoutes");
require("dotenv").config();

const app = express();
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);

// Default route for root
app.get("/", (req, res) => {
  res.send("Welcome to the Equip9 Backend!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(Server running on http://localhost:${PORT});
});
 *//* 
require("dotenv").config(); // Load .env variables

const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const app = express();
app.use(bodyParser.json());

// Create a connection to the MySQL database using environment variables
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to the database!");
});

// Register a new user
app.post("/register", async (req, res) => {
  const { firstName, lastName, mobileNumber, password } = req.body;

  // Hash the password before storing it
  const passwordHash = await bcrypt.hash(password, 10);

  // Insert user into the database using a stored procedure
  const query = `CALL CreateUser(?, ?, ?, ?, 'admin');`;
  db.query(query, [firstName, lastName, mobileNumber, passwordHash], (err) => {
    if (err) {
      res.status(500).send({ error: err.message });
    } else {
      res.send("User Registered!");
    }
  });
});
// Login user and issue JWT token
app.post("/login", async (req, res) => {
  const { mobileNumber, password } = req.body;

  const query = `CALL GetUser(?);`;
  db.query(query, [mobileNumber], async (err, results) => {
    if (err || results[0].length === 0) {
      return res.status(401).send("User not found");
    }

    const user = results[0][0];
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      return res.status(401).send("Invalid password");
    }

    // Create JWT token using the secret key from .env
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });

    // Respond with token and a personalized greeting
    const greeting = getGreetingBasedOnTimeOfDay();
    res.json({
      token,
      message: `Good ${greeting}, ${user.firstName} ${user.lastName}`,
    });
  });
});

// Get user data based on mobile number
app.get("/user/:mobileNumber", (req, res) => {
  const query = `CALL GetUser(?);`;
  db.query(query, [req.params.mobileNumber], (err, results) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.json(results[0]);
    }
  });
});

// Utility function to determine time of day for greeting
const getGreetingBasedOnTimeOfDay = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Morning";
  if (hour < 18) return "Afternoon";
  return "Evening";
};

// Start the Express server using the PORT from .env
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
 */