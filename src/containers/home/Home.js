import React, {Component} from 'react'
import Search from '../../components/Home/Search/Search'
import style from './Home.module.css'

class Home extends Component {
    render() {
        return (
            <div className={style.MainContent}>
                <h1>Bienvendio a Home Helper!</h1>
                <Search className={style.Search} />
            </div>
        )
    }
}

export default Home;