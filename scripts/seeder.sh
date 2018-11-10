cd database/seeding

echo "Seeding now"
bash dbSeed.sh

echo "Seeding done"
mysql -u root < playerSchema.sql
mysql -u root < dataSeeded.sql

cd ../../
