import React, {useEffect, useContext} from 'react'
import axios from "axios"
import { Context } from './Store'
import EntryModel from '@Models/Entry'

const Journal = () => {
    

    useEffect(() => {
        axios.get('/entries').then(response => {
            const entriesData = response.data
            dispatch({type: 'SET_ENTRIES', payload: entriesData})
        }).catch(error => {
            dispatch({type: 'SET_ERROR', payload: error})
        })
    }, [])

    let entries = <p>Loading...</p>;

    if (state.error) entries = <p>Something went wrong: <span>{state.error}</span></p>
    
    if (!state.error && state.entries) {
        entries = state.entries.map(entry => {
            return (
                <Entry
                    key={entry.id}
                    title={entry.title}
                    author={entry.author}
                />
            )
        })
    }
    return {entries}
}
export default Journal