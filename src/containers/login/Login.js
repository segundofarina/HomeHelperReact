import React, { Component } from 'react'
import styles from './Login.module.css'
import { Link, withRouter } from 'react-router-dom'
import Logo from '../../assets/img/HHLogo.png'
import Button from '../../components/UI/Button/Button'
import { connect } from 'react-redux'
import * as userDataActions from '../../store/actions/userDataActions'

class Login extends Component {

    state = {
        username: '',
        password: '',
        rememberMe: false,
    }

    handleUsernameChange = (event) => {
        this.setState({username: event.target.value})
    }

    handlePasswordChange = (event) => {
        this.setState({password: event.target.value})
    }

    handleRememberMeToggle = () => {
        this.setState((prevState) => {
            return {rememberMe: !prevState.rememberMe}
        })
    }

    handleSubmit = () => {
        /* Validate form */
        console.log(this.state)
        /* Sign up with the api */

        /* On success */
        this.props.authenticateUser()
        this.props.history.replace('/')

        /* On Failure */
        // Show error
    }

    render() {
        return (
            <div className={styles.LoginContainer}>
                <div className={styles.Form}>
                    <Link to="/" className={styles.Link}>
                        <img className={styles.Logo} src={Logo} alt="" />
                        <h2 className={styles.Title}>Home-Helper</h2>
                    </Link>
                    <input className={styles.Input}
                            onChange={this.handleUsernameChange}
                            type="text"
                            placeholder="Username"
                            value={this.state.username} />
                    <input className={styles.Input}
                            onChange={this.handlePasswordChange}
                            type="password"
                            placeholder="Password"
                            value={this.state.password} />
                    <div className={styles.Checkbox}>
                        <label>
                            <input type="checkbox" onClick={this.handleRememberMeToggle} value={this.state.rememberMe} />
                            Remember me!
                        </label>
                    </div>
                    <Button onClick={this.handleSubmit} className={styles.SignInBtn}>Log in</Button>
                    <div className={styles.Forgot}>
                        New User?
                        <Link to="/signup" className={styles.SignUp}>Register</Link>
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        authenticateUser: () => dispatch(userDataActions.updateAuthenticated(true))
    }
}

export default connect(null, mapDispatchToProps)(withRouter(Login))