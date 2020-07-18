const flightInput = document.getElementById("flight");
const seatsDiv = document.getElementById("seats-section");
const confirmButton = document.getElementById("confirm-button");

let selection = "";
let flightNumber;

const renderSeats = (flight) => {
	seatsDiv.innerHTML = '';
  document.querySelector(".form-container").style.display = "block";

  const alpha = ["A", "B", "C", "D", "E", "F"];
  for (let r = 0; r < 10; r++) {
    const row = document.createElement("ol");
    row.classList.add("row", "fuselage");
    seatsDiv.appendChild(row);
    for (let s = 0; s < 6; s++) {
      const seatNumber = `${r + 1}${alpha[s]}`;
      const seat = document.createElement("li");

      // Two types of seats to render
      const seatOccupied = `<label class="seat"><span id="${seatNumber}" class="occupied">${seatNumber}</span></label>`;
      const seatAvailable = `<label class="seat"><input type="radio" name="seat" value="${seatNumber}"/><span id="${seatNumber}" class="avail">${seatNumber}</span></label>`;

      // TODO: render the seat availability based on the data...
      const availability = flight.find((elem) => elem.id === seatNumber)
        .isAvailable;
      seat.innerHTML = availability ? seatAvailable : seatOccupied;
      row.appendChild(seat);
    }
  }

  let seatMap = document.forms["seats"].elements["seat"];
  seatMap.forEach((seat) => {
    seat.onclick = () => {
      selection = seat.value;
      seatMap.forEach((x) => {
        if (x.value !== seat.value) {
          document.getElementById(x.value).classList.remove("selected");
        }
      });
      document.getElementById(seat.value).classList.add("selected");
      document.getElementById("seat-number").innerText = `(${selection})`;
      confirmButton.disabled = false;
    };
  });
};

const toggleFormContent = () => {
  flightNumber = flightInput.value;
  // const flightNumberRule = /^SA\d{3}/;
  // if (flightNumberRule.test(flightNumber)) {
    fetch(`/flights/${flightNumber}`)
			.then(res => res.json())
			.then(data => renderSeats(data))
	};
	

const handleConfirmSeat = (event) => {
  event.preventDefault();
  // TODO: everything in here!
  fetch("/confirmed", {
    method: "POST",
    body: JSON.stringify({
      flightNumber: flightNumber,
      seatNumber: selection,
      givenName: document.getElementById("givenName").value,
      surname: document.getElementById("surname").value,
      email: document.getElementById("email").value,
    }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then(
    () => (window.location.href = "/confirmed"),
    (err) => console.log(err)
  );
};

flightInput.addEventListener("change", toggleFormContent);

//fetch flight Numbers
