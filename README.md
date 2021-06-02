# http-web-server
## Task
1. Create http server on node.js
2. Use mongoDB, create user model with following structure:
  - firstname
  - lastname
  - email
  - phone number
  - location(city, address)
  - phone number
  - links to social networks (facebook, linkedIn, twitter, etc.)
3. Create following endpoints for users:
  - create user [POST]
  - get user by id [GET]
  - delete user by id [DELETE]
4. Create an endpoint which will generate PDF with userdata and send generated file with response.
  - method [POST]
  - request body { user_id: \<id\> }
5. Create endpoint which will generate PDF file:
  - create file with 10k user records or check if this file already exists [POST]
  - get 10k users records file [GET]


## Setup
Create .env with following variables
```
PORT=5500
MONGOURL=<MONGO_CONNECTION_STRING>
```
## Run
```
npm run start
```
