import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Box, Button, MenuItem, TextField } from "@material-ui/core";

export default function BasicExample() {
  const lists = [
    { id: 0, name: "" },
    { id: 1, name: "foo" },
    { id: 2, name: "bar" }
  ];
  const { register, handleSubmit, control, errors } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="example1"
        fullWidth
        name="example1"
        inputRef={register({
          required: "required!"
        })}
        error={Boolean(errors.example1)}
        helperText={errors.example1 && errors.example1.message}
      />
      <Controller
        name="example2"
        control={control}
        rules={{ required: "required!" }}
        as={
          <TextField
            select
            label="example2"
            margin="normal"
            fullWidth
            id="select"
            error={Boolean(errors.example2)}
            helperText={errors.example2 && errors.example2.message}
          >
            {lists.map((list) => (
              <MenuItem value={list.name} key={list.id}>
                {list.name}
              </MenuItem>
            ))}
          </TextField>
        }
      />
      <Box mt={3}>
        <Button type="submit" variant="contained" color="primary">
          submit
        </Button>
      </Box>
    </form>
  );
}
