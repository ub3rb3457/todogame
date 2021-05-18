import React, {} from 'react'
import { useStoreActions } from 'easy-peasy'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import AccountCircle from '@material-ui/icons/AccountCircle'
import { useAuth0 } from '@auth0/auth0-react'

const AccountButton = () => {
    const { isAuthenticated,loginWithRedirect } = useAuth0()
    const handleProfileMenuOpen = useStoreActions(actions=>actions.handleProfileMenuOpen)
    if(isAuthenticated){
        return(
            <IconButton 
                edge="end"
                aria-label="account of current user"
                aria-controls='primary-search-account-menu'
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
                >
                <AccountCircle />
            </IconButton>
        )
    } else {
        return (
            <Button onClick={loginWithRedirect}>LOG IN</Button>
        )
    }
    
}
export default AccountButton