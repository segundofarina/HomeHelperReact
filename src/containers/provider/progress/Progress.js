import React, { Component } from 'react'
import styles from './Progress.module.css'
import MultiButton from '../../../components/UI/MultiButton/MultiButton'
import Scores from '../../../components/Provider/Progress/Scores/Scores'
import Reviews from '../../../components/Provider/Progress/Reviews/Reviews'

class Progress extends Component {
    state = {
        showingScores: true,
    }

    handleBtnChange = () => {
        this.setState((prevState) => {return {showingScores: !prevState.showingScores}})
    }

    render() {
        const multibuttons = [{
            id: 1,
            text: 'Scores',
            onClick: this.handleBtnChange,
        }, {
            id: 2,
            text: 'Reviews',
            onClick: this.handleBtnChange,
        }]

        let changeBtnActive = 1
        if(!this.state.showingScores) {
            changeBtnActive = 2
        }

        let element = (
            <Scores />
        )
        if(!this.state.showingScores) {
            element = (
                <Reviews />
            )
        }

        return (
            <div className={styles.Progress}>
                <div>
                    <h2 className={styles.SectionTitle}>Progress</h2>
                    <MultiButton elements={multibuttons} active={changeBtnActive} className={styles.Multibutton} />
                    <div className={styles.Container}>
                        {element}
                    </div>
               </div>
           </div>
        )
    }
}

export default Progress