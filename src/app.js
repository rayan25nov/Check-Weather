const inputCity = document.getElementById("inputCity");
const searchBtn = document.getElementById("searchBtn");
const result = document.getElementById("result");
const error = document.getElementById("error");
const image = document.getElementById("image");
import "./style.css";

const formHandler = (e) => {
  e.preventDefault();
  error.innerHTML = "";
  result.innerHTML = "";
  image.innerHTML = "";
  const city = inputCity.value;
  const ApiKey = process.env.apiKey;
  const units = "metric";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${ApiKey}&units=${units}`;
  if (!city) {
    error.innerHTML = `<p>Please enter a city name</p>`;
    return;
  } else {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.cod !== 200) {
          error.innerHTML = `<p>${data.message}</p>`;
          return;
        }
        const temperature = data.main.temp;
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;
        result.innerHTML = `<div>
                              <p>
                                Temperature in ${city} is ${temperature}°C and weather is ${description}
                              </p>
                            </div>`;
        image.innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}@2x.png">`;
      })
      .catch((err) => {
        error.innerHTML = `<p>An error occurred. Please try again or check your Internet connectivity.</p>`;
        console.log(err);
      });
  }
  inputCity.value = "";
};

searchBtn.addEventListener("click", formHandler);
