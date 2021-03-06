import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemLink from '@Components/ListItemLink';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTasks } from '@fortawesome/free-solid-svg-icons'


const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 240,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
}));

const MenuDrawer = (props) => {
    const classes = useStyles(); 

    return (
        <Drawer
            className={classes.drawer}
            classes={{
                paper: classes.drawerPaper,
            }}
            open={props.open} 
            onClose={props.toggleDrawer(false)}
        >
            <Toolbar />
            <div className={classes.drawerContainer}>
                <List>
                    <ListItemLink key="tasks" href="/tasks">
                        <ListItemIcon><FontAwesomeIcon icon={faTasks} size="lg" /></ListItemIcon>
                        <ListItemText primary="Tasks" />
                    </ListItemLink>
                </List>
                <Divider />
                <List>
                    <ListItemLink key="tasks" href="/tasks">
                        <ListItemIcon><FontAwesomeIcon icon={faTasks} size="lg" /></ListItemIcon>
                        <ListItemText primary="Tasks" />
                    </ListItemLink>
                </List>
            </div>
        </Drawer>
    )
}

export default MenuDrawer
