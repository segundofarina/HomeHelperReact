import React, { Component } from 'react'
import styles from './ScoresDetails.module.css'
import Panel from '../../../../UI/Panel/Panel'
import ScoreRow from './ScoreRow/ScoreRow'

class ScoresDetails extends Component {
    state = {
        quality: false,
        price: false,
        punctuality: false,
        treatment: false,
        cleanness: false,
    }

    handleRowClick = (itemName) => {
        this.setState((prevState) => {
            const newState = {...prevState}
            newState[itemName] = !prevState[itemName]
            return newState
        })
    }

    render () {
        const details = {
            _1: 0,
            _2: 0,
            _3: 0,
            _4: 3,
            _5: 10,
            total: 13,
        }

        return (
            <Panel className={styles.ScoresDetails}>
                <ScoreRow className={styles.ScoreRow}
                            description='Quality'
                            showingDetails={this.state.quality}
                            onClick={() => this.handleRowClick('quality')}
                            details={details} />
                <ScoreRow className={styles.ScoreRow}
                            description='Price'
                            showingDetails={this.state.price}
                            onClick={() => this.handleRowClick('price')}
                            details={details} />
                <ScoreRow className={styles.ScoreRow}
                            description='Punctuality'
                            showingDetails={this.state.punctuality}
                            onClick={() => this.handleRowClick('punctuality')}
                            details={details}  />
                <ScoreRow className={styles.ScoreRow}
                            description='Treatment'
                            showingDetails={this.state.treatment}
                            onClick={() => this.handleRowClick('treatment')}
                            details={details}  />
                <ScoreRow className={styles.ScoreRow}
                            description='Cleanness'
                            showingDetails={this.state.cleanness}
                            onClick={() => this.handleRowClick('cleanness')}
                            details={details}  />
 
            </Panel>
        )
    }
} 

export default ScoresDetails