const WeatherApi = (() => {
  const defaultCity = 'London';
  const apiKey = '567f3c6f7f340741cc67b0ec31181eac';
  let apiUrl = '';

  const getWeatherForecastData = async (city = '', units = '') => {
    if (city === '') {
      apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${defaultCity}&appid=${apiKey}&units=${units}`;
    } else {
      apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;
    }

    const weatherResponse = await fetch(`${apiUrl}`, { mode: 'cors' });
    const data = await weatherResponse.json();
    return data;
  };

  return {
    getWeatherForecastData,
  };
})();

export default WeatherApi;