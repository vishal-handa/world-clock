"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");
const bodyParser = require('body-parser');
const ct = require('countries-and-timezones');
express()
  // Below are methods that are included in express(). We chain them for convenience.
  // --------------------------------------------------------------------------------

  // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
  .use(morgan("tiny"))
  .use(bodyParser.json())

  // Any requests for static files will go into the public folder
  .use(express.static("public"))

  // Nothing to modify above this line
  // ---------------------------------
  // add new endpoints here 👇
  .get('/timezone/:countryID',(req,res)=>{
    const countrybyid=req.params.countryID;
    let countryDetails=ct.getCountry(countrybyid.toUpperCase())
    res.json({status:200, data:countryDetails})
  })
  .get('/timezone/zone',(req,res)=>{
    let zone=req.query;
    console.log(zone);
    res.json({status:200, message:zone});
  })

  // add new endpoints here ☝️
  // ---------------------------------
  // Nothing to modify below this line

  // this is our catch all endpoint.


  // Node spins up our server and sets it to listen on port 8000.
  .listen(8000, () => console.log(`Listening on port 8000`));
