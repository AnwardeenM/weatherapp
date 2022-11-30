import React, { useEffect, useState } from 'react';
import './App.css';

const autoCompleteURL ="https://api.weatherapi.com/v1/search.json?key=94fa33516b0e48c2a67170420222911&q="

function App() {
  const [city,setCity]= useState("");
  const [clicked,setClicked] = useState(false);
  const [citysuggestion,setCitySuggestion] = useState([]);


  const handleclick=(clickedcity)=>{
    console.log(clickedcity)
    setCity(clickedcity);
   setClicked(true);
    // setCitySuggestion([]);
  }

  useEffect(()=>{
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
            
        </div>      
    </div>
  );
}

export default App;
