import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    appBar: {
        top: 'auto',
        bottom: 0,
      },
}))   
function BottomBar(props) {
    const classes = useStyles();
    return (
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={props.toggleDrawer(true)}
                edge="start"
            >
                <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
                Clipped drawer
            </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default BottomBar


    