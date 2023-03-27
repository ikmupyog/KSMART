import React from 'react'

const BornOutsideSummary = () => {
    const stateId = sessionStorage.getItem("stateId")
    console.log(stateId, "stateId");
  return (
    <div>BornOutsideSummary</div>
  )
}

export default BornOutsideSummary