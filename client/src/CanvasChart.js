import React, {Component} from 'react'
import CanvasJSChart from './canvasjs.react'

let dps = [];
let xVal = dps.length + 1;
let yVal = 1024;
let updateInterval = 1000;

class CanvasChart extends Component {
	constructor(props) {
		super(props);
		this.updateChart = this.updateChart.bind(this);
	}
	componentDidMount() {
		setInterval(this.updateChart, updateInterval);
	}
	updateChart() {
		//fetch data from api
		this.chart.render();
	}
	render() {
		const options = {
			title :{
				text: "Dynamic Line Chart"
			},
			data: [{
				type: "line",
				dataPoints : dps
			}]
		}
		return (
		<div>
			<CanvasJSChart 
                options = {options}
				onRef={ref => this.chart = ref}
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}

export default CanvasChart;