//https://api.openweathermap.org/data/2.5/weather?q=Denver&appid=5fd7029c7ed6d80ebf7ad903d501fa8d//
let weather = {
    apiKey : "5fd7029c7ed6d80ebf7ad903d501fa8d",
    fetchWeather: function(city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="
             + city 
             + "&appid=" 
             + this.apiKey
        )
            .then((response) => response.json())
            .then((data) => this.displayWeather(data));
    },

    displayWeather: function(data) {
        const { name } = data;
        const { icon, description} = data.weather[0];
        const { temp,humidity} = data.main;
        const {speed} = data.wind;
        console.log(name,icon,description,temp,humidity,speed);
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "http://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".desc").innerText = description;
        document.querySelector(".temp").innerText =  (temp - 273.15).toPrecision(3) + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity +"%";
        document.querySelector(".wind").innerText = "Wind Speed: " + speed +" km/h";
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900?" + name + ")";
    },

    search : function(){
        this.fetchWeather(document.querySelector(".search-bar").value);
    }

};

document.querySelector(".search button").addEventListener("click",function (){
weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup",function (){
    if(event.key == "Enter"){
        weather.search();
    }
})
