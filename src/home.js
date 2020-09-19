import WeatherApi from './weatherApi';
import UIComponents from './components';

const Home = (() => {
  const content = document.getElementById('content');
  const weatherContainer = UIComponents.getWrapper('div', 'container');
  content.append(weatherContainer);

  const daysList = UIComponents.getWrapper('div', 'days-list');
  const dayWeatherCardList = UIComponents.getWrapper('div', 'day-weather-card-list');

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const windIcon = '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 516.4 516.4" style="enable-background:new 0 0 516.4 516.4;" xml:space="preserve"><style type="text/css"> .st0{fill:#FFFFFF;} .st1{fill:#638DA9;}</style><path class="st0" d="M344.2,143.4c0-42.1-34.4-76.5-76.5-76.5c-42.1,0-76.5,34.4-76.5,76.5h38.2c0-21,17.2-38.2,38.2-38.2s38.2,17.2,38.2,38.2s-17.2,38.2-38.2,38.2H38.2v38.2h229.5C309.8,220.1,344.2,185.6,344.2,143.4z"/><path class="st1" d="M439.8,143.4c-42.1,0-76.5,34.4-76.5,76.5h38.3c0-21,17.2-38.2,38.2-38.2s38.2,17.2,38.2,38.2s-17.1,38.3-38.2,38.3H0v38.2h439.9c42.1,0,76.5-34.4,76.5-76.5S481.9,143.4,439.8,143.4z"/><path class="st0" d="M382.5,334.8H114.7V373h267.8c11.5,0,19.1,7.6,19.1,19.1s-7.6,19.1-19.1,19.1s-19.1-7.6-19.1-19.1h-38.2c0,30.6,24.9,57.4,57.4,57.4s57.4-24.9,57.4-57.4S415,334.8,382.5,334.8z"/></svg>';
  const rainIcon = '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><style type="text/css">.st0{fill:#638DA9;} .st1{fill:#FCFCFD;}</style><path class="st0" d="M351.5,430.7c6.8-25.6,18.3-49.8,30.3-73.3c12,23.6,23.5,47.7,30.3,73.3c4.7,17.8-0.8,39.5-16.5,50.2c-9.6,6.6-23.3,5-31.6-3C351.4,466.2,347.2,447,351.5,430.7z"/><path class="st0" d="M212,438.7c6.8-25.6,18.3-49.8,30.3-73.3c12,23.6,23.5,47.7,30.3,73.3c4.7,17.8-0.8,39.5-16.5,50.2c-9.6,6.6-23.3,5-31.6-3C211.9,474.2,207.7,455.1,212,438.7z"/><path class="st0" d="M63.5,430.7c6.8-25.6,18.3-49.8,30.3-73.3c12,23.6,23.5,47.7,30.3,73.3c4.7,17.8-0.8,39.5-16.5,50.2c-9.6,6.6-23.3,5-31.6-3C63.4,466.2,59.2,447,63.5,430.7z"/><path class="st1" d="M442,142.4C437.5,73.5,380.2,19,310.2,19c-59.5,0-109.8,39.3-126.3,93.4c-9.2-3.5-19.3-5.4-29.7-5.4c-42.8,0-78.2,32.1-83.3,73.5c-0.3,0-0.6,0-0.9,0c-36.9,0-66.7,29.9-66.7,66.7S33.1,314,70,314c4.4,0,8.7-0.4,12.8-1.2c20.2,27.1,52.4,44.6,88.7,44.6c31.2,0,59.4-13,79.5-33.8C266.2,338.7,287,348,310,348c31.4,0,58.8-17.4,73-43.1c11.7,5.8,24.8,9.1,38.8,9.1c48,0,87-38.9,87-87C508.7,185.9,480.3,151.5,442,142.4z"/></svg>';
  const humidityIcon = '<svg version="1.1" id="humidity" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 192 192" style="enable-background:new 0 0 192 192;" xml:space="preserve"><style type="text/css">.st0{fill:#638DA9;}.st1{fill:#FCFCFD;stroke:#FCFCFD;}</style><path class="st0" d="M96,160v-8c17.6,0,32-14.4,32-32h8C136,142.1,118.1,160,96,160z"/><path class="st1" d="M96,176c-30.9,0-56-25.1-56-56c0-49.2,51.1-96.9,53.3-98.9l2.7-2.5l2.7,2.5c2.2,2,53.3,49.8,53.3,98.9C152,150.9,126.9,176,96,176z M96,29.6c-10.5,10.6-48,51-48,90.4c0,26.5,21.5,48,48,48s48-21.5,48-48C144,80.5,106.5,40.1,96,29.6z"/></svg>';

  const renderHourlyWeatherCard = (hourlyRecords, cityTitle) => {
    const dayWeatherCard = UIComponents.getWrapper('div', 'day-weather-card');

    const hourCardsList = UIComponents.getWrapper('div', 'hour-cards-list');
    const hoursList = UIComponents.getWrapper('div', 'hours-list');
    const h2 = UIComponents.getWrapper('h2', 'city-title');

    hourlyRecords.forEach((hourlyRecord) => {
      const hourCard = UIComponents.getWrapper('div', 'hourly-card');

      const hourItem = UIComponents.getWrapper('div', 'hour-item');
      const hour = new Date(hourlyRecord.dt_txt).getHours();
      hourItem.innerHTML = `${hour}:00`;

      const date = new Date(hourlyRecord.dt_txt);

      const dateNumber = date.getDate();
      const month = months[date.getMonth()];
      const day = days[date.getDay()];

      h2.innerHTML = `${dateNumber} ${month} ${day}, ${cityTitle}`;
      hourCard.setAttribute('hour', `${hour}:00`);
      hourCard.setAttribute('day', `${dateNumber}`);
      hourCardsList.setAttribute('day', `${dateNumber}`);
      dayWeatherCard.setAttribute('day', `${dateNumber}`);
      hoursList.setAttribute('day', `${dateNumber}`);
      hourItem.setAttribute('hour', `${hour}:00`);
      hourItem.setAttribute('number', `${dateNumber}`);

      const temp = UIComponents.getWrapper('h2', 'temp');
      const timedescWrapper = UIComponents.getWrapper('div', 'pre-info');
      const time = UIComponents.getWrapper('span', 'time');
      const desc = UIComponents.getWrapper('span', 'desc');

      const wind = UIComponents.getWrapper('div', 'weather-info');
      const humidity = UIComponents.getWrapper('div', 'weather-info');
      const precipitation = UIComponents.getWrapper('div', 'weather-info');

      const windSpan = UIComponents.getWrapper('span');
      const humiditySpan = UIComponents.getWrapper('span');
      const precipitationSpan = UIComponents.getWrapper('span');

      temp.innerHTML = hourlyRecord.main.temp;
      time.innerHTML = `${hour}:00`;
      desc.innerHTML = hourlyRecord.weather[0].description;

      windSpan.innerHTML = `${hourlyRecord.wind.speed} km/h Wind speed`;
      humiditySpan.innerHTML = `${hourlyRecord.main.humidity}% Humidity`;
      precipitationSpan.innerHTML = `${hourlyRecord.main.pressure}`;

      hourItem.addEventListener('click', () => {
        const node = document.querySelector(`.hour-cards-list[day='${dateNumber}']`);
        const hours = document.querySelector(`.hours-list[day='${dateNumber}']`);
        const element = document.querySelector(`div[hour='${hour}:00'][day='${dateNumber}']`);
        const hourItemSelected = document.querySelector(`.hour-item[hour='${hour}:00'][number='${dateNumber}']`);

        node.querySelectorAll('.hourly-card').forEach((n) => {
          if (n !== element) {
            n.classList.remove('show');
          } else {
            n.classList.add('show');
          }
        });

        hours.querySelectorAll('.hour-item').forEach((n) => {
          if (n !== hourItemSelected) {
            n.classList.remove('selected');
          } else {
            n.classList.add('selected');
          }
        });
      });

      wind.innerHTML = windIcon;
      wind.append(windSpan);

      humidity.innerHTML = humidityIcon;
      humidity.append(humiditySpan);

      precipitation.innerHTML = rainIcon;
      precipitation.append(precipitationSpan);

      hourCard.append(temp);
      timedescWrapper.append(time);
      timedescWrapper.append(desc);
      hourCard.append(timedescWrapper);
      hourCard.append(wind);
      hourCard.append(humidity);
      hourCard.append(precipitation);
      hourCardsList.append(hourCard);
      hoursList.append(hourItem);
    });

    dayWeatherCard.append(h2);
    dayWeatherCard.append(hourCardsList);
    dayWeatherCard.append(hoursList);
    return dayWeatherCard;
  };

  const getHourlyWeather = (selectedDate, data) => {
    const hourlyRecords = [];
    data.forEach((weatherRecord) => {
      const record = new Date(weatherRecord.dt_txt).getDate();
      if (selectedDate === record) {
        hourlyRecords.push(weatherRecord);
      }
    });
    return hourlyRecords;
  };

  const renderDaysList = (data) => {
    daysList.innerHTML = '';
    dayWeatherCardList.innerHTML = '';
    for (let i = 0; i < data.list.length; i += 8) {
      const wrapper = UIComponents.getWrapper('div', 'day-preview-card');
      const dateWrapper = UIComponents.getWrapper('h2', 'h2');
      const dayWrapper = UIComponents.getWrapper('span', 'day');
      const date = new Date(data.list[i].dt_txt).getDate();
      const day = days[new Date(data.list[i].dt_txt).getDay()];
      const month = months[new Date(data.list[i].dt_txt).getMonth()];

      dateWrapper.innerHTML = `${month} ${date}`;
      dayWrapper.innerHTML = `${day}`;

      wrapper.setAttribute('date', `${date}`);

      const hoursArray = getHourlyWeather(date, data.list);

      const hourlyWeatherCard = renderHourlyWeatherCard(hoursArray, data.city.name);

      wrapper.addEventListener('click', () => {
        const node = document.querySelector('.day-weather-card-list');
        const days = document.querySelector('.days-list');
        const element = document.querySelector(`div[day='${date}']`);
        const dayElement = document.querySelector(`div[date='${date}']`);

        node.querySelectorAll('.day-weather-card').forEach((n) => {
          if (n !== element) {
            n.classList.remove('show');
          } else {
            n.classList.add('show');
            document.querySelector(`.hour-item[number='${date}']`).click();
          }
        });

        days.querySelectorAll('.day-preview-card').forEach((n) => {
          if (n !== dayElement) {
            n.classList.remove('selected');
          } else {
            n.classList.add('selected');
          }
        });
      });

      wrapper.append(dateWrapper);
      wrapper.append(dayWrapper);
      daysList.append(wrapper);
      dayWeatherCardList.append(hourlyWeatherCard);
    }
    weatherContainer.append(daysList);
    weatherContainer.append(dayWeatherCardList);
  };

  const renderHeaderWithData = async (data) => {
    const city = document.querySelector('.city');

    city.innerHTML = `${data.city.name}, ${data.city.country}`;
  };

  const getWeatherUnits = () => {
    const chbx = document.querySelector('.units');
    let units = '';
    if (chbx.checked) {
      units = 'imperial';
    } else {
      units = 'metric';
    }

    return units;
  };

  const init = () => {
    document.querySelector('.day-preview-card').classList.add('selected');
    document.querySelector('.day-weather-card').classList.add('show');
    document.querySelector('.hourly-card').classList.add('show');
    document.querySelector('.hour-item').classList.add('selected');
  };

  const getWeatherForecast = async () => {
    const city = document.querySelector('#city').value;
    const weatherData = await WeatherApi.getWeatherForecastData(city, getWeatherUnits());
    renderHeaderWithData(weatherData);
    renderDaysList(weatherData);
    init();
  };

  const getEventTriggers = () => {
    const input = document.querySelector('#city');
    const chbx = document.querySelector('.units');
    input.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        getWeatherForecast();
      }
    });

    chbx.addEventListener('change', (event) => {
      if (event.target.checked) {
        getWeatherForecast();
      } else {
        getWeatherForecast();
      }
    });
  };

  const renderPage = () => {
    const header = document.getElementById('header');
    const cityWrapper = UIComponents.getWrapper('div', 'city-wrapper');
    const searchWrapper = UIComponents.getWrapper('div', 'search-wrapper');
    const city = UIComponents.getWrapper('h2', 'city');
    const spanC = UIComponents.getWrapper('span', 'units-type');
    const spanF = UIComponents.getWrapper('span', 'units-type');
    const switchMetrics = UIComponents.getWrapper('label', 'switch');
    const chbx = UIComponents.getWrapper('input', 'units');
    const slider = UIComponents.getWrapper('span', 'slider');
    const btn = UIComponents.getWrapper('button', 'btn');

    spanC.innerHTML = 'C';
    spanF.innerHTML = 'F';

    chbx.setAttribute('type', 'checkbox');
    btn.innerHTML = 'Get weather';
    btn.setAttribute('type', 'submit');
    btn.setAttribute('onclick', 'getWeatherForecast()');

    const cityTitle = document.createElement('input');
    cityTitle.id = 'city';
    cityTitle.setAttribute('required', '');

    switchMetrics.append(chbx);
    switchMetrics.append(slider);
    cityWrapper.append(city);
    searchWrapper.append(cityTitle);
    searchWrapper.append(btn);
    searchWrapper.append(spanC);
    searchWrapper.append(switchMetrics);
    searchWrapper.append(spanF);
    header.append(cityWrapper);
    header.append(searchWrapper);

    getWeatherForecast();
    getEventTriggers();
  };

  return {
    renderPage,
    getWeatherForecast,
  };
})();

export default Home;