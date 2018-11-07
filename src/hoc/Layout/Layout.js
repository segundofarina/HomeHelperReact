import React, {Fragment} from 'react'
import Navbar from '../../components/Navigation/Navbar/Navbar'
import Footer from '../../components/Navigation/Footer/Footer'

const Layout = props => (
    <Fragment>
        <Navbar />
        <div style={{flexShrink: 0, flexGrow: 1}}>
            {props.children}
        </div>
        <Footer />
    </Fragment>
)

export default Layout