import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import styles from './App.module.css'
import Layout from './hoc/Layout/Layout'
import Home from './containers/home/Home'
import Search from './containers/search/Search'


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className={styles.app}>
          <Layout>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/search" exact component={Search} />

              <Route render={() => (<h1>404 Not found</h1>)} />
            </Switch>
          </Layout>
        </div>
      </BrowserRouter>
   );
  }
}

export default App;
