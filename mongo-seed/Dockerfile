FROM mongo

COPY *.json /
CMD mongoimport --host mongo --collection manufacturers --type json --file /manufacturers.json --jsonArray & \ 
mongoimport --host mongo --collection phones --type json --file /phones.json --jsonArray
