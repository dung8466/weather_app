const locationInfo = document.querySelector('.location');
const weatherInfo = document.querySelector('.weather');
const latitudeInfo = document.querySelector('.latitude');
const longitudeInfo = document.querySelector('.longitude');
const key = "2a1a35a15da5185b53d00286ae74e55e";
const weatherIcon = document.querySelector('.weatherIcon');
const temp = document.querySelector('.temp');
const wind = document.querySelector('.wind');
const description = document.querySelector('.description');
const rain = document.querySelector('.rain');
const localLat = (localStorage.getItem('lat')) || 0; 
const localLong = (localStorage.getItem('long')) || 0;
let app = {
    init: () =>{
        latitudeInfo.value = localLat;
        longitudeInfo.value = localLong;
        locationInfo.addEventListener('click', app.getLocation);
        weatherInfo.addEventListener('click', app.getWeather);
    },

    getLocation: (e) =>{
        let opts = {
            enableHighAccuracy: true,
            timeout: 1000 * 10, //10 seconds
            maximumAge: 1000 * 60 * 5, //5 minutes
          };
          navigator.geolocation.getCurrentPosition(app.location, app.err, opts);
          localStorage.setItem('lat', (latitudeInfo.value));
          localStorage.setItem('long', (longitudeInfo.value));
    },
    getWeather: (e) =>{
        let lat = latitudeInfo.value;
        let lon = longitudeInfo.value;  
        let lang = 'en';
        let units = 'metric';
        let url = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${key}&units=${units}&lang=${lang}`;
    //fetch the weather
        fetch(url)
            .then((resp) => {
                if (!resp.ok) throw new Error(resp.statusText);
                return resp.json();
            })
            .then((data) => {
                app.displayWeather(data);
            })
            .catch(console.err);
    },
    displayWeather: (e) =>{
        console.log(e.current);
        const val = e.current;
        weatherIcon.innerHTML = `<img src='http://openweathermap.org/img/wn/${val.weather[0].icon}@4x.png'/>`;
        temp.innerHTML = val.temp + '&deg;C';
        wind.innerHTML = val.wind_speed + 'm/s';
        if('rain' in val){
            rain.innerHTML = val.rain['1h'] + 'mm';
        }
        else{
            rain.innerHTML = 0 + 'mm';
        }
        description.innerHTML = val.weather[0].description;
    },
    err: (e) =>{
        console.error(e );
    },
    location: (e) =>{
        latitudeInfo.value = e.coords.latitude.toFixed(2);
        longitudeInfo.value = e.coords.longitude.toFixed(2);
    }
}

app.init();