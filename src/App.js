import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import styles from './App.module.css'
import Layout from './hoc/Layout/Layout'
import Home from './containers/home/Home'
import Search from './containers/search/Search'
import Profile from './containers/profile/Profile'
import Messages from './containers/messages/Messages'
import Login from './containers/login/Login'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className={styles.app}>
          <Switch>
            <Route path="/login" exact component={Login} />
            <Layout>
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/search" exact component={Search} />
                <Route path="/profile" exact component={Profile} />
                <Route path="/messages" exact component={Messages} />
                <Route render={() => (<h1>404 Not found</h1>)} />
              </Switch>
            </Layout>
          </Switch>
       </div>
      </BrowserRouter>
   );
  }
}

export default App;
