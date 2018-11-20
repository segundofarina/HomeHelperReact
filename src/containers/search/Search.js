import React, { Component } from 'react'
import SearchComponent from '../../components/Home/Search/Search'
import styles from './Search.module.css'
import defaultImg from '../../assets/img/defaultProfile.png'
import Profile from '../../components/search/result/profile'
import { connect } from 'react-redux'

class Search extends Component {

    render () {
        let results = this.props.searchResults.providers.map(provider => {
            return (<Profile className={styles.Profile}
                            name={`${provider.firstName} ${provider.lastName}`}
                            serviceTypes="Carpintero"
                            description={provider.description}
                            img={defaultImg}
                            calification={provider.generalCalification}
                            id={provider.id}
                            />)
        })

        return (
            <div className={styles.Container}>
                <div className={styles.LeftPanel}>
                    <SearchComponent
                        className={styles.SearchComponent}
                        keepMemory />
                </div>
                <div className={styles.Results}>
                    {results}
               </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        searchResults: state.searchResults,
    }
}

export default connect(mapStateToProps)(Search)