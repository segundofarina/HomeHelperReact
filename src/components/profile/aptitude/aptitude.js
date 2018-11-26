import React from 'react'
import Panel from '../../UI/Panel/Panel'
import styles from './aptitude.module.css'
import Calification from '../calification/calification'
import Review from '../../profile/review/review'
import defaultImg from '../../../assets/img/defaultProfile.png'

const aptitude = (props)=>{

    let description = "Realizo la ronovacion del cableado de toda la casa, colocando el tablero nuevo con varios circuitos. Estamos muy conformes con el trabajo y con la predisposición ante todos los pedidos. Saludos y muchas gracias."

    return(
        <div>
            <div>
                <div className={styles.Header}>
                    <h3>{props.name}</h3>
                </div>
                <div className={styles.Container}>
                    <Panel className={styles.Description}>
                        <p>{props.description}</p>
                    </Panel>
                    <div className={styles.Calification}>
                        <Calification 
                            general={4}
                            quality={4.5}
                            price={4.9}
                            puncutality={4.2}
                            treatment= {3.8}
                            cleanness={2.9}
                        />

                    </div>
                </div>
            </div>
            <div>
                <h4>Opiniones de clientes</h4>
                <Panel>
                    <Review
                        name = "Marcos Lopez"
                        date = "16/05/2018"
                        rating ={4}
                        description = {description}
                        img = {defaultImg}

                    />
                    <hr/>
                    <Review
                        name = "Marcos Lopez"
                        date = "16/05/2018"
                        rating ={4}
                        description = {description}
                        img = {defaultImg}

                    />
                    <hr/>
                    <Review
                        name = "Marcos Lopez"
                        date = "16/05/2018"
                        rating ={4}
                        description = {description}
                        img = {defaultImg}

                    />
                    <hr/>
                    <Review
                        name = "Marcos Lopez"
                        date = "16/05/2018"
                        rating ={4}
                        description = {description}
                        img = {defaultImg}

                    />
                    <hr/>
                    <Review
                        name = "Marcos Lopez"
                        date = "16/05/2018"
                        rating ={4}
                        description = {description}
                        img = {defaultImg}

                    />
                    <hr/>
                </Panel>
            </div>
        </div>
    )}

export default aptitude