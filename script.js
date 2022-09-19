let weather = {
    apiKey: "2aa8b532b9275f9e9c13107c52c8fd25",
    fetchWeather: function(city){
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" 
            + city 
            + "&units=imperial&appid="
            + this.apiKey
        )
        .then((response) => response.json())
        .then((data) => this.displayWeather(data))
    },
    displayWeather: function(data){
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        console.log(name, icon, description, temp, humidity, speed);

        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + "@2x.png" ;
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°F";
        document.querySelector(".humidity").innerText = "humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed: " + speed + " mph";

        document.querySelector(".weather").classList.remove("loading");

        document.body.style.backgroundImage = "url('https://source.unsplash.com/1920x1080/?" + name + "')"
    },
    // this function is used for the "enter" button, type desried city in search bar
    // and press enter, the results will show
    search: function(){
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

document
    .querySelector(".search button")
    .addEventListener("click", function (){
        weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function(event) {
    if(event.key == "Enter"){
        weather.search();
    }
})


weather.fetchWeather("Denver");