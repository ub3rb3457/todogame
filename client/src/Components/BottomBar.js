import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core'
import { useAuth0 } from '@auth0/auth0-react';
import LinkButton from '@Components/LinkButton';
import AccountCircle from '@material-ui/icons/AccountCircle'
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
    appBar: { flexGrow: 1 },
    menuButton: { marginRight: theme.spacing(2) },
    title: { flexGrow: 1 }
}))   
function BottomBar(props) {
    const classes = useStyles();
    const { isAuthenticated,user,loginWithRedirect,logout } = useAuth0();
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const handleProfileMenuOpen = (event) => { setAnchorEl(event.currentTarget) }
    const handleMenuClose = () => { setAnchorEl(null) }
    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          id={menuId}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isMenuOpen}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
          <MenuItem onClick={handleMenuClose}>My account</MenuItem>
          <MenuItem onClick={() => logout({ returnTo: window.location.origin })}>Log Out</MenuItem>
        </Menu>
      );
    
        return (
            <>
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
                    {isAuthenticated && (
                        <IconButton 
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                            >
                            <AccountCircle />
                        </IconButton>
                    )}                
                </Toolbar>
            </AppBar>
           
            {renderMenu}
            </>
        )
    
}

export default BottomBar


    