import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import { createStore } from 'redux';
import rootReducer from './redux/modules';

import { Provider } from "react-redux";
const store = createStore(rootReducer);
console.log(store.getState());

ReactDOM.render(
  <HelmetProvider>
	 <Provider store={store}>
		<BrowserRouter>
		  <App />
		</BrowserRouter>
	 </Provider>,
  </HelmetProvider>,
  document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
