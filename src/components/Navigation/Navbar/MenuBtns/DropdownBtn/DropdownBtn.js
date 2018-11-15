import React, { Component } from 'react'
import styles from './DropdownBtn.module.css'
import DropdownItemBtn from './DropdownItemBtn/DropdownItemBtn'
import defaultProfileImage from '../../../../../assets/img/defaultProfile.png'

class DropdownBtn extends Component {
    state = {
        open: false,
    }

    toggleOpen = () => {
        this.setState((prevState) => ({open: !prevState.open}))
    }

    setWrapperRef = (node) => {
        this.wrapperRef = node
    }

    handleClickOutside = (event) => {
        if(this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.setState({open: false})
        }
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside)
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside)
    }
   
    render() {
        let profileImage = this.props.img
        if(!profileImage) {
            profileImage = defaultProfileImage
        }

        const listStylesArr = [styles.dropdownList]
        if(this.state.open) {
            listStylesArr.push(styles.open)
        }

        return (
            <div ref={this.setWrapperRef}>
                <div className={styles.dropdownHeader}
                    onClick={this.toggleOpen}>
                    <img src={profileImage} alt="" />
                    <span>{this.props.name}</span>
                    
                </div>
                <div className={listStylesArr.join(' ')}>
                    <DropdownItemBtn />
                    <DropdownItemBtn />
                </div>
            </div>
        )
    }
}

export default DropdownBtn