import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Container } from '@material-ui/core';
import MenuDrawer from '@Components/MenuDrawer'
import TopBar from '@Components/TopBar';
import TaskList from '@Pages/TaskList';

const useStyles = makeStyles((theme) => ({root: { display: 'flex' }}));

export default function Layout() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const toggleDrawer = (state) => (e) => {
    if (e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) return;
    setOpen(state);
  };

  return (
    <div className={classes.root} >
      <CssBaseline />
      <TopBar toggleDrawer={toggleDrawer} />
      <MenuDrawer open={open} toggleDrawer={toggleDrawer} />
      <Container>
        <TaskList />
      </Container>
    </div>
  );
}