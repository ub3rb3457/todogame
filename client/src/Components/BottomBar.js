import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountButton from '@Components/AccountButton';
import AccountMenu from '@Components/AccountMenu';
import { createStore, StoreProvider } from 'easy-peasy'
import UserModel from '@Models/User'

const store = createStore(UserModel)

const useStyles = makeStyles((theme) => ({
    appBar: { flexGrow: 1 },
    menuButton: { marginRight: theme.spacing(2) },
    title: { flexGrow: 1 }
}))   
function BottomBar(props) {
    const classes = useStyles();
        return (
            <StoreProvider store={store}>
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={props.toggleDrawer(true)}
                            edge="start"
                            className={classes.menuButton}
                        >
                            <MenuIcon />
                        </IconButton>
            
                        <Typography variant="h6" className={classes.title}>
                            Clipped drawer
                        </Typography>
                        <AccountButton />               
                    </Toolbar>
                </AppBar>
            
                <AccountMenu />
            </StoreProvider>
        )
    
}

export default BottomBar


    