require("dotenv")

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');

const errorHandler = require('./src/middlewares/errorHandler');
const unhandledRequests = require('./src/middlewares/unhandledRequests')
const authenticateToken = require("./src/middlewares/authenticateToken")

// Using middlewares to all the requests
app.use(bodyParser.urlencoded({ limit: '9999999999999999', extended: false }));
app.use(bodyParser.json({ limit: '9999999999999999' }));
app.use(morgan('dev'))

/*
  Using Cross Origin middelware
**/

// app.all('/*', (req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'X-Requested-With');
//   next();
// });

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});


/* 
  Importing Routes
**/

const coursesRoutes = require("./src/routes/courses.routes");
const categoriesRoutes = require("./src/routes/categories.routes");
const adminRoutes = require("./src/routes/admin.routes");
const chapterRoutes = require("./src/routes/chapters.routes");
const userRoutes = require("./src/routes/users.routes");
const authRoutes = require("./src/routes/auth.routes");

/*
  Using Routes
**/

app.use("/api/courses", coursesRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/admin", authenticateToken, adminRoutes);
app.use("/api/chapters", chapterRoutes);
app.use("/api/users", userRoutes)
app.use("/api/auth", authRoutes)

/**
 * Static
 */

const _clientDir = "client/dist/ng/browser";


app.use('/', express.static(path.resolve(__dirname, `${_clientDir}/`)));

/**
 * Spa Res Sender
 */
const renderIndex = (req, res) => {
  res.sendFile(path.resolve(__dirname, `${_clientDir}/index.html`));
};

/**
 * Prevent server routing and use @ng2-router.
 */
app.get('/*', renderIndex);


// Returning a 404 not found error for unsupported endpoints
app.use(unhandledRequests);
app.use(errorHandler)

module.exports = app;