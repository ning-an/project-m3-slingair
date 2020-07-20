const rp = require("request-promise");
const SlingairUrl = "https://journeyedu.herokuapp.com/slingair";
// const {v4: uuidv4} = require('uuid');
let signedIn = false;
let greeting = 'Sign In'

const findUserByEmail = (arr, email) => {
  return arr.find( elem => elem.email === email)
}

const getSeatSelect = async (req, res) => {
  const flightNumbers = await rp({
    uri: `${SlingairUrl}/flights`,
    json: true,
  }).then((data) => data.flights);
  res.status(200).render("pages/seat-select", {
    title: "Seat Selection",
    flightNumbers,
    greeting
  });
};

const getFlight = async (req, res) => {
  const { flightNumber } = req.params;
  try {
    const flightInfo = await rp({
      uri: `${SlingairUrl}/flights/${flightNumber}`,
      json: true,
    });
    const flight = flightInfo[flightNumber]
    res.status(200).send(flight);
  } catch (e) {
    res.status(404).send(e);
  }
};

const confirmSeat = (req, res) => {
  // const id = uuidv4();
  const option = {
    uri: `${SlingairUrl}/users`,
    method: 'POST',
    body: req.body,
    json: true
  };
  rp(option)
    .then(data => {
      res.status(201).json(data.reservation);
    })
    .catch(err => {
      console.log(err.message);
    })
}

const confirmPage = (req, res) => {
  const id = req.params.id;
  rp({
    uri: `${SlingairUrl}/users/${id}`,
  }).then(response => JSON.parse(response))
    .then(data => {
      greeting = signedIn ? `Hello ${data.data.givenName}` : 'Sign In';
      res.status(200).render('pages/confirmed', {title: 'Reservation Confirmation', ...data.data, greeting})
    })
}

const login = (req, res) => {
  res.render('pages/login', {title: 'Log in', greeting})
}

const viewReservation = async (req, res) => {
  const email = req.body.email;
  const userInfo = await rp(`${SlingairUrl}/users`);
  const parseUserInfo = await JSON.parse(userInfo);
  const targetUser = await findUserByEmail(parseUserInfo, email);
  try {
    res.status(200).json(targetUser);
    signedIn = true;
  } catch (e) {
    console.error(e);
  }
}

module.exports = { getSeatSelect, getFlight, confirmSeat, confirmPage, login, viewReservation };
