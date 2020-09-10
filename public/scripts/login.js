const password = document.getElementById('password');

const customerSignin = () => {
    event.preventDefault();
    fetch('/view-reservation', {
        method: 'POST',
        body: JSON.stringify({
            email: document.getElementById('email').value
        }),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    }).then(res => res.json())
    .then(res => {
        window.location.replace(`/confirmed/${res.id}`);
    })
    .catch(err => {console.log(err)})
}

const adminSignin = () => {

}