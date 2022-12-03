import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import "../styles/forecast.css";


function ForeCast({city,forecast:{forecastday}}) {
  const [expanded, setExpanded] = useState(false);
  console.log(forecastday);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className='forecast_body'>
      Forecast for {city}
      {
        forecastday.map((curDateforecast)=>{
          const{date,day,hour} = curDateforecast;
          const{maxtemp_c,mintemp_c,daily_chance_of_rain,condition:{icon,text}} =day;

          return(
            (      
              <Accordion expanded={expanded === date} onChange={handleChange(date)}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2bh-content"
              id={date}
            >
              <img src={icon} alt="" />
              <Typography sx={{ width: '33%', flexShrink: 0 }}>{date}({text})</Typography>
              <Typography sx={{ width: '33%', flexShrink: 0 }}><b>Temp:</b>{mintemp_c} deg to {maxtemp_c} deg</Typography>
              <Typography sx={{ width: '33%', flexShrink: 0 }}>{daily_chance_of_rain} % of rain possibility</Typography>
             
              
            </AccordionSummary>
            <AccordionDetails>
              
            </AccordionDetails>
          </Accordion>
            )
          )
        })
      }
      
     
    </div>
  )
}

export default ForeCast