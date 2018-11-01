const express = require('express');
const db = require('../database/controllers');

const router = express.Router();

const queryAll = ({ type }) => ((req, res) => {
  const { song } = req.params;
  const dbQuery = (type === 'comments') ? db.getComments : db.getSong;

  dbQuery(song)
    .then((dbData) => {
      const returnData = (type === 'comments') ? dbData : dbData[0];
      res.status(200).send(JSON.stringify({ data: returnData }));
    })
    .catch((err) => {
      res.status(500).send(`Error connecting to DB: ${err}`);
    });
});

router.get('/songs/:song', queryAll({ type: 'song' }));
router.get('/songs/:song/comments', queryAll({ type: 'comments' }));

module.exports = router;
