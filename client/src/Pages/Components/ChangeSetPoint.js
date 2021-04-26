import React, { Fragment } from 'react';
import {useSelector, useDispatch} from 'react-redux';

const ChangeSetPoint = () => {
    //Get the whole state from characterReducer
    const person = useSelector(state => state.characters);

    //Use for all the dispatch actions
    const dispatch = useDispatch();

    return (
    <Fragment>
        <input
            value={person.name}
            id="name"
            type="text"
            onChange={e => dispatch({type: 'CHANGE_NAME', payload: e.target.value})}/>
        <label htmlFor="name" className="active">Name</label>

        <input
            value={person.occupation}
            id="occupation"
            type="text"
            onChange={e => dispatch({type: 'CHANGE_OCCUPATION', payload: e.target.value})}/>
        <label htmlFor="occupation" className="active">Occupation</label>

        <input
            value={person.age}
            id="age"
            type="number"
            onChange={e => dispatch({type: 'CHANGE_AGE', payload: e.target.value})}/>
        <label htmlFor="age" className="active">Age</label>
    </Fragment>         
    );
}

export default ChangeSetPoint