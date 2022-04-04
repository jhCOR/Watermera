import React, { Component } from 'react';
import { Route} from "react-router-dom";
import './App.css';
// routes
import Router from './routes';
import MainContainer from './components/containers/mainContainer';
import AnnounceContainer from './components/containers/announceContainer';
import Header from './components/modal/header';
export default function App() {
	return (
		 <div className="App">
			<Header />
			<Router path="/">
                <MainContainer />
            </Router>
		</div>
	);
}
