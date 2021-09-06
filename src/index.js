import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import './index.css';
import App from './components/app/app';

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import rootReducer from './store/reducers'

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('react')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
