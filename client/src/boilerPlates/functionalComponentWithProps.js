import React, { useState, useEffect } from "react"
import PropTypes from 'prop-types'

function ChangeMe(props) {
  const { index, ...other } = props //access the prop values 
  const [val,setVal] = useState('')

  useEffect(() => {
    
  },[])//adding the array as a 2nd parameter ensures the effect is applied once per render
  return ('')
  
}
ChangeMe.propTypes = { //assurance that data passed in is the correct type
  index: PropTypes.any.isRequired,
};

export default ChangeMe