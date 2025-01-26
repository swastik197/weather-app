console.log("hello")
setInterval(Time, 1000);
function Time() { document.querySelector(".current_time").innerHTML = new Date().toLocaleTimeString() }
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
document.querySelector(".day").innerHTML = days[new Date().getDay()]
document.querySelector(".dt_m").innerHTML = `${new Date().getDate()} ${months[new Date().getMonth()]}`


let curr_temp = document.querySelector(".curr_temp")
let feel_temp = document.querySelector(".feel_temp")
let max_min_temp = document.querySelector(".max_min_temp")
let pressure = document.querySelector(".pressure")
let Humidity = document.querySelector(".Humidity")
let windspeed = document.querySelector(".windspeed")
let description = document.querySelector(".description")
let region = document.querySelector(".region")
let forms = document.querySelectorAll("form")
let holder = document.querySelector(".holder")
const api_key = "fb8ff14324dfda74703803049abd6149"
const api_link = `https://api.openweathermap.org/data/2.5/weather?q=chennai&units=metric&exclude=hourly,minutely&appid=` + api_key
const forecast_link =`https://api.openweathermap.org/data/2.5/forecast?q=chennai&units=metric&exclude=hourly,minutely&appid=`+api_key
weather(api_link)
forecast(forecast_link)

// current_pos_api =`api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=`+api_key
// let curr_location = document.querySelector(".curr_location")
document.querySelector(".curr_location").addEventListener('click', () => {
    navigator.geolocation.getCurrentPosition((position) => {
        console.log(position.coords.latitude, position.coords.longitude);
        weather(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=` + api_key)
        forecast(`https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&exclude=hourly,minutely&appid=`+api_key)
    });
})
forms.forEach((form)=>{form.addEventListener("submit", (e) => {
    e.preventDefault()
    let searchinput = form.querySelector("input").value
    weather(`https://api.openweathermap.org/data/2.5/weather?q=${searchinput}&units=metric&exclude=hourly,minutely&appid=` + api_key)
    forecast(`https://api.openweathermap.org/data/2.5/forecast?q=${searchinput}&units=metric&exclude=hourly,minutely&appid=`+api_key)

})})




async function weather(abc) {
    // const data = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=kolkata&appid=fb8ff14324dfda74703803049abd6149`)
    const data = await fetch(abc)
    const response = await data.json()
    console.log(response)
    curr_temp.innerHTML = `${response.main.temp.toFixed(0)}&deg;c`
    feel_temp.innerHTML = `feels like ${response.main.feels_like.toFixed(0)}&deg;c`
    max_min_temp.innerHTML = `min ${response.main.temp_min.toFixed(0)}&deg;c /max ${response.main.temp_max.toFixed(0)}&deg;c`
    pressure.innerHTML = `Pressure: ${response.main.pressure.toFixed(0)} hPa`
    Humidity.innerHTML = `Humidity: ${response.main.humidity.toFixed(0)}%`
    windspeed.innerHTML = `Wind speed: ${response.wind.speed.toFixed(0)}m/s`
    description.innerHTML = `<img src=" https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png" alt=""> ${response.weather[0].description}`


    const regionNames = new Intl.DisplayNames(
        ['en'], { type: 'region' }
    );
    console.log(regionNames.of(`${response.sys.country}`));
    let country = regionNames.of(`${response.sys.country}`)
    region.innerHTML = ` ${response.name.toLocaleUpperCase()}/${country.toLocaleUpperCase()}`


}
//forecast

async function forecast(abc) {
    const data = await fetch(abc)
    const responses = await data.json()
    // console.log(responses)
    holder.innerHTML=""
    responses.list.forEach(response => {
        if (response.dt_txt.includes("00:00:00")) {
            // console.log(response)
            // console.log(days[new Date(response.dt_txt).getDay()])
            let forecast_card = document.createElement("div")
            forecast_card.classList.add("forecast_card")
            forecast_card.innerHTML = `
            <div class="flex justify-around bg-orange-100 backdrop-blur-xs rounded-3xl sm:w-1/2 m-2 ">
                               <p class="p-2">${days[new Date(response.dt_txt).getDay()]}</p>
                                <p class="p-2 flex">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960"
                                        width="24px" fill="#000000">
                                        <path
                                            d="M480-80q-83 0-141.5-58.5T280-280q0-48 21-89.5t59-70.5v-320q0-50 35-85t85-35q50 0 85 35t35 85v320q38 29 59 70.5t21 89.5q0 83-58.5 141.5T480-80Zm-40-440h80v-40h-40v-40h40v-80h-40v-40h40v-40q0-17-11.5-28.5T480-800q-17 0-28.5 11.5T440-760v240Z" />
                                    </svg>${response.main.temp.toFixed(0)}&deg;c;
                                </p>
                                
                                <img src=" https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png" class="w-12" alt="">
                                <p class="p-2">${response.main.temp_min.toFixed(0)}&deg;c/${response.main.temp_max.toFixed(0)}&deg;c</p>
                                </div>
        `
        holder.appendChild(forecast_card)




        }

    });

}
