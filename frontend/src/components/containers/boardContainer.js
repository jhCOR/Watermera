import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Router, Route, Routes } from "react-router-dom";
import { Box, Grid, Container, Typography, Divider, Card, CardContent, CardHeader, CardActions, Button,
	   AppBar, Toolbar} from '@mui/material';
import PostPage from '../board/postPage';
import PostEditor from '../board/writePostPage';
import Board from '../board/board';
import Header from '../modal/header';
import Footer from '../modal/footer';
import applyBoardList from '../../data/applyBoard';
import {load_announce, load_QandA} from '../../adaptor/adaptor';

function BoardContainer() {


var linkNextTo = "/board/write";
var workNextToDo = '글 작성';
var PREFIX, current_PURPOSE;
if(window.location.pathname.indexOf('write')>0){
	linkNextTo = "/board/show";
	workNextToDo = "글 저장";
}else{
	PREFIX = window.location.pathname.indexOf('board');
	current_PURPOSE =  window.location.pathname.substring(PREFIX + 'board'.length); 
	linkNextTo = linkNextTo + current_PURPOSE;
}
	
var announcePostObject = {title:'공지사항', content:load_announce, purpose:current_PURPOSE.substring(1)};
var QandAPostObject = {title:'Q&A', content:load_QandA, purpose:current_PURPOSE.substring(1)}

console.log(linkNextTo);
  return (
	  <Container maxWidth="xl">
		<Header />
		<br></br>
		<br></br>
		
		<Routes >
			<Route exact path="/announce" element={<Board postObject = {announcePostObject}  />} />
			<Route exact path="/question" element={<Board postObject = {QandAPostObject}/>}  />
			<Route exact path="/myApplyList" element={<Board postObject = {QandAPostObject}  />} />
			<Route path="/write/*" element={<PostEditor />} />
			<Route path="/showPost" element={<PostPage />} />
        </Routes >
		  
		<br />
		  
		<Link to="../"> 
			<Button >홈화면</Button>
		</Link>
		<Link to={linkNextTo}> 
			<Button >{workNextToDo}</Button>
		</Link>
		  
		<br></br>
		<Footer />
      </Container>
  );
}

export default BoardContainer;