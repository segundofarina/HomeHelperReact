import React, { Component } from 'react'
import styles from './CreateUser.module.css'
import Panel from '../../components/UI/Panel/Panel'
import defaultImg from '../../assets/img/defaultProfile.png'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import FormValidator from '../../FormValidator/FormValidator'

class CreateUser extends Component {

    /* Form validation */
    validator = new FormValidator([
        {
            field: 'username',
            method: 'isAlphanumeric',
            validWhen: true,
            message: 'Please fill a valid address'
         },{
            field: 'password',
            method: 'isLength',
            validWhen: true,
            message: 'Please select a service type'
        },{
            field: 'repeatPass',
            method: 'isLength',
            validWhen: true,
            message: 'Please fill a valid address'
        },{
            field: 'email',
            method: 'isEmail',
            validWhen: true,
            message: 'Please fill a valid address',
        },{
            field: 'firstname',
            method: 'isAlphanumeric',
            validWhen: true,
            message: 'Please fill a valid address',
        },{
            field: 'lastname',
            method: 'isAlphanumeric',
            validWhen: true,
            message: 'Please fill a valid address',
        },{
            field: 'address',
            method: 'isEmpty',
            validWhen: false,
            message: 'Please fill a valid address',
        },{
            field: 'phone',
            method: 'isMobilePhone',
            validWhen: true,
            message: 'Please fill a valid address',
        }

    ])

    submitted = false



    state = {
        image: '',
        imagePreviewUrl: '',
        username: '',
        password: '',
        repeatPass:'',
        email:'',
        firstname:'',
        lastname:'',
        address:'',
        phone:'',
        validation: this.validator.valid()
    };



    inputChangeHanlder(e,prop){
        const newState = {...this.state}
            newState[prop]=e.target.value
        this.setState(  
            newState    
        )
    }

    onSubmitCreateHandler = () => {
        const validation = this.validator.validate({
            username: this.state.username,
            password: this.state.password,
            repeatPass: this.state.repeatPass,
            email: this.state.email,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            address: this.state.address,
            phone: this.state.phone,
        })

        this.setState({validation})
        this.submitted = true
        if(validation.isValid) {
            this.props.searchDataUpdate(this.state.location, this.state.serviceType, this.state.coords)
            this.props.searchResultsUpdate(this.state.serviceType, this.state.coords)
            this.props.history.push(`/search?st=${this.state.serviceType}&lat=${this.state.coords.lat}&lng=${this.state.coords.lng}&addr=${btoa(this.state.location)}`)
        }
    }

    imageChangeHandler(e){
        e.preventDefault();

        let reader = new FileReader()
        let file = e.target.files[0];

        reader.onloadend = () => {
        this.setState({
            image: file,
            imagePreviewUrl: reader.result
        });
        }
        reader.readAsDataURL(file)
    }
    render() {
        let validation = this.submitted ?              
            this.validator.validate({
                username: this.state.username,
                password: this.state.password,
                repeatPass: this.state.repeatPass,
                email: this.state.email,
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                address: this.state.address,
                phone: this.state.phone,
            }) : this.state.validation  

        const inputStyle = [styles.Input]
        if(validation.username.isInvalid) {
            inputStyle.push(styles.ValidationError)
        }
        let imagePreviewUrl = this.state.imagePreviewUrl;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = imagePreviewUrl
        } else {
            $imagePreview = defaultImg
        }
        return (
            <div className={styles.CreateUser}>
                <div className={styles.Content}>
                    <h2>Sign up</h2>
                    <Panel className={styles.Panel}>
                        <div className={styles.Title}>
                            <div className={styles.ImgUploader}>
                                <img alt="" src={$imagePreview} className={styles.Img} />
                                <div className={styles.ImgOverlay}></div>
                                <input className={styles.FileInput} 
                                    type="file" 
                                    onChange={(e)=>this.imageChangeHandler(e)} />
                                <div className={styles.ImgText}>Profile image</div>
                            </div>
                        </div>
                        <div className={styles.Form}>
                        <div className={styles.Column}>
                                <Input groupstyle={inputStyle}
                                        onChange={(e)=> this.inputChangeHanlder(e,"username")}
                                        label='Username:' />
                                <Input type="password" groupstyle={styles.Input}
                                        onChange={(e)=> this.inputChangeHanlder(e,"password")}
                                        label='Password:' />
                                <Input type="password" groupstyle={styles.Input}
                                        onChange={(e)=> this.inputChangeHanlder(e,"repeatPass")}
                                        label='Repeat Password:' />
                                <Input groupstyle={styles.Input}
                                        onChange={(e)=> this.inputChangeHanlder(e,"email")}
                                        label='Email:' />
                            </div>
                            <div className={styles.Column}>
                                <Input groupstyle={styles.Input}
                                        onChange={(e)=> this.inputChangeHanlder(e,"firstname")}
                                        label='First name:' />
                                <Input groupstyle={styles.Input}
                                        onChange={(e)=> this.inputChangeHanlder(e,"lastname")}
                                        label='Last name:' />
                                <Input groupstyle={styles.Input}
                                        onChange={(e)=> this.inputChangeHanlder(e,"address")}
                                        label='Address:' />
                                <Input groupstyle={styles.Input}
                                        onChange={(e)=> this.inputChangeHanlder(e,"phone")}
                                        label='Phone:' />
                            </div>
                        </div>
                        <Button className={styles.Button}
                        onClick={this.onSubmitCreateHandler}>Create user</Button>
                            
                    </Panel>
                </div>
           </div>
        )
    }
}

export default CreateUser