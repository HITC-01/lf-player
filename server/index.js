const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('../database/controllers');

const app = express();

// Parse body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`INCOMING ${req.method} from ${req.originalUrl}`);
  next();
});

// Send out static files
app.use(express.static(path.join(__dirname, '../public')));

// Get request for song data
app.get('/songs/:song', (req, res) => {
  const { song } = req.params;
  db.getSong(song)
    .then((songData) => {
      res.status(200).send(JSON.stringify({ data: songData[0] }));
    })
    .catch((err) => {
      res.status(500).send(`Error connecting to server: ${err}`);
    });
});

app.get('/songs/:song/songProfile', (req, res) => {
  const { song } = req.params;
  db.getSoundProfile(song)
    .then((songProfile) => {
      res.status(200).send(JSON.stringify({ data: songProfile[0] }));
    })
    .catch((err) => {
      res.status(500).send(`Error connecting to server: ${err}`);
    });
});

// This is to return queries for comments sorted
app.get('/songs/:song/comments', (req, res) => {
  const song = req.query.song || '*';
  db.getComments(song)
    .then((comments) => {
      res.status(200).send(JSON.stringify({ data: comments }));
    })
    .catch((err) => {
      res.status(500).send(`Error connecting to server: ${err}`);
    });
});

app.listen(process.env.PORT || 3004);
