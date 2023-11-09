import React from 'react'

const PillCard = ({text}) => {
  return (
    <a className="btn btn-primary" style={{borderRadius:23}} href="#">{text}</a>
  )
}

export default PillCard