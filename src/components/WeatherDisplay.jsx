import React from 'react';

const WeatherDisplay = ({ weather, forecast, unit }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      day: "2-digit",
      month: "short",
    }).format(date);
  };

  return (
    <div className="weather-info">
      <div className='top'>
        <div className='head'>
          <h2 style={{ fontSize: "40px" }}>{weather.name}</h2>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
            alt={weather.weather[0].description}
          />
        </div>
        <div className='body'>
          <div className="details">
            <strong>
              Current:
            </strong>
            <p>{weather.main.temp.toFixed(1)}°{unit === 'metric' ? 'C' : 'F'}</p>
          </div>

          <div className="details">
            <strong>Condition: </strong>
            <p>{weather.weather[0].description}</p>
          </div>

          <div className="details">
            <strong>Humidity: </strong>
            <p>{weather.main.humidity}%</p>
          </div>

          <div className="details">
            <strong>Wind Speed: </strong>
            <p>{weather.wind.speed} {unit === 'metric' ? 'm/s' : 'mph'}</p>
          </div>
        </div>
      </div>

      <div className='forecast'>
        {forecast.length > 0 ? (
          <div className='items'>
            {forecast.map((day, index) => (
              <div key={index} className='data'>
                <div style={{fontSize:"20px"}}>{formatDate(day.dt_txt)}: {day.main.temp.toFixed(1)}°{unit === 'metric' ? 'C' : 'F'}</div>
                <div style={{fontSize:"18px"}}>{day.weather[0].description}</div>

              </div>
            ))}
          </div>
        ) : (
          <p>Forecast data not available.</p>
        )}
      </div>
    </div>
  );
};

export default WeatherDisplay;
