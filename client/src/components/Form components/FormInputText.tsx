import { TextField } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

const FormInputText = (props: FormTextFieldProps) => {
  const {
    name,
    control,
    label,
    type,
    multiline = false,
    rows,
    size = "small",
  } = props;
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
          multiline={multiline}
          rows={rows}
        />
      )}
    />
  );
};

export default FormInputText;
