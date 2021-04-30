import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Container } from '@material-ui/core';
import TaskList from './Components/TaskList';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
}));

export default function Tasks() {
  const classes = useStyles();

  return (
    <div className={classes.root} >
      <CssBaseline />
      <Container>
        <TaskList />
      </Container>
    </div>
  );
}