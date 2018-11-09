import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faStarHalfAlt } from '@fortawesome/free-solid-svg-icons'
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons'

const rating = (props) => {
    const star = <FontAwesomeIcon icon={faStar} />
    const halfStar = <FontAwesomeIcon icon={faStarHalfAlt} />
    const emptyStar = <FontAwesomeIcon icon={farStar} />
    
    let rating =[]
    let stars= parseInt(props.value,10) 
    
    let half 
    if(props.value-stars>0.25){
        half=true;
    }else{
        half=false;
    }
    let putted=false
    
    for (let i = 0; i < 5; i++) {
        if(i<stars){
            rating.push(star)
        }else if( half && !putted ){
            rating.push(halfStar)
            putted=true
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
