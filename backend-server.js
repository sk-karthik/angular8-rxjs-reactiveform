const express = require('express')
const useRouter = require('./backend/app/routers')
const bodyParser = require('body-parser');
var cors = require('cors')

const port = process.env.PORT
require('./backend/app/models/db')

const app = express()
app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json())
app.use('/api/v1/', useRouter)
app.get('/', function (req, res) {
  res.send('Hello World, Karthik testing dev rrwerwerwerwer')
})

app.use(function (err, req, res, next) {
  console.error(err.message); // Log error message in our server's console
  if (!err.statusCode) err.statusCode = 500; // If err has no specified error code, set error code to 'Internal Server Error (500)'
  res.status(err.statusCode).send(err.message); // All HTTP requests must have a response, so let's send back an error with its status code and message
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
});

/*
App routing sample
https://medium.com/@jeffandersen/building-a-node-js-rest-api-with-express-46b0901f29b6


*/