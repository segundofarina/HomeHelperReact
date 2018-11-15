import React, { Component } from 'react'
import styles from './DropdownBtn.module.css'
import DropdownItemBtn from './DropdownItemBtn/DropdownItemBtn'
import defaultProfileImage from '../../../../../assets/img/defaultProfile.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

class DropdownBtn extends Component {
    state = {
        open: false,
    }

    toggleOpen = () => {
        this.setState((prevState) => ({open: !prevState.open}))
    }

    closeList = () => {
        this.setState({open: false})
    }

    setWrapperRef = (node) => {
        this.wrapperRef = node
    }

    handleClickOutside = (event) => {
        if(this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.closeList()
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

        const headerStylesArr = [styles.dropdownHeader]
        if(this.state.open) {
            headerStylesArr.push(styles.open)
        }

        return (
            <div ref={this.setWrapperRef}>
                <div className={headerStylesArr.join(' ')}
                    onClick={this.toggleOpen}>
                    <img src={profileImage} alt="" />
                    <span>{this.props.name}</span>
                    <FontAwesomeIcon icon={faChevronDown} className={styles.dropdownIcon} />
                </div>
                <div className={listStylesArr.join(' ')}>
                    <DropdownItemBtn to="/createProvider"
                                    onClick={this.closeList}>
                        Crear perfil del proveedor
                    </DropdownItemBtn>
                    <DropdownItemBtn to="/settings"
                                    onClick={this.closeList}>
                        Configuracion
                    </DropdownItemBtn>
                    <DropdownItemBtn icon="logout"
                                    to="/logout"
                                    onClick={this.closeList}>
                        Cerrar Sesion
                    </DropdownItemBtn>
                </div>
            </div>
        )
    }
}

export default DropdownBtn