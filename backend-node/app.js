const express = require('express');
var bodyParser = require("body-parser");

const app = express();
const cors = require('cors');
app.use(cors());

app.use(bodyParser.json({ limit: '50mb' }));

app.use(express.json());
require('./connection.db'); // Use database connection

const contactform = require('./routes/form.routes');
app.use('/api/form', contactform)

// listening server on port ...
try {
    app.listen(process.env.APP_PORT, function () {
        console.log('App listening on port!', process.env.APP_PORT);
    });
} catch (error) {
    console.error(error);
}