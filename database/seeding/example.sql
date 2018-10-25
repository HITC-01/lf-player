INSERT INTO `artists` (`name`, `artist_imageUrl`) VALUES ('NAME','ARTIST_IMAGEURL');
INSERT INTO `songs` (`title`,`artist_id`,`duration`,`album_imageUrl`,`tag`,`album`,`song_added`,`background_color`) VALUES ('TITLE',ARTIST_ID,DURATION,'ALBUM_IMAGEURL','TAG','ALBUM',UTC_DATE(),'HEX');
INSERT INTO `comments` (`song_id`,`artist_id`,`text`,`time`) VALUES (SONG_ID,ARTIST_ID,LOREM,COMMENT_TIME);
INSERT INTO `sound_profiles` (`song_id`,`height`,`width`,`profile`) VALUES (SONG_ID,HEIGHT,WIDTH,PROFILE);
