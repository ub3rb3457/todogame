import React from "react";
import axios from 'axios'
import { makeUseAxios } from "axios-hooks";
import Task from './Task'
import AddTask from "./AddTask";

const useAxios = makeUseAxios({
    axios: axios.create({ baseURL: 'http://localhost:3004' })
})


const Tasks = () => {
    const [{ data, loading, error }, refetch] = useAxios("/tasks");
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error!</p>;
    return (
        <>
            <AddTask useAxios={useAxios} nextID={data.length+1} refetch={refetch}/>
            <hr />
            { data.map(({id,name,done}) => (<Task key={id} name={name} done={done}/>)) }
        </>
    )
}
    
export default Tasks