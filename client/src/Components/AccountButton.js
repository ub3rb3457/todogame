import React, {} from 'react'
import { useStoreActions } from 'easy-peasy'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import AccountCircle from '@material-ui/icons/AccountCircle'
import CircularProgress from '@material-ui/core/CircularProgress';
import { useAuth0 } from '@auth0/auth0-react'

const AccountButton = () => {
    const { isLoading,isAuthenticated,error,loginWithRedirect } = useAuth0()
    const handleProfileMenuOpen = useStoreActions(actions=>actions.handleProfileMenuOpen)
    if(isLoading) return (<CircularProgress style={{'color': 'white'}} />)
    if(error) return (<div>Error</div>)
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