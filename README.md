# phones-api
A webservices project by **Edvinas Strazdonis** & **Rokas Buoželis**
Includes CRUD functionality, that contains phones info (Name, Manufacturer, PhotoUrl, Description)
All information is expected and provided in **JSON** format.

# API Documentation
### [Postman](https://documenter.getpostman.com/view/8269992/Tz5s5HBo)

# TODO
### Create a contact together with a phone


# Requirements
* Git 

  For running locally:

* Node.JS (tested with v14 & v15 but others should be fine)

  For running as a Docker image:


* Docker

# Setup for developemnt
* `git clone https://github.com/Strazdonis/phones-api`
* `npm install`
* `node index.js`
  
# Running as a Docker image
* `git clone https://github.com/Strazdonis/phones-api`
* `docker-compose build`
* `docker-compose up`
  
Docker runs these services:
* Runs the Node.JS script
* Opens port 80
* Starts MongoDB

# Completed functionality
* Create phones
* Update phones
* Get all phones
* Get one phone by ID
* Delete phone
* Create manufacturers
* Update manufacturers
* Get one manufacturer by ID
* Delete manufacturers

# Recommended usage
* Open the [Postman](https://documenter.getpostman.com/view/8269992/Tz5s5HBo) documentation and run it locally. 
* Start by:
  * Create a manufacturer (e.g. Apple)
  * Create a phone (e.g. iPhone X)
  * Proceed with adding more manufacturers or phones and updating them.

# SOAP requests
### Get all phones
```
<s11:Envelope xmlns:s11='http://schemas.xmlsoap.org/soap/envelope/'>
  <s11:Body>
    <ns1:PhonesRequest xmlns:ns1='http://tempuri.org/'>
    </ns1:PhonesRequest>
  </s11:Body>
</s11:Envelope>
```
### Get Phone by ID
```
<s11:Envelope xmlns:s11='http://schemas.xmlsoap.org/soap/envelope/'>
  <s11:Body>
    <ns1:PhoneRequest xmlns:ns1='http://tempuri.org/'>
      <ns1:_id>6051c6b0d93aed1184286576</ns1:_id>
    </ns1:PhoneRequest>
  </s11:Body>
</s11:Envelope>
```
### Create Phone
```
<s11:Envelope xmlns:s11='http://schemas.xmlsoap.org/soap/envelope/'>
  <s11:Body>
    <ns1:CreatePhoneRequest xmlns:ns1='http://tempuri.org/'>
      <ns1:name>Mi 9T Pro</ns1:name>
      <ns1:manufacturer>60509d9f042196b1374c2ad7</ns1:manufacturer>
      <ns1:description>A phone</ns1:description>
      <ns1:photoUrls>https://www.giztop.com/media/catalog/product/cache/dc206057cdd42d7e34b9d36e347785ca/x/i/xiaomi_mi_9t_pro_global.png</ns1:photoUrls>
      <ns1:owners>12345</ns1:owners>
    </ns1:CreatePhoneRequest>
  </s11:Body>
</s11:Envelope>
```
### Delete Phone
```
<s11:Envelope xmlns:s11='http://schemas.xmlsoap.org/soap/envelope/'>
    <s11:Body>
        <ns1:DeletePhoneRequest xmlns:ns1='http://tempuri.org/'>
            <ns1:_id>60ab749df99da7384094009c</ns1:_id>
        </ns1:DeletePhoneRequest>
    </s11:Body>
</s11:Envelope>
```