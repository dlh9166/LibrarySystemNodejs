import React from 'react'
import RatingComponent from './RatingComponent'

const ComnunityReview = () => {
  return (
    <div>
        <div style={{fontSize: 24, fontWeight: 600}}>Community Reivews</div>
        <br />
        <RatingComponent expand={true} />
    </div>
  )
}

export default ComnunityReview