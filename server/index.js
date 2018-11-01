require('dotenv').config();
const express = require('express');
const path = require('path');
const songRoute = require('./routes');

const app = express();

app.use((req, res, next) => {
  console.log(`INCOMING ${req.method} from ${req.originalUrl}`);
  next();
});

// Send out static files
app.use(express.static(path.join(__dirname, '../public')));

// Send routes to soundcloud
app.use('/sc', songRoute);

app.listen(process.env.PORT || 3004);
