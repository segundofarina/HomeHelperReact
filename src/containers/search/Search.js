import React, { Component } from 'react'
import SearchComponent from '../../components/Home/Search/Search'
import styles from './Search.module.css'
import defaultImg from '../../assets/img/defaultProfile.png'
import Profile from '../../components/search/result/profile'
import axios from 'axios'

class Search extends Component {

    state = {
        providers: [],
        maxPage: 0,
        currentPage: 0,
        pageSize: 0,
    }

    /* Get search results from api */
    async getSearchResults() {
        try {
            const ans = await axios.get('/providers')
            console.log(ans.data)
            const providers = ans.data.providers.map(provider => {
                return {

                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    componentDidMount() {
        this.getSearchResults()
    }
    
    render () {
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
                        calification={0}
                        id={1}/>
                    <Profile className={styles.Profile} 
                        name="Segundo Farina"
                        serviceTypes="Carpintero"
                        description={description}
                        img={defaultImg}
                        calification={2.5}
                        id={2}
                        />
                    <Profile className={styles.Profile} 
                        name="Segundo Farina"
                        serviceTypes="Carpintero"
                        description={description}
                        img={defaultImg}
                        calification={3}
                        id={3} />
                    <Profile className={styles.Profile} 
                        name="Segundo Farina"
                        serviceTypes="Carpintero"
                        description={description}
                        img={defaultImg}
                        calification={3.5}
                        id={4} />
                    <Profile className={styles.Profile} 
                        name="Segundo Farina"
                        serviceTypes="Carpintero"
                        description={description}
                        img={defaultImg}
                        calification={4.1}
                        id={5} /> 
                </div>
            </div>
        )
    }
}

export default Search