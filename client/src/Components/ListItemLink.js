import React, {} from 'react'
import {navigate} from 'hookrouter'
import {ListItem} from '@material-ui/core'
 
const ListItemLink = (props) => {
    const handleClick = () => {
        navigate(props.href)
    }
    return(
        <ListItem button onClick={handleClick} {...props}/>
    )
}
export default ListItemLink