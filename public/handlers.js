const rp = require("request-promise");
const SlingairUrl = "https://journeyedu.herokuapp.com/slingair";

const getSeatSelect = async (req, res) => {
  const flightNumbers = await rp({
    uri: `${SlingairUrl}/flights`,
    json: true,
  }).then((data) => data.flights);
  res.status(200).render("pages/seat-select", {
    title: "Seat Selection",
    jsSource: "/scripts/seat-select.js",
    flightNumbers,
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

module.exports = { getSeatSelect, getFlight };
