const apiKey = "863242cfb2b1d357e6093d9a4df19a4b";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const type = document.querySelector(".type");


async function checkWeather(city) {
    try {
        const response = await axios.get(apiURL + city + `&appid=${apiKey}`)
        console.log(response.data);
        document.querySelector(".city").innerHTML = response.data.name;
        document.querySelector(".temp").innerHTML = `${Math.round(response.data.main.temp)}°F`;
        document.querySelector(".humidity").innerHTML = `${response.data.main.humidity}%`;
        document.querySelector(".wind").innerHTML = `${response.data.wind.speed}mph`;


        let weatherType = (response.data.weather[0].main);
        let weatherDescription = (response.data.weather[0].description)
        weatherIcon.src = `images/${weatherType}.png`
        type.innerHTML = weatherDescription;


        // document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none"


        searchBox.value = "";


    } catch (e) {
        if (e.response.status == 404) {
            document.querySelector(".error").style.display = "block"
            document.querySelector(".city").innerHTML = "";
            document.querySelector(".temp").innerHTML = `--°F`;
            document.querySelector(".humidity").innerHTML = `--%`;
            document.querySelector(".wind").innerHTML = `--mph`;
            type.innerHTML = "";


            // document.querySelector(".weather").style.display = "none"
            // alert("Please enter a valid city");
        }

    }




}
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);

});

