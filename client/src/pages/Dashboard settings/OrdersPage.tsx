import {
  Autocomplete,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Country, State, City } from "country-state-city";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CountrySchema, TCountrySchema } from "../../lib/type";

const OrdersPage = () => {
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
  // console.log(selectedCountry);

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
  // console.log(cityOptions);

  const handleCityChange = (event, newValue) => {
    setSelectedCity(newValue);
  };

  const defaultValues = {
    country: null,
    state: "",
    city: "",
  };

  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm<TCountrySchema>({
    defaultValues,
    resolver: zodResolver(CountrySchema),
  });

  const onSubmit: SubmitHandler<any> = async (data) => {
    console.log(data);
    // reset();
  };

  return (
    <Box>
      <Typography variant="h4">ProfilePage</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack direction="column" gap={2} sx={{ width: 1 }}>
          <Typography variant="h5">React hook form</Typography>
          asdsad
          <Controller
            name={"country"}
            control={control}
            render={({
              field: { onChange, value },
              fieldState: { error },
              formState,
            }) => (
              // <TextField
              //   helperText={error ? error.message : null}
              //   error={!!error}
              //   onChange={onChange}
              //   value={value}
              //   label={label}
              // />
              <Autocomplete
                // value={value}
                value={value ? { name: value } : null}
                // onChange={handleCountryChange}
                onChange={(event, newValue) => {
                  const selectedCountryName = newValue ? newValue.name : "";
                  onChange(selectedCountryName);
                  // onChange(newValue); // Pass the new value to the onChange function provided by React Hook Form
                  handleCountryChange(event, newValue); // Call your custom function
                }}
                options={Country.getAllCountries()}
                // getOptionLabel={(option) => option.name}
                getOptionLabel={(option) => (option ? option.name : "")}
                isOptionEqualToValue={(option, value) =>
                  option.name === value.name
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Country"
                    helperText={error ? error.message : null}
                    error={!!error}
                    // onChange={onChange}
                    //   value={value}
                  />
                )}
              />
            )}
          />
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Stack>
      </form>
      <Stack direction="column" gap={2} sx={{ width: 1 }}>
        {/* <Autocomplete
          value={selectedCountry}
          onChange={handleCountryChange}
          options={Country.getAllCountries()}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => <TextField {...params} label="Country" />}
        /> */}
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
      </Stack>
    </Box>
  );
};

export default OrdersPage;
