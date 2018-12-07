import React, { Component } from 'react'
import styles from './CreateUser.module.css'
import Panel from '../../components/UI/Panel/Panel'
import defaultImg from '../../assets/img/defaultProfile.png'
import Input from '../../components/UI/Input/Input'

class CreateUser extends Component {

    render() {
        return (
            <div className={styles.CreateUser}>
                <div className={styles.Content}>
                    <h2>Sign up</h2>
                    <Panel className={styles.Panel}>
                        <div className={styles.Title}>
                            <div className={styles.ImgUploader}>
                                <img alt="" src={defaultImg} className={styles.Img} />
                                <div className={styles.ImgOverlay}></div>
                                <div className={styles.ImgText}>Profile image</div>
                            </div>
                        </div>
                        <div className={styles.Form}>
                            <div className={styles.Column}>
                                <Input className={styles.Input}
                                        label='First name:' />
                            </div>
                            <div className={styles.Column}>
fads
                            </div>
                        </div>
                    </Panel>
                </div>
           </div>
        )
    }
}

export default CreateUser