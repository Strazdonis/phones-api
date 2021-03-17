# phones-api
A webservices project by **Edvinas Strazdonis** & **Rokas Buoželis**
Includes CRUD functionality, that contains phones info (Name, Manufacturer, PhotoUrl, Description)
All information is expected and provided in **JSON** format.

# API Documentation
### [Postman](https://documenter.getpostman.com/view/8269992/Tz5s5HBo)

# Requirements
* Git

  For running locally:

* Node.JS (tested with v14 & v15 but others should be fine)
  For running as a Docker image
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