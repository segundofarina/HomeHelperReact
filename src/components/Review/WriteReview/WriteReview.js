import React, { Component } from 'react'
import styles from './WriteReview.module.css'
import Panel from '../../UI/Panel/Panel'
import ReviewItem from './ReviewItem/ReviewItem'
import Button from '../../UI/Button/Button'
import { withRouter } from 'react-router-dom'

class writeReview extends Component {
    state = {
        quality: 0,
        treatment: 0,
        price: 0,
        cleanness: 0,
        punctuality: 0,
        description: '',
    }

    handleDescriptionChange = (event) => {
        this.setState({description: event.target.value})
    }

    handleQualityChange = (name, rating) => {
        this.setState((prevState) => {
            const newState = {...prevState}
            newState[name] = rating
            return newState
        })
    }

    handleSendBtn = () => {
        /* Validate all inputs */
        console.log(this.state)
        console.log(this.props)
        this.props.history.replace('/appointments')
    }

    render() {
        return (
            <Panel className={styles.Panel}>
                <div className={styles.Container}>
                    <h3 className={styles.Title}>Write a review</h3>
                    <h5 className={styles.Subtitle}>Califica al proveedor</h5>
                    <div className={styles.StarsContainer}>
                        <ReviewItem label='Quality:' rating={this.state.quality} handleChangeRating={(rating) => this.handleQualityChange('quality', rating)} />
                        <ReviewItem label='Treatment:' rating={this.state.treatment} handleChangeRating={(rating) => this.handleQualityChange('treatment', rating)} />
                        <ReviewItem label='Price:' rating={this.state.price} handleChangeRating={(rating) => this.handleQualityChange('price', rating)} />
                        <ReviewItem label='Cleanness:' rating={this.state.cleanness} handleChangeRating={(rating) => this.handleQualityChange('cleanness', rating)} />
                        <ReviewItem label='Punctuality:' rating={this.state.punctuality} handleChangeRating={(rating) => this.handleQualityChange('punctuality', rating)} />
                    </div>
                    <div className={styles.Description}>
                        <label>Write a review</label>
                        <textarea placeholder='Write a review...'
                                value={this.state.description}
                                onChange={this.handleDescriptionChange}></textarea>
                    </div>
                    <Button btnType='Small'
                            className={styles.SendBtn}
                            onClick={this.handleSendBtn}>
                            Send
                    </Button>
                </div>
            </Panel>
        ) 
    }
}

export default withRouter(writeReview)