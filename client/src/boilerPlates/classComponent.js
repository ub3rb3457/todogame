import React, {Component} from 'react'
import PropTypes from 'prop-types'

class ClassComponent extends Component {
	constructor(props) {
		super(props); //always call 1st
		this.state = {} 
		this.testMethod = this.testMethod.bind(this);
	}
	static defaultProps = {
		name: 'b3457m0d3'
	}
	testMethod() { //binding the method gives you access to the instance keyword *this*
		
	}
	//Life-Cycle Methods
	componentDidMount() { // called after the initial render
		
	}
	componentWillUnmount(){// called before a component is removed
		//!!! do not call setState() in this method !!!!
		// you can handle any necessary clean up here 
	}
	
	render() {
		const options = { } 
		return (
		<div>
			
		</div>
		);
	}
}

ClassComponent.propTypes = {
	name: PropTypes.string 
	/*******Valid PropType values***************
	* any, array, bool, func, number, object, symbol
	* node, element, elementType, instanceOf(ClassName)
	* oneOf(arrayOfItems), oneOfType(arrayOfPropTypes)
	* arrayOf(PropType), objectOf(PropType)
	* adding '.isRequired' to the end of the PropType makes it required
	*********************************************/
  }

export default ClassComponent;