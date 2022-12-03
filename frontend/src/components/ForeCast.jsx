import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import "../styles/forecast.css";
import LinearProgress,{linearProgressClasses} from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height:20,
  borderRadius: 10,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 10,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  },
}));


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
              {
                hour.map((curHourForecast,index)=>{
                  return(
                    <div className="curhourtrack">
                      <b>{index}:00</b>
                      <img src={curHourForecast.condition.icon} alt="" />
                      <div className="linearprogress">
                      <BorderLinearProgress variant='determinate' value={curHourForecast.temp_c*100/maxtemp_c} />
                      {curHourForecast.temp_c} <b>deg</b>
                      </div>
                    </div>
                  )
                })
              }
              
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