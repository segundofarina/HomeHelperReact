import React from 'react' 
import styles from './EmptyTable.module.css'
import Panel from '../../../UI/Panel/Panel'
import emptyImg from '../../../../assets/img/grua.png'
import Button from '../../../UI/Button/Button'

const emptyTable = (props) => {
    return (
        <div className={styles.EmptyTable}>
            <Panel className={styles.Panel}>
                <div className={styles.Title}>
                    <h3>{props.title}</h3>
                    <Button btnType='Small' 
                            className={styles.ChangeBtn}
                            btnColor='Dark' 
                            onClick={props.changeBtnOnClick}>
                        {props.changeBtnDescription}
                    </Button>
                </div>
                <img className={styles.Img} src={emptyImg} alt="" />
                <p className={styles.Description}>{props.description}</p>
            </Panel>
        </div>
    )
}

export default emptyTable