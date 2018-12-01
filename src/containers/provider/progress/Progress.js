import React, { Component } from 'react'
import styles from './Progress.module.css'
import Panel from '../../../components/UI/Panel/Panel'
import MultiButton from '../../../components/UI/MultiButton/MultiButton'

class Progress extends Component {
    render() {
        const multibuttons = [{
            id: 1,
            text: 'Scores',
            onClick: () => {},
        }, {
            id: 2,
            text: 'Reviews',
            onClick: () => {},
        }]

        return (
            <div className={styles.Progress}>
                <div className={styles.Container}>
                    <h2 className={styles.SectionTitle}>Progress</h2>
                    <MultiButton elements={multibuttons} active={1} className={styles.Multibutton} />
                    <Panel className={styles.Panel}>
                        Progress
                    </Panel>
                </div>
           </div>
        )
    }
}

export default Progress