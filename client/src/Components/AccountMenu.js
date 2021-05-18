import React, {} from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import { useAuth0 } from '@auth0/auth0-react'


const AccountMenu = () => {
    const { user,logout } = useAuth0()
    const anchorEl = useStoreState((state)=>state.anchorEl)
    const isMenuOpen = Boolean(anchorEl)
    const handleMenuClose = useStoreActions(actions=>actions.handleMenuClose)
    return(
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          id='primary-search-account-menu'
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isMenuOpen}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
          <MenuItem onClick={handleMenuClose}>My account</MenuItem>
          <MenuItem onClick={() => logout({ returnTo: window.location.origin })}>Log Out</MenuItem>
        </Menu>
      )
}
export default AccountMenu