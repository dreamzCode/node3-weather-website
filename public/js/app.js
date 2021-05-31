
// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then(data => {
//         console.log(data);
//     })
// })

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const locationBtn = document.querySelector('.location-button')
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const messageThree = document.querySelector('#message-3');




weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value;

        messageOne.textContent = 'Loading...'
        messageTwo.textContent = '';
        messageThree.textContent = '';

        fetch('/weather?address=' + location).then(response => {
            response.json().then(data => {
                if (data.error) {
                    messageOne.textContent = data.error;
                } else {
                    messageOne.textContent = data.location;
                    messageTwo.textContent = data.forecast;
                    messageThree.textContent = data.tempRange;
                }
            })
        })
})

locationBtn.addEventListener('click', () => {
    messageOne.textContent = 'Loading...'
     navigator.geolocation.getCurrentPosition((position) => {
         
        fetch(`/weather?address=${position.coords.longitude},${position.coords.latitude}`).then(response => {
            response.json().then(data => {
                if (data.error) {
                    messageOne.textContent = data.error;
                } else {
                    messageOne.textContent = data.location;
                    messageTwo.textContent = data.forecast;
                    messageThree.textContent = data.tempRange;
                }
            })
        })
    })
})