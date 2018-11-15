import React,{Component} from 'react'
import SearchComponent from '../../components/Home/Search/Search'
import styles from './Search.module.css'
import defaultImg from '../../assets/img/defaultProfile.png'
import Profile from '../../components/search/result/profile'

class Search extends Component{
    
    render (){
       let description = 'Diseñamos y Fabricamos todo tipo de muebles a medida para hogares y proyectos comerciales Trabajamos con todo tipo de materiales y adaptamos el presupuesto a cada necesidad'
    
        return (
            <div className={styles.Container}>
                <div className={styles.LeftPanel}>
                    <SearchComponent
                    serviceTypeDefault={{value:"",name:"Por favor seleccione un tipo de servicio"}}
                    serviceTypeOptions={[]}
                    className={styles.SearchComponent}
                    />
                </div>
                <div className={styles.Results}>
                    <Profile className={styles.Profile} 
                    name="Segundo Farina"
                    serviceTypes="Carpintero"
                    description={description}
                    img={defaultImg}
                    calification={5}/>
                    <Profile className={styles.Profile} 
                    name="Segundo Farina"
                    serviceTypes="Carpintero"
                    description={description}
                    img={defaultImg}
                    calification={2.5}/>
                    <Profile className={styles.Profile} 
                    name="Segundo Farina"
                    serviceTypes="Carpintero"
                    description={description}
                    img={defaultImg}
                    calification={3}/>
                    <Profile className={styles.Profile} 
                    name="Segundo Farina"
                    serviceTypes="Carpintero"
                    description={description}
                    img={defaultImg}
                        calification={3.5}/>
                    <Profile className={styles.Profile} 
                    name="Segundo Farina"
                    serviceTypes="Carpintero"
                    description={description}
                    img={defaultImg}
                    calification={4.1}/> 
                </div>
                


            </div>
        )
    }
}

export default Search