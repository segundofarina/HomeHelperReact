import React from 'react'
import styles from './review.module.css'
import Rating from '../../UI/rating/Rating'

const Review = (props)=>{
    return(
        <div className={styles.Container}>
            <div className={styles.ProfileInfo}>
                <div className={styles.ProfileImg}>
                    <img src={props.img} alt="" />
                </div>
                <h5 className={styles.Name}>{props.name}</h5>
            </div>
            <div className={styles.Data}>
                <div className={styles.Header}>
                    <div >{props.date}</div>
                    <span className={styles.Divider}>&#x25CF;</span>
                    <Rating value={props.rating}/>
                </div>
                <div className={styles.Description}>
                    <p>{props.description}</p>
                </div>
            </div>
        </div>
    )
}

export default Review 