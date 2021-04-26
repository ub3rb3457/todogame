import React from "react"
import useSerialData from './hooks/useSerialData'
import ReactSpeedometer from "react-d3-speedometer"
function RPMGauge() {
  const serialData = useSerialData()
  return (
    <ReactSpeedometer
      width={200}
      maxValue={1024}
      value={serialData}
    />
  )
}
export default RPMGauge