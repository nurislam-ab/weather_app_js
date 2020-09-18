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

  const renderHeader = (data) => {
    const header = document.getElementById('header');
    const city = UIComponents.getWrapper('h2', 'city');

    const cityTitle = document.createElement('input');
    cityTitle.id = 'city';

    city.innerHTML = `${data.city.name}, ${data.city.country} `;

    header.append(city);
    header.append(cityTitle);
  };

  const render = (data) => {
    const content = document.getElementById('content');
    const weatherBlock = UIComponents.getWrapper('div');
    const cityWraper = UIComponents.getWrapper('p', 'temp-details');
    const windSpeedWrapper = UIComponents.getWrapper('p', 'temp-details');

    cityWraper.innerHTML = `${data.name}`;
    console.log(`name after url ${data.name}`);

    windSpeedWrapper.innerHTML = `${data.cod}`;
    console.log(`winSpeed ${data.cod}`);

    weatherBlock.append(cityWraper);
    weatherBlock.append(windSpeedWrapper);
    content.append(weatherBlock);
    return weatherBlock;
  };

  const renderHourlyWeatherCard = (hourlyRecords) => {
    const dayWeatherCard = UIComponents.getWrapper('div', 'day-weather-card');

    // const hoursRange = document.createElement('input');
    // hoursRange.setAttribute('type', 'range');
    // hoursRange.setAttribute('list', 'tickmarks');

    const hourCardsList = UIComponents.getWrapper('div', 'hour-cards-list');
    const hoursList = UIComponents.getWrapper('div', 'hours-list');
    const h2 = UIComponents.getWrapper('h2');

    hourlyRecords.forEach((hourlyRecord) => {
      const hourCard = UIComponents.getWrapper('div', 'hourly-card');

      const hourItem = UIComponents.getWrapper('div', 'hour-item');
      const hour = new Date(hourlyRecord.dt_txt).getHours();
      hourItem.innerHTML = `${hour}:00`;

      const date = new Date(hourlyRecord.dt_txt);

      const dateNumber = date.getDate();
      const month = months[date.getMonth()];
      const day = days[date.getDay()];

      h2.innerHTML = `${dateNumber} ${month} ${day}`;

      dayWeatherCard.setAttribute('day', `${dateNumber}`);

      const temp = UIComponents.getWrapper('h2', 'temp');
      const timedescWrapper = UIComponents.getWrapper('div', 'pre-info');
      const time = UIComponents.getWrapper('span', 'time');
      const desc = UIComponents.getWrapper('span', 'desc');

      const wind = UIComponents.getWrapper('div', 'weather-info');
      const humidity = UIComponents.getWrapper('div', 'weather-info');
      const precipitation = UIComponents.getWrapper('div', 'weather-info');

      temp.innerHTML = hourlyRecord.main.temp;
      time.innerHTML = `${hour}:00`;
      desc.innerHTML = hourlyRecord.weather[0].description;

      wind.innerHTML = hourlyRecord.wind.speed;
      humidity.innerHTML = hourlyRecord.main.humidity;
      precipitation.innerHTML = hourlyRecord.main.pressure;

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

      const hourlyWeatherCard = renderHourlyWeatherCard(hoursArray);

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

  const getWeatherForecast = async () => {
    const weatherData = await WeatherApi.getWeatherForecastData();
    renderHeader(weatherData);
    renderDaysList(weatherData);
  };

  const getCity = async () => {
    const weatherData = await WeatherApi.getCurrentWeather();
    render(weatherData);
  };

  return {
    getCity,
    getWeatherForecast,
    renderDaysList,
  };
})();

export default Home;