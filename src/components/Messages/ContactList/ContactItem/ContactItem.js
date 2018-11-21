import React from 'react'
import styles from './ContactItem.module.css'
import defaultImg from '../../../../assets/img/defaultProfile.png'

const contactItem = (props) => {

    let previewMsg = props.previewMsg.substr(0, 25)
    if(props.previewMsg && props.previewMsg.length > 25) {
        previewMsg += '...'
    }

    return (
        <div className={styles.ContactItem} onClick={props.onClick}>
            <div className={styles.Wrap}>
                <img src={defaultImg} alt="" className={styles.ProfilePicture} />
                <div className={styles.ContactInfo}>
                    <p className={styles.Name}>
                        {props.name}
                    </p>
                    <p className={styles.Msg}>
                        {previewMsg}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default contactItem