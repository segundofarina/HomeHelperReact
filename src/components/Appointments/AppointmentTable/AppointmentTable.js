import React from 'react'
import styles from './AppointmentTable.module.css'
import Panel from '../../UI/Panel/Panel'
import Table from '../../UI/Table/Table'
import Badge from '../../UI/Badge/Badge'
import Button from '../../UI/Button/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

const appointmentTable = (props) => {
    const elemStyles = [props.className, styles.AppointmentTable]

    const rows = props.rows.map(row => {
        const columns = [...row.columns]
        columns[4] = (<Badge type={columns[4].type}>{columns[4].value}</Badge>)
        if(columns.length > 5) {
            console.log(columns[5])
            if(columns[5] !== null) {
                columns[5] = (
                    <Button btnImpl='Link' to='/writeReview' btnType='XSmall' btnColor='Blue'>
                        <FontAwesomeIcon icon={faEdit} className={styles.ReviewIcon} />
                        Write review
                    </Button>
                )
            }
       }
        return {
            id: row.id,
            columns: columns,
        }
    })

    return (
        <div className={elemStyles.join(' ')}>
            <Panel>
                <div className={styles.Title}>
                    <h3>{props.title}</h3>
                </div>
                <div className={styles.TableContainer}>
                    <Table headers={props.headers}
                            rows={rows} />
                </div>
            </Panel>
        </div>
    )
}

export default appointmentTable