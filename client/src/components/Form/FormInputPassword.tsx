import React from "react";
import { InputAdornment, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export const FormInputPassword = (props: FormTextFieldProps) => {
  const { name, control, label, type, size = "small" } = props;

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState,
      }) => (
        <TextField
          type={type}
          helperText={error ? error.message : null}
          size={size}
          error={!!error}
          onChange={onChange}
          value={value}
          fullWidth
          label={label}
          variant="outlined"
          inputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Visibility />
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
};
