CREATE DATABASE IF NOT EXISTS soundcloud;
USE soundcloud;

-- ---
-- Table 'comments'
--
-- ---

DROP TABLE IF EXISTS `comments`;

CREATE TABLE `comments` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `song_id` INTEGER NULL DEFAULT NULL,
  `artist_id` INTEGER NULL DEFAULT NULL,
  `text` VARCHAR(150) NULL DEFAULT NULL,
  `time` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'sound_profiles'
-- Profile of the sound of each song
-- ---

DROP TABLE IF EXISTS `sound_profiles`;

CREATE TABLE `sound_profiles` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `song_id` INTEGER NULL DEFAULT NULL,
  `height` INTEGER NULL DEFAULT NULL,
  `width` INTEGER NULL DEFAULT 1000,
  `profile` VARCHAR(4000) NULL DEFAULT NULL COMMENT 'This field is a string of the profile with comma separated v',
  PRIMARY KEY (`id`)
) COMMENT 'Profile of the sound of each song';


-- ---
-- Table 'songs'
--
-- ---

DROP TABLE IF EXISTS `songs`;

CREATE TABLE `songs` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(70) NULL DEFAULT NULL,
  `artist_id` INTEGER NULL DEFAULT NULL,
  `duration` INT NULL DEFAULT NULL COMMENT 'Duration of song in seconds',
  `album_imageUrl` VARCHAR(200) NULL DEFAULT NULL,
  `tag` VARCHAR(20) NULL DEFAULT NULL,
  `album` VARCHAR(40) NULL DEFAULT NULL,
  `song_added` DATE NULL DEFAULT NULL,
  `background_color` VARCHAR(6) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'artists'
--
-- ---

DROP TABLE IF EXISTS `artists`;

CREATE TABLE `artists` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(20) NULL DEFAULT NULL,
  `artist_imageUrl` VARCHAR(200) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys
-- ---

ALTER TABLE `songs` ADD FOREIGN KEY (artist_id) REFERENCES `artists` (`id`);
ALTER TABLE `comments` ADD FOREIGN KEY (song_id) REFERENCES `songs` (`id`);
ALTER TABLE `comments` ADD FOREIGN KEY (artist_id) REFERENCES `artists` (`id`);
ALTER TABLE `sound_profiles` ADD FOREIGN KEY (song_id) REFERENCES `songs` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `songs` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `comments` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `sound_profiles` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `artists` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `artists` (`name`, `artist_imageUrl`) VALUES
-- ('','');
-- INSERT INTO `songs` (`title`,`artist_id`,`duration`,`album_imageUrl`,`tag`,`album`,`song_added`,`background_color`) VALUES
-- ('',1,0,'','','',UTC_DATE(),'');
-- INSERT INTO `comments` (`song_id`,`artist_id`,`text`,`time`) VALUES
-- (1,1,'',0);
-- INSERT INTO `sound_profiles` (`song_id`,`height`,`width`,`profile`) VALUES
-- (1,10,5,'');
