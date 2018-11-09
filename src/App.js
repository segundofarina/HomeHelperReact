import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import styles from './App.module.css'
import Layout from './hoc/Layout/Layout'
import Home from './containers/home/Home'


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className={styles.app}>
          <Layout>
            <Route path="/" exact component={Home} />
          </Layout>
        </div>
      </BrowserRouter>
   );
  }
}

export default App;
