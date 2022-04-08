import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Router, Route, Routes } from "react-router-dom";
import { Box, Grid, Container, Typography, Divider, Card, CardContent, CardHeader, CardActions, Button,
	   AppBar, Toolbar} from '@mui/material';

import Board from '../board/board';
import Header from '../modal/header';
import Footer from '../modal/footer';
import applyBoardList from '../../data/applyBoard';
import {load_announce, load_QandA} from '../../adaptor/adaptor';

function BoardContainer() {

var announcePostObject = {title:'공지사항', content:load_announce};
var QandAPostObject = {title:'Q&A', content:load_QandA}

  return (
	  <Container maxWidth="xl">
		<Header />
		<br></br>
		<br></br>
		  
		<Routes >
			<Route exact path="/announce" element={<Board postObject = {announcePostObject} />} />
			<Route exact path="/question" element={<Board postObject = {QandAPostObject}/>} />
			<Route exact path="/myApplyList" element={<Board postObject = {QandAPostObject}/>} />
        </Routes >

		<Link to="../"> 
			<Button >홈화면</Button>
		</Link>
		  
		<br></br>
		<Footer />
      </Container>
  );
}

export default BoardContainer;