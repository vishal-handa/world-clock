import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import countries from './countries'


const App=() => {

  const [country, setCountry]=useState('');
  const [countryID, setCountryID]=useState('');
  const [timezoneByCountry, setTimezoneByCountry]=useState([]);
  const [selectedTZ, setSelectedTZ]=useState('');
  let bool=false;

  const getCountryByClick=(event)=>{
    const theID=event.target.value;
    console.log(theID);
    let selectedCountry= countries.find(el=>theID===el.alpha2)
    setCountry(selectedCountry.name);
    setCountryID(selectedCountry.alpha2.toUpperCase());
  }
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

  useEffect(()=>{
    fetch(`/timezone/zone?region=${selectedTZ}`)
    .then(res=>res.json())
    .then(res=>console.log(res))
  },[selectedTZ]);
  
  return (
    <div className="App">
      <header className="App-header">
        <select onChange={getCountryByClick}>
          <option>Select a Country</option>
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
            <option>Select country specific timezone</option>
            {timezoneByCountry.map(el=>{
              return <option value={el}
                        id={el}
              >{el}</option>
            })}
          </select>}
        
      </header>
    </div>
  );
};

export default App;
