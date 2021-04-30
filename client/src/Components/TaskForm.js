import React from "react";
import axios from 'axios'
import { makeUseAxios } from "axios-hooks";
import { useForm,FormProvider } from "react-hook-form";
import FormInput from './FormInput'
import { Button } from "@material-ui/core";

const useAxios = makeUseAxios({
    axios: axios.create({ baseURL: 'http://localhost:3004' })
})

function TaskForm(props) {
  const methods = useForm();
  const { handleSubmit } = methods;
  
  //=================PUT
  const [{ loading, error }, addTask] = useAxios({ url: '/tasks', method: 'PUT' },{ manual: true })
  const onSubmit = (formData) => { addTask({ data: formData })};
  
  //===================
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  return (
    <div>
      <FormProvider {...methods}>
        <form>
          <FormInput name="task" label="State your objective..." />
          <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
        </form>
      </FormProvider>
    </div>
  );
}
export default TaskForm