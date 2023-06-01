import React from 'react';
import PropTypes from 'prop-types';

export default function WeatherDetails(props) {
    const { location, icon, temp, description, sunrise, sunset } = props.weather || {};

    let unixTimestamp = sunrise;
    let morning = new Date(unixTimestamp * 1000);
    let newSunrise = morning.toLocaleTimeString("en-US");

    let unixTimestamp2 = sunset;
    let evening = new Date(unixTimestamp2 * 1000);
    let newSunset = evening.toLocaleTimeString("en-US");


    return (
        <>
            <div className="row">
                <h1>
                    The weather and important times in {location} are
                </h1>
            </div>
            <div className="row justify-content-center">
                <img className="col-3" src={icon} alt={description} />
            </div>
            <div className="row">
                <div>
                    <h1>{temp} F</h1> and {description} <hr></hr>
                </div>
            </div>
            <div>Sunrise is at: <h1>{newSunrise}</h1></div> <hr></hr>
            <div>Sunset is at:  <h1>{newSunset}</h1> </div>
        </>
    )
}

WeatherDetails.propTypes = {
    weather: PropTypes.shape({
        location: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
        temp: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        sunrise: PropTypes.number.isRequired,
        sunset: PropTypes.number.isRequired
    }).isRequired
}
