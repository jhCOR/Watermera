import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Router, Route, Routes } from "react-router-dom";
import { Box, Grid, Container, Typography, Divider, Card, CardContent, CardHeader, CardActions, Button,
	   AppBar, Toolbar} from '@mui/material';
import Header from '../modal/header';
import Signup from '../modal/sign_up';
import Login from '../modal/login';
import SearchJuso from '../modal/searchJuso';
import {Provider}from "react-redux";
import {createStore} from "redux";
import rootReducer from "../../redux/modules/index";
const store = createStore(rootReducer)
function UserContainer() {

  return (
	  <Provider store={store}>
		<Container maxWidth="xl">
			<Header />
			<br></br>
			<br></br>

			<Routes >
				<Route exact path="/login" element={<Login />} />
				<Route exact path="/signup/*" element={<Signup />} />
			</Routes >
			<Routes >
				<Route exact path="/signup/searchJuso" element={<SearchJuso />} />
			</Routes >


			<br></br>
		 </Container>
	  </Provider>
	  
  );
}

export default UserContainer;