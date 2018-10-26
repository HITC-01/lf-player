cd database/seeding
bash dbSeed.sh

mysql -u root < ../playerSchema.sql
mysql -u root < dataSeeded.sql

cd ../../