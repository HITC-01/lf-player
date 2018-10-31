const connection = require('./index.js');

// TODO: add songprofile in too
module.exports.getSong = (songId) => {
  const queryString = 'SELECT * FROM songs INNER JOIN artists WHERE songs.id = ? '
    + ' AND songs.artist_id = artists.id;';
  return connection.query(queryString, songId);
};

module.exports.getComments = (songId) => {
  const queryString = 'SELECT * FROM comments INNER JOIN artists WHERE comments.song_id = ? '
    + ' AND comments.artist_id = artists.id;';
  return connection.query(queryString, songId);
};

module.exports.getSoundProfile = (songId) => {
  const queryString = 'SELECT * FROM sound_profiles WHERE id = ? ';
  return connection.query(queryString, songId);
};
