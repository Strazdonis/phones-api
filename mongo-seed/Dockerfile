FROM mongo

COPY *.json /
CMD mongoimport --host mongo --db reach-engine --collection manufacturers --type json --file /manufacturers.json --jsonArray & \ 
mongoimport --host mongo --db reach-engine --collection phones --type json --file /phones.json --jsonArray
