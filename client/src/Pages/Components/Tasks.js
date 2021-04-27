import React from "react";
import axios from 'axios'
import { makeUseAxios } from "axios-hooks";
import Task from './Task'

const useAxios = makeUseAxios({
    axios: axios.create({ baseURL: 'http://localhost:3004' })
})

const Tasks = () => {
    const [{ data, loading, error }] = useAxios("/tasks");
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error!</p>;
    return (
        data.map(({id,name,done}) => (
            <Task name={name} done={done}/>
        ))
    )
}
    
export default Tasks