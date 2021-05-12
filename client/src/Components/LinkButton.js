import React from 'react'
import {setLinkProps} from 'hookrouter'

const LinkButton = (props) => {
    return <button {...setLinkProps(props)} className="myButton">Click me now</button>
}
export default LinkButton
