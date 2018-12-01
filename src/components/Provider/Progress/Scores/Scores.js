import React from 'react'
import styles from './Scores.module.css'
import ProfileDetails from './ProfileDetails/ProfileDetails'
import ScoresDetails from './ScoresDetails/ScoresDetails'

const scores = () => {
    return (
        <div className={styles.ScoresContainer}>
            <div className={styles.ProfileInfo}>
                <ProfileDetails name='Martin Victory'
                                generalCalification={4.3}/>
            </div>
            <div className={styles.ScoresInfo}>
                <ScoresDetails />
            </div>

        </div>
    )
}

export default scores