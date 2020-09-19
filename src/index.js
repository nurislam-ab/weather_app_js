import Home from './home';
import './assets/css/reset.scss';
import './assets/css/styles.scss';

window.onload = () => {
  Home.renderPage();
};

window.getWeatherForecast = () => {
  Home.getWeatherForecast();
};