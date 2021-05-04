import React, { useMemo } from 'react'
import { useForm } from "react-hook-form";
import * as yup from "yup";
export default function App() {
    const validationSchema = useMemo(
      () =>
        yup.object({
          firstName: yup.string().required("Required"),
          lastName: yup.string().required("Required")
        }),
      []
    );
    const resolver = useYupValidationResolver(validationSchema);
  
    const { handleSubmit, errors, register } = useForm({ resolver });
  
    console.log(errors);
  
    return (
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <input {...register("firstName")} />
        <input {...register("lastName")} />
        <input type="submit" />
      </form>
    );
  }