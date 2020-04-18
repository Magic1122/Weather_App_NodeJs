const weatherForm = document.getElementById("searchForm")
const search = document.getElementById('search')
const locationButton = document.getElementById('location-button')
const messageOne = document.getElementById('msg-1')
const messageTwo = document.getElementById('msg-2')

const searchWeather = (address) => {

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch(`/weather?address=${address}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = `${data.location}.`
                messageTwo.textContent = `${data.forecast}`
            }
        })
    })
    search.value = ''
}

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const address = search.value
    console.log(address)
    searchWeather(address)
})

locationButton.addEventListener('click', () => {

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    navigator.geolocation.getCurrentPosition((position) => {  // browser Geolocation API    
        const longitude = position.coords.longitude
        const latitude = position.coords.latitude

        fetch(`/location?longitude=${longitude}&latitude=${latitude}`).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    messageOne.textContent = data.error
                } else {
                    messageOne.textContent = `${`Your location`}.`
                    messageTwo.textContent = `${data.forecast}`
                }
            })
        })    
    })
})