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

  const getZoneByClick=(event)=>{
    let zone=event.target.value;
    if(zone!=="Select country specific timezone"){
      console.log(zone);
      setSelectedTZ(zone);
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
    <Wrapper>
      <Select1 onChange={getCountryByClick}>
      <option value="Select a country">Select a country</option>
        {countries.map(el=>{
          return <option value={el.alpha2}
                  key={el.name} 
                  id={el.alpha2}
                  >{el.name}</option>
        })}
      </Select1>
      {bool && <Select2 onChange={getZoneByClick}>
          <option>Select country specific timezone</option>
          {timezoneByCountry.map(el=>{
            return <option value={el}
                            id={el}
                    >{el}</option>
          })}
        </Select2>}

        {timeBool && <p>{selectedTime}</p>}
    </Wrapper>
  );
};

export default App;

const Wrapper=styled.div`
  display: flex;
  flex-direction:column;
  justify-content: center;
  align-items: center;
  vertical-align: middle;
  height:100vh;
`;

const Select1=styled.select`
  width:400px;
  margin:10px;
`;

const Select2=styled.select`
  width:300px;
  margin:10px;
`;