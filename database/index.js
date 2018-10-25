const mysql = require('promise-mysql');

const connection = mysql.createPool({
  user: 'root',
  database: 'soundcloud',
});

module.exports.getSong = (songId) => {
  const queryString = `SELECT * FROM songs WHERE \`id\` = "${songId}";`;
  return connection.query(queryString);
};

module.exports.getArtist = (artistId) => {
  const queryString = `SELECT * FROM artists WHERE \`id\` = "${artistId}";`;
  return connection.query(queryString);
};

module.exports.getComments = (songId) => {
  const queryString = `SELECT * FROM comments WHERE \`song_id\` = "${songId}";`;
  return connection.query(queryString);
};

module.exports.getSoundProfile = (songId) => {
  const queryString = `SELECT * FROM sound_profiles WHERE \`id\` = "${songId}";`;
  return connection.query(queryString);
};
