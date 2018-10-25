#!/bin/bash
NSONGS=1  # number of songs
NCOMMENTS=2
NARTISTS=4
MYSQL_EXEC=``

# images
ALBUM_IMGS=($(ls ../../public/assets/media/album*))
for i in `seq 1 ${#ALBUM_IMGS[@]}`
do
  ALBUM_IMGS[$((i - 1))]=`echo ${ALBUM_IMGS[$((i - 1))]} | sed "s/\.\.\/\.\.//"`
done

USER_IMGS=($(ls ../../public/assets/media/user*))
for i in `seq 1 ${#USER_IMGS[@]}`
do
  USER_IMGS[$((i - 1))]=`echo ${USER_IMGS[$((i - 1))]} | sed "s/\.\.\/\.\.//"`
done

# songs
SONG_LINKS=($(ls ../../public/assets/media/song*))
for i in `seq 1 ${#SONG_LINKS[@]}`
do
  SONG_LINKS[$((i - 1))]=`echo ${SONG_LINKS[$((i - 1))]} | sed "s/\.\.\/\.\.//"`
done

# name file details
NAME_FILE='names.txt'
NNAMES=`wc -l < $NAME_FILE`

# lorem ipsum file
LOREM_FILE='loremIpsum.txt'
NWORDS=`wc -w < $LOREM_FILE`

# example sql file
INSERT_FILE='example.sql'
ARTIST_LINE=1
SONG_LINE=2
COMMENT_LINE=3
PROFILE_LINE=4

ARTIST_INSERT=`sed "${ARTIST_LINE}q;d" ${INSERT_FILE}`
SONG_INSERT=`sed "${SONG_LINE}q;d" ${INSERT_FILE}`
COMMENT_INSERT=`sed "${COMMENT_LINE}q;d" ${INSERT_FILE}`
PROFILE_INSERT=`sed "${PROFILE_LINE}q;d" ${INSERT_FILE}`

ARTISTS_ORDERED=($(cat $NAME_FILE))
ARTISTS=()

# Function to check if item already exists in array
function checkArray
{
  for item in ${dest[@]}
  do
    [[ "$item" == "$1" ]] && return 0
  done
  return 1 # Not found
}

while [ "${#ARTISTS[@]}" -ne "${#ARTISTS_ORDERED[@]}" ]
do
  rand=$[ $RANDOM % ${#ARTISTS_ORDERED[@]} ]
  checkArray "${ARTISTS_ORDERED[$rand]}" || ARTISTS=(${ARTISTS[@]} "${ARTISTS_ORDERED[$rand]}")
done

for i in `seq 1 $NARTISTS`;
do
  idx=$((i - 1))
  # generate NARTISTS artists
  # assign each one a sequential ID
  # assign each one an imageURL
  NAME="${ARTISTS[(($idx * 2))]} ${ARTISTS[(($idx * 2 + 1))]}";
  echo "here is $NAME"

done

for i in `seq 1 $NSONGS`;
do
  echo $i
  # generate song title
  # duration
  # artist id number from range NARTISTS
  # assign each one an imageURL
  # give it an album name
  # give it a tag
  # generate date when added
  # give it a color scheme: grey, red

  # generate comments
  # generate comment text
  # assign to artist_id from range NARTISTS
  # assign to song_id from range NSONGS
  # generate number 0 - 100 for song placement

  # profile
  # give it a height range 120-150
  # give it song_id
  # make it a profile with heights from 0- height max

done
