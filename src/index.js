import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from 'axios'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import serviceTypesReducer from './store/reducers/serviceTypesReducer'
import searchDataReducer from './store/reducers/searchDataReducer'
import searchResultsReducer from './store/reducers/searchResultsReducer'
import chatReducer from './store/reducers/chatReducer'

axios.defaults.baseURL = 'http://localhost:8080/api'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    serviceTypes: serviceTypesReducer,
    searchData: searchDataReducer,
    searchResults: searchResultsReducer,
    chat: chatReducer,
})

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
