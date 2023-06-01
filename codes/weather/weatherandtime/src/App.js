import { Component } from 'react';
import './App.css';
import WeatherDetails from './WeatherDetails';

export default class App extends Component {
  state = {
    zip: ''
  };

  async getWeather(zip) {
    const key = '';//'get your own key'
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${key}&units=imperial&lang=en&formatted=0`);
      const weatherData = await response.json();

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText} ${weatherData.message}`);
      }

      console.log(weatherData);

      this.setState({
        weather: {
          location: weatherData.name,
          icon: `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`,
          temp: weatherData.main.temp,
          description: weatherData.weather[0].description,
          sunrise: weatherData.sys.sunrise,
          sunset: weatherData.sys.sunset
        }
      });
    }
    catch (e) {
      console.error('oops', e);
      this.setState({
        error: e.message
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(this.state.zip);
    if (this.state.zip.length === 5 && prevState.zip !== this.state.zip) {
      this.getWeather(this.state.zip);
    }
  }

  zipUpdated = /*async*/ e => {
    /*await*/ this.setState({
    zip: e.target.value
  });

  }


  render() {
    const { weather, error } = this.state;

    const weatherDetails = weather
      ? <WeatherDetails weather={weather || {}} />
      : <div className="row">
        <div>{error}</div>
        <div>please enter a valid US zip code</div>
      </div>;

    return (
      <div className="container text-center">
        <div className="row row-cols-lg-auto g-3 justify-content-end">
          <div className="col-12">
            <input type="text" className="form-control" placeholder="enter a US zip code" value={this.state.zip} onChange={this.zipUpdated} />
          </div>
        </div>
        {weatherDetails}
      </div>
    );
  }
}

