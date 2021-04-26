import React, { useReducer, useState }  from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';

import { reducer, stop } from '../../helpers/formHelpers'
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:1337/api/***/';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


export default function FormComponent() {
  const [formData, setFormData] = useReducer(reducer, {});
  const [submitting, setSubmitting] = useState(false);
  const handleSubmit = event => {
    stop(event);
    setSubmitting(true);
    
    axios.post('login', formData).then(function (response) { // Make a Post Request
      console.log(response.data.data);
    });
  }
  handleChange = function (event){
    const isCheckbox = event.target.type === 'checkbox';
    setFormData({
      name: event.target.name,
      value: isCheckbox ? event.target.checked : event.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="someVal"
        label="Some Value"
        name="someVal"
        autoFocus
        onChange={handleChange}
      />
      <FormControlLabel
        control={<Checkbox name="checkBox" value="remember" color="primary" />}
        label="Check Me Out"
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
      >
        Sign In
      </Button>
      <Grid container>
        <Grid item xs>
          <Link href="#" variant="body2">
            Forgot password?
          </Link>
        </Grid>
        <Grid item>
          <Link href="#" variant="body2">
            {"Don't have an account? Sign Up"}
          </Link>
        </Grid>
      </Grid>
    </form> 
  );
}