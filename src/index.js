import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom"

import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './modules';
import Axios from 'axios';

const store = createStore(rootReducer) // DevTools.instrument()
Axios.defaults.baseURL='http://18.234.107.127:8080/';
Axios.defaults.headers.common['X-AUTH-TOKEN']=localStorage.getItem('token');
Axios.defaults.headers.common['E-MAIL-TOKEN']=localStorage.getItem('E-mail');
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,

  document.getElementById('root')
);
