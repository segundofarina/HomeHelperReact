import React,{Component} from 'react'
import SearchComponent from '../../components/Home/Search/Search'
import Panel from '../../components/UI/Panel/Panel'
import styles from './Search.module.css'
import Profile from '../../components/search/result/profile'

class Search extends Component{


    render (){
        return (
            <div className={styles.Container}>
                <div className={styles.leftPanel}>
                    <SearchComponent/>
                </div>
                <div className={styles.results}>
                    <Profile/>
                </div>
                


            </div>
        )
    }
}

export default Search