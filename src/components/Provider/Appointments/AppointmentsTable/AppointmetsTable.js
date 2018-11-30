import React from 'react'
import styles from './AppointmentsTable.module.css'
import Panel from '../../../UI/Panel/Panel'
import Table from '../../../UI/Table/Table'
import Button from '../../../UI/Button/Button'

const appointmentTable = (props) => {
    const elemStyles = [props.className, styles.AppointmentTable]

    return (
        <div className={elemStyles.join(' ')}>
            <Panel>
                <div className={styles.Title}>
                    <h3>{props.title}</h3>
                    <Button btnType='Small' 
                            className={styles.ChangeBtn}
                            btnColor='Dark' 
                            onClick={props.changeBtnOnClick}>
                        {props.changeBtnDescription}
                    </Button>
                </div>
                <div className={styles.TableContainer}>
                    <Table headers={props.headers}
                            rows={props.rows} />
                </div>
            </Panel>
        </div>
    )
}

export default appointmentTable