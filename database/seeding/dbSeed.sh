#!/bin/bash
NSONGS=100  # number of songs
NCOMMENTS=1000
NARTISTS=200
MYSQL_EXEC="/usr/local/Cellar/mysql\@5.7/5.7.23/bin/mysql"

GENRES=('Alternative' 'Blues' 'Classical' 'Country'
  'Dance' 'Easy Listening' 'Electronic' 'European'
  'Hip Hop' 'Rap' 'Indie Pop' 'Inspirational' 'Asian Pop'
  'Jazz' 'Latin' 'New Age' 'Opera' 'Pop' 'RnB' 'Soul' 'Reggae'
  'Rock' 'Singer-Songwriter' 'Folk' 'World');
COLORS=('grey' 'red');

# this is the seeded data file
rm -rf dataSeeded.sql
echo "USE soundcloud_player;" > dataSeeded.sql

# images
ALBUM_IMGS=($(ls ../../public/assets/media/album*))
for i in `seq 1 ${#ALBUM_IMGS[@]}`
do
  ALBUM_IMGS[$((i - 1))]=`echo ${ALBUM_IMGS[$((i - 1))]} | sed "s/\.\.\/\.\.\/public//"`
done

USER_IMGS=($(ls ../../public/assets/media/user*))
for i in `seq 1 ${#USER_IMGS[@]}`
do
  USER_IMGS[$((i - 1))]=`echo ${USER_IMGS[$((i - 1))]} | sed "s/\.\.\/\.\.\/public//"`
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
  NAME="${ARTISTS[(($idx * 2))]} ${ARTISTS[(($idx * 2 + 1))]}";
  INSERT=`echo $ARTIST_INSERT | sed "s/NAME/${NAME}/"`
  IMG=$((RANDOM % ${#USER_IMGS[@]}))
  IMG="${USER_IMGS[${IMG}]//\//\\/}"
  INSERT=`echo $INSERT | sed 's/ARTIST_IMAGEURL/'"${IMG}"'/'`
  echo $INSERT >> dataSeeded.sql
done

for i in `seq 1 $NSONGS`;
do
  idx=$((RANDOM % 4 + 1))
  TITLE=''
  for j in `seq 1 $idx` ;
  do
    WORD=`cat $LOREM_FILE | awk '{print $'"$((RANDOM % NWORDS))"'}'`
    TITLE=`echo "$TITLE $WORD"`
  done
  TITLE=`echo $TITLE | sed "s/^ //"`

  CHAR=${#TITLE}
  if [ "$CHAR" -gt "69" ]; then
    TITLE=${TITLE:0:69}
  fi

  idx=$((RANDOM % 4 + 1))
  ALBUM=''
  for j in `seq 1 $idx` ;
  do
    WORD=`cat $LOREM_FILE | awk '{print $'"$((RANDOM % NWORDS))"'}'`
    ALBUM=`echo "$ALBUM $WORD"`
  done
  ALBUM=`echo $ALBUM | sed "s/^ //"`

  CHAR=${#ALBUM}
  if [ "$CHAR" -gt "39" ]; then
    ALBUM=${ALBUM:0:39}
  fi

  DURATION=$((RANDOM % 100 + 180))
  ARTIST_ID=$((RANDOM % NARTISTS + 1))

  GENRE=$((RANDOM % ${#GENRES[@]}))
  GENRE="${GENRES[${GENRE}]}"

  COLOR=$((RANDOM % ${#COLORS[@]}))
  COLOR="${COLORS[${COLOR}]}"

  IMG=$((RANDOM % ${#ALBUM_IMGS[@]}))
  IMG="${ALBUM_IMGS[${IMG}]//\//\\/}"

  INSERT=`echo $SONG_INSERT | sed "s/TITLE/${TITLE}/"`
  INSERT=`echo $INSERT | sed 's/ARTIST_ID/'"${ARTIST_ID}"'/'`
  INSERT=`echo $INSERT | sed "s/DURATION/${DURATION}/"`
  INSERT=`echo $INSERT | sed 's/ALBUM_IMAGEURL/'"${IMG}"'/'`
  INSERT=`echo $INSERT | sed "s/TAG/${GENRE}/"`
  INSERT=`echo $INSERT | sed 's/ALBUM/'"${ALBUM}"'/'`
  INSERT=`echo $INSERT | sed "s/HEX/${COLOR}/"`
  echo $INSERT >> dataSeeded.sql
done

RANDOM=`date +"%s"`

for i in `seq 1 $NCOMMENTS`;
do
  idx=$((RANDOM % 7 + 1))
  COMMENT=''
  for j in `seq 1 $idx` ;
  do
    WORD=`cat $LOREM_FILE | awk '{print $'"$((RANDOM % NWORDS))"'}'`
    COMMENT=`echo "$COMMENT $WORD"`
  done
  COMMENT=`echo $COMMENT | sed "s/^ //"`

  CHAR=${#COMMENT}
  if [ "$CHAR" -gt "149" ]; then
    COMMENT=${COMMENT:0:149}
  fi

  ARTIST_ID=$((RANDOM % NARTISTS + 1))
  SONG_ID=$((RANDOM % NSONGS + 1))
  COMMENT_TIME=$((RANDOM % 100))

  INSERT=`echo $COMMENT_INSERT | sed "s/SONG_ID/${SONG_ID}/"`
  INSERT=`echo $INSERT | sed "s/ARTIST_ID/${ARTIST_ID}/"`
  INSERT=`echo $INSERT | sed "s/LOREM/${COMMENT}/"`
  INSERT=`echo $INSERT | sed "s/COMMENT_TIME/${COMMENT_TIME}/"`
  echo $INSERT >> dataSeeded.sql
done

for i in `seq 1 $NSONGS`;
do
  HEIGHT=$((RANDOM % 20 + 100))
  NCOLS=1000
  PROFILE=''
  for j in `seq 1 $NCOLS` ;
  do
    VAL="$((RANDOM % $HEIGHT + 20)),"
    PROFILE=`echo "${PROFILE}${VAL}"`
  done
  PROFILE=`echo $PROFILE | sed "s/^ //"`

  INSERT=`echo $PROFILE_INSERT | sed "s/HEIGHT/${HEIGHT}/"`
  INSERT=`echo $INSERT | sed "s/SONG_ID/${i}/"`
  INSERT=`echo $INSERT | sed "s/WIDTH/1000/"`
  INSERT=`echo $INSERT | sed "s/PROFILE/${PROFILE}/"`
  echo $INSERT >> dataSeeded.sql
done

# adding to DB
echo "$MYSQL_EXEC -u root < ../playerSchema.sql"
echo "${MYSQL_EXEC} -u root < dataSeeded.sql"
