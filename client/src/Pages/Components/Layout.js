import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import MenuDrawer from './MenuDrawer'
import BottomBar from './BottomBar';
import Tasks from './Tasks';
import { Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
}));

export default function Layout() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const toggleDrawer = (state) => (e) => {
    if (e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
      return;
    }
    setOpen(state);
  };

  return (
    <div className={classes.root} >
      <CssBaseline />
      <MenuDrawer open={open} toggleDrawer={toggleDrawer} />
      <Container>
        <Tasks />
      </Container>
      <BottomBar toggleDrawer={toggleDrawer} />
    </div>
  );
}