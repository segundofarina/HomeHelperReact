import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faStarHalfAlt } from '@fortawesome/free-solid-svg-icons'
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons'

const rating = (props) => {
    const star = <FontAwesomeIcon icon={faStar} />
    const halfStar = <FontAwesomeIcon icon={faStarHalfAlt} />
    const emptyStar = <FontAwesomeIcon icon={farStar} />
    const value = props.value

    let rating =[]
    let stars= parseInt(value,10) 
    
    let half 
    if(value-stars<0.25){
        half=false
    }else if(value-stars<0.75){
        half=true
    }else{
        half=false
        stars+=1
    }
    let pushedHalfStar=false
    
    for (let i = 0; i < 5; i++) {
        if(i<stars){
            rating.push(star)
        }else if( half && !pushedHalfStar ){
            rating.push(halfStar)
            pushedHalfStar=true
        }else{
            rating.push(emptyStar)
        }
    }
    return (
        <div >
            {rating}
        </div>
    )
}

export default rating
