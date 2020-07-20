'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const { flights } = require('./test-data/flightSeating');
const { getSeatSelect, getFlight, confirmSeat, confirmPage, login, viewReservation } = require('./public/handlers')

express()
  .use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  })
  .use(morgan('dev'))
  .use(cors())
  .use(express.static('public'))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))
  .set('view engine', 'ejs')

  // endpoints
  .get('/seat-select', getSeatSelect)
  .get('/flights/:flightNumber', getFlight)
  .post('/users', confirmSeat)
  .get('/confirmed/:id', confirmPage)
  .get('/login', login)
  .post('/view-reservation', viewReservation)

  .get('/flights/:flightNumber', (req, res) => {
    const { flightNumber } = req.params;
    res.status(200).json(flights[flightNumber])
  })
  // .post('/users', (req, res) => {
  //   // const { flightNumber, seatNumber, givenName, surname, email } = req.body;
  //   res.redirect('/confirmed')
  // })
  .get('/admin', (req, res) => res.send('overall info'))
  .use((req, res) => res.send('Not Found'))
  .listen(8000, () => console.log(`Listening on port 8000`));
