import { Autocomplete, Box, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Country, State, City } from "country-state-city";

const ProfilePage = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  const [stateOptions, setStateOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);

  const handleCountryChange = (event, newValue) => {
    setSelectedCountry(newValue);
    setSelectedState(null);
    setSelectedCity(null);
    setStateOptions([]);
    setCityOptions([]);
    if (newValue) {
      const states = State.getStatesOfCountry(newValue.isoCode);
      setStateOptions(states);
    }
  };
  console.log(selectedCountry);

  const handleStateChange = (event, newValue) => {
    setSelectedState(newValue);
    setSelectedCity(null);
    setCityOptions([]);
    if (newValue) {
      const cities = City.getCitiesOfState(
        selectedCountry?.isoCode,
        newValue.isoCode
      );
      setCityOptions(cities);
    }
  };
  console.log(cityOptions);

  const handleCityChange = (event, newValue) => {
    setSelectedCity(newValue);
  };

  return (
    <Box>
      <Typography variant="h4">ProfilePage</Typography>
      {/* <Stack direction="row" gap={2}></Stack> */}
      <div>
        <Autocomplete
          value={selectedCountry}
          onChange={handleCountryChange}
          options={Country.getAllCountries()}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => <TextField {...params} label="Country" />}
        />
        {selectedCountry && (
          <Autocomplete
            value={selectedState}
            onChange={handleStateChange}
            options={stateOptions}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => <TextField {...params} label="State" />}
          />
        )}
        {selectedState && (
          <Autocomplete
            value={selectedCity}
            onChange={handleCityChange}
            options={cityOptions}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => <TextField {...params} label="City" />}
          />
        )}
      </div>
    </Box>
  );
};

export default ProfilePage;
