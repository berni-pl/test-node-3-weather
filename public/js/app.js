console.log('Client side java is loaded')

// fetch('http://localhost:3000/weather?address=!').then((response)=>{
//     response.json().then((data) =>{
//         if (data.error) {
//             console.log(data.error)
//         } else {
//             console.log(data.location)
//             console.log(data.forecast)
//         }
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

// const mess1=document.querySelector('#message-1')
// const mess2=document.querySelector('#message-2')

weatherForm.addEventListener('submit',(e) => {
    e.preventDefault()

    const location=search.value
    fetch('http://localhost:3000/weather?address=' + location).then((response)=>{
    response.json().then((data) =>{
        if (data.error) {
            console.log(data.error)
            mess1.textContent = data.error
        } else {
            // mess1.textContent = data.location
            // mess2.textContent = "It's "+data.forecast.weather_descriptions+". Temperature is: " + data.forecast.temperature
            $('#message-1').text(data.location)
            $('#message-2').text("It's "+data.forecast.weather_descriptions+". Temperature is: " + data.forecast.temperature)
        }
    })
})

})

