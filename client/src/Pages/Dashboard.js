import React from 'react'
import clsx from 'clsx'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import RPMGauge from './RPMGauge'
import Chart from './Components/Chart'
import useStyles from './Components/styles'


export default function Dashboard() {
  const classes = useStyles();
  const fixedHeightPaperNoScroll = clsx(classes.paper, classes.fixedHeight, classes.noScroll);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Container component="main" className={classes.main}>
        <main className={classes.content}>
          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8} lg={9}>
                <Paper className={classes.paper}>
                  <Chart />
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <Paper className={fixedHeightPaperNoScroll}>
                  <RPMGauge />
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <p>orders</p>
                </Paper>
              </Grid>
            </Grid>   
          </Container>
        </main> 
      </Container> 
    </div>
  );
}




