import React, { useEffect, useState } from 'react';
import './App.css';
import Current from './components/Current';
import ForeCast from './components/ForeCast';

// const YOUR_ACCESS_KEY ="f0c0b307cc0febdb7017fffca7592da8";

const autoCompleteURL ="https://api.weatherapi.com/v1/search.json?key=9ea20cd5e9194dc086b105226221612&q="
// const WeatherStackURL ="http://api.weatherstack.com/forecast?access_key=YOUR_ACCESS_KEY&query=" 

const weatherURL =(city)=>
  `https://api.weatherapi.com/v1/forecast.json?key=9ea20cd5e9194dc086b105226221612&q=${city}&days=7&aqi=no&alerts=no`


function App() {
  const [city,setCity]= useState("");
  const [clicked,setClicked] = useState(false);
  const [current,setCurrent] = useState();
  const [forecast,setForecast] = useState();
  const [location,setLocation] = useState("");
  const [citysuggestion,setCitySuggestion] = useState([]);


  const handleclick= async (clickedcity)=>{
    setCity(clickedcity);
    setClicked(true);
   
   const response = await fetch(weatherURL(city));
   const data = await response.json();
   setCurrent(data.current);
   setForecast(data.forecast);
   setLocation(data.location.name)
  }

  useEffect(()=>{
    const getDataAfterTimer=setTimeout(()=>{
      const fetchcitysuggestion = async()=>{
        const res = await fetch(autoCompleteURL +city);
        const data = await res.json();

        const citySuggestionData = data.map(curdata=>`${curdata.name}, ${curdata.region}, ${curdata.country}`)
        setCitySuggestion(citySuggestionData);
  
      }
      if(!clicked && city.length>2){
        fetchcitysuggestion();
      }
      else{
        setCitySuggestion([]);
        setClicked(false)
      }
    },1000)
   
    return ()=>clearTimeout(getDataAfterTimer); 
  },[city])

  return (
    <div className="App">
      <div className="header"><b>Anwardeen's Weather Report</b></div>
        <div className='app_body'>
          <input type="text" className='cityTextbox' placeholder='Enter the City name'
          onChange={(event)=>setCity(event.target.value)}  value={city}>
            </input>
            {citysuggestion.length>0 && (
              <div className='suggestionWrapper'>
              {citysuggestion.map(curCity=>(
                <div className='suggestion' onClick={()=>handleclick(curCity)}>{curCity}</div>
              ))}
              </div>
            )}
            {current && <Current current={current} city={location}/>}
            {forecast && <ForeCast forecast ={forecast} city={location}/>}
                        
        </div>      
    </div>
  );
}

export default App;
