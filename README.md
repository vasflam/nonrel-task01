# mongodb tasks 01

Tasks:
- De selectat locatii in <..oras..> pentru <..n..> persoane cu <..x..> bai. Cu bucatarie si WiFi.
- De selectat locatii in <..oras..> pentru <..n..> persoane cu TV, Bucatarie, WiFi si check-in 24 de ore.
- De selectat locatii in <..oras..> pentru <..n..> persoane la care review_scores_value >= 9


### Install
```
git clone https://github.com/vasflam/nonrel-task01.git
cd nonrel-task01
curl -L https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/airbnb-listings/exports/json?lang=en&timezone=Asia%2FBeirut -O ./docker/mongo/entrypoint/airbnb.json
docker-compose up -d
npm install
# Wait for database importing
docker logs -f nonrel-task01-mongodb-1
node index.js
```
