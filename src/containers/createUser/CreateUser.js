import React, { Component } from 'react'
import styles from './CreateUser.module.css'
import Panel from '../../components/UI/Panel/Panel'
import defaultImg from '../../assets/img/defaultProfile.png'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import FormValidator from '../../FormValidator/FormValidator'

class CreateUser extends Component {

    passwordMatch = (confirmation, state) => (state.password === confirmation)

    /* Form validation */
    validator = new FormValidator([
        {
            field: 'username',
            method: 'isEmpty',
            validWhen: false,
            message: 'Please fill a valid username'
         },{
            field: 'password',
            method: 'isLength',
            args: [{min: 8}],
            validWhen: true,
            message: 'The password should be at least 8 characters'
        },{
            field: 'repeatPass',
            method: 'isLength',
            args: [{min: 8}],
            validWhen: true,
            message: 'The password should be at least 8 characters'
        },{
            field: 'repeatPass',
            method: this.passwordMatch,
            validWhen: true,
            message: 'The passwords should match',
        },{
            field: 'email',
            method: 'isEmail',
            validWhen: true,
            message: 'Please fill a valid email',
        },{
            field: 'firstname',
            method: 'isEmpty',
            validWhen: false,
            message: 'Please fill a name',
        },{
            field: 'lastname',
            method: 'isEmpty',
            validWhen: false,
            message: 'Please fill a last name',
        },{
            field: 'address',
            method: 'isEmpty',
            validWhen: false,
            message: 'Please fill a valid address',
        },{
            field: 'phone',
            method: 'isInt',
            validWhen: true,
            message: 'Please fill a valid phone',
        },{
            field: 'phone',
            method: 'isLength',
            args: [{min : 7, max: 11}],
            validWhen: true,
            message: 'Please fill a valid phone',
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
            console.log('isValid')
            //this.props.searchDataUpdate(this.state.location, this.state.serviceType, this.state.coords)
            //this.props.searchResultsUpdate(this.state.serviceType, this.state.coords)
            //this.props.history.push(`/search?st=${this.state.serviceType}&lat=${this.state.coords.lat}&lng=${this.state.coords.lng}&addr=${btoa(this.state.location)}`)
        }else{
            console.log('not valid')
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

        const userStyles = [styles.Input]
        if(validation.username.isInvalid) {
            userStyles.push(styles.ValidationError)
        }

        const passwordStyles = [styles.Input]
        if(validation.password.isInvalid) {
            passwordStyles.push(styles.ValidationError)
        }

        const repeatPassStyles = [styles.Input]
        if(validation.repeatPass.isInvalid) {
            repeatPassStyles.push(styles.ValidationError)
        }

        const emailStyles = [styles.Input]
        if(validation.email.isInvalid) {
            emailStyles.push(styles.ValidationError)
        }

        const firstnameStyles = [styles.Input]
        if(validation.firstname.isInvalid) {
            firstnameStyles.push(styles.ValidationError)
        }

        const lastnameStyles = [styles.Input]
        if(validation.lastname.isInvalid) {
            lastnameStyles.push(styles.ValidationError)
        }

        const addressStyles = [styles.Input]
        if(validation.address.isInvalid) {
            addressStyles.push(styles.ValidationError)
        }

        const phoneStyles = [styles.Input]
        if(validation.phone.isInvalid) {
            phoneStyles.push(styles.ValidationError)
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
                                <Input groupstyle={userStyles.join(' ')}
                                        onChange={(e)=> this.inputChangeHanlder(e,"username")}
                                        label='Username:'
                                        validationError={validation.username.message} />
                                <Input type="password" groupstyle={passwordStyles.join(' ')}
                                        onChange={(e)=> this.inputChangeHanlder(e,"password")}
                                        label='Password:'
                                        validationError={validation.password.message} />
                                <Input type="password" groupstyle={repeatPassStyles.join(' ')}
                                        onChange={(e)=> this.inputChangeHanlder(e,"repeatPass")}
                                        label='Repeat Password:'
                                        validationError={validation.repeatPass.message} />
                                <Input groupstyle={emailStyles.join(' ')}
                                        onChange={(e)=> this.inputChangeHanlder(e,"email")}
                                        label='Email:'
                                        validationError={validation.email.message} />
                            </div>
                            <div className={styles.Column}>
                                <Input groupstyle={firstnameStyles.join(' ')}
                                        onChange={(e)=> this.inputChangeHanlder(e,"firstname")}
                                        label='First name:'
                                        validationError={validation.firstname.message} />
                                <Input groupstyle={lastnameStyles.join(' ')}
                                        onChange={(e)=> this.inputChangeHanlder(e,"lastname")}
                                        label='Last name:'
                                        validationError={validation.lastname.message} />
                                <Input groupstyle={addressStyles.join(' ')}
                                        onChange={(e)=> this.inputChangeHanlder(e,"address")}
                                        label='Address:'
                                        validationError={validation.address.message} />
                                <Input groupstyle={phoneStyles.join(' ')}
                                        onChange={(e)=> this.inputChangeHanlder(e,"phone")}
                                        label='Phone:'
                                        validationError={validation.phone.message} />
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