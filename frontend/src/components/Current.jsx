import React from 'react';
import "../styles/current.css";

function Current({current,city}) {
  return (
    <div className='current'>
    <b>{city}</b>
    <br/>
    <br/>
    <b>Current Weather</b>
    <div className='currentBody'>
        <img src={current.condition.icon} alt="" />
        <span>{current.condition.text}</span>
        <span>
            <b>Temp:</b>
            {current.temp_c} deg
        </span>
        <span>
            <b>Feels like:</b>
            {current.feelslike_c} deg
        </span>
        <span>
            <b>Wind:</b>
            {current.wind_kph} kph
        </span>
    </div>
    </div>
  )
}

export default Current