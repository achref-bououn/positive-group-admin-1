const http = require('http');
const app = require('./app');
// const { port } = require('./src/server.config');

// Importing Routes
const coursesRoutes = require('./src/routes/courses.route');
const categoriesRoutes = require('./src/routes/categories.route');

// Using Routes
app.use('/courses', coursesRoutes)
app.use('/categories', categoriesRoutes)

const port = process.env.PORT || '8000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, function () {
    console.info(`Server is up and running on port ${port}`)
});