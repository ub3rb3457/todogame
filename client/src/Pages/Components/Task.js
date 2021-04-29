import React from 'react'

const Task = (props) => {
    const { name, done } = props

    return (
        <>
            <p>{name} {(done)?'done':'not done'}</p>
        </>
    )
}

export default Task
