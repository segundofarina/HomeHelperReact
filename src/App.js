import React, { Component } from 'react'
import styles from './App.module.css'
import Layout from './hoc/Layout/Layout'
import Home from './containers/home/Home'


class App extends Component {
  render() {
    return (
      <div className={styles.app}>
        <Layout>
          <Home/>
        </Layout>
      </div>
    );
  }
}

export default App;
