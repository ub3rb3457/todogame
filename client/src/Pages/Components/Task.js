import React, {useState} from 'react'
import Checkbox from '@material-ui/core/Checkbox'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import TaskOptions from './TaskOptions'

const Task = (props) => {
    const [checked, setChecked] = useState(true)
    const handleChange = (e) => { setChecked(e.target.checked) }
    return (
        <Card>
            <CardContent>
                <TaskOptions data={props}/>
            </CardContent>
            <CardActions>
                <Checkbox
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                /> 
            </CardActions>
        </Card>       
    )
}

export default Task
