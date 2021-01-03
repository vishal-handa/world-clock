import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import countries from './countries'


const App=() => {
  const [countryID, setCountryID]=useState('');
  const [timezoneByCountry, setTimezoneByCountry]=useState([]);
  const [selectedTZ, setSelectedTZ]=useState('');
  const [selectedTime, setSelectedTime]=useState('');
  let bool=false;
  let timeBool=false;

  const getCountryByClick=(event)=>{
    const theID=event.target.value;
    if(theID!=="Select a country"){
      console.log(theID);
      let selectedCountry= countries.find(el=>theID===el.alpha2)
      setCountryID(selectedCountry.alpha2.toUpperCase());
    }
  };
  useEffect(()=>{
    fetch(`/timezone/${countryID}`)
    .then(res=>res.json())
    .then(res=>{
      setTimezoneByCountry(res.data.timezones);
      //console.log(res);
    });
  },[countryID]);

  if(timezoneByCountry.length>=1){
    bool=true;
  }

  if(selectedTime.length!==0){
    timeBool=true;
  }

  useEffect(()=>{
    fetch('/timezone/zone', {
      method:'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'zone': selectedTZ})
    })
    .then(res=>res.json())
    .then(res=>setSelectedTime(res.message));
  },[selectedTZ]);
  
  return (
    <div>
      <select onChange={getCountryByClick}>
      <option value="Select a country">Select a country</option>
        {countries.map(el=>{
          return <option value={el.alpha2}
                  key={el.name} 
                  id={el.alpha2}
                  >{el.name}</option>
        })}
      </select>
      {bool && <select onChange={(ev)=>{
                  let zone=ev.target.value;
                  console.log(zone);
                  setSelectedTZ(zone);
                }} 
              >
          <option disabled selected value>Select country specific timezone</option>
          {timezoneByCountry.map(el=>{
            return <option value={el}
                            id={el}
                    >{el}</option>
          })}
        </select>}

        {timeBool && <p>{selectedTime}</p>}
    </div>
  );
};

export default App;
