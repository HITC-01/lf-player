// Player server
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const songRoute = require('./routes');

const app = express();

// middleware
app.use(cors());

app.use((req, res, next) => {
  console.log(`INCOMING ${req.method} from ${req.originalUrl}`);
  next();
});

// Send out static files
app.use('/', express.static(path.join(__dirname, '../public')));
app.use('/songs/:song', express.static(path.join(__dirname, '../public')));

// Send routes to router
app.use('/player', songRoute);

app.listen(process.env.PORT || 3004);
