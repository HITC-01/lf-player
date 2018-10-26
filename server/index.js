const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('../database');

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
      res.status(404).send(err);
    });
});

app.get('/songProfiles/:song', (req, res) => {
  const { song } = req.params;
  db.getSoundProfile(song)
    .then((songProfile) => {
      res.status(200).send(JSON.stringify({ data: songProfile[0] }));
    })
    .catch((err) => {
      res.status(404).send(err);
    });
});

// This is to return queries for comments sorted
app.get('/comments', (req, res) => {
  const song = req.query.song || '*';
  db.getComments(song)
    .then((comments) => {
      res.status(200).send(JSON.stringify({ data: comments }));
    })
    .catch((err) => {
      res.status(404).send(err);
    });
});

app.get('/artists', (req, res) => {
  const ids = req.query.id || '*';
  console.log('this is my query', req.query.id);
  db.getArtists(ids)
    .then((artists) => {
      res.status(200).send(JSON.stringify({ data: artists }));
    })
    .catch((err) => {
      res.status(404).send(err);
    });
});

app.listen(process.env.PORT || 3004);
