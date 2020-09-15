const WeatherApi = (() => {
  const city = 'London';
  const apiKey = '567f3c6f7f340741cc67b0ec31181eac';

  const getCurrentWeather = async () => {
    const apiURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const weatherResponse = await fetch(`${apiURL}`, { mode: 'cors' });
    const data = await weatherResponse.json();
    return data;
  };

  const getWeatherForecastData = async () => {
    const apiURL = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
    const weatherResponse = await fetch(`${apiURL}`, { mode: 'cors' });
    const data = await weatherResponse.json();
    return data;
  };

  return {
    getCurrentWeather,
    getWeatherForecastData,
  };
})();

export default WeatherApi;