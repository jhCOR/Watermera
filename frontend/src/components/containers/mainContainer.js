import React, { useCallback } from 'react';
import { Router, Route, Routes } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import CustomedHeader from '../modal/header';
import Show_as_List from '../board/show_as_list';
import Show_as_Map from '../map/show_as_map';
import Search from '../searchForm';
import Show_Apply_Method from '../applyMeasurement/introduceMethod';
import Board_preview from '../board/board_preview';
import Write_apply_paper from '../applyMeasurement/applyForm';
import { Box, Grid, Container, Typography, Divider, Card, CardContent, CardHeader, CardActions, Button,
	   AppBar, Toolbar} from '@mui/material';
import { gray } from '@mui/material/colors';
import tiers from '../../data/board_preview';
import applyBoardList from '../../data/applyBoard';

function MainContainer() {
var FULL_SIZE = 1;
var MORMAL_SIZE = 0;
  return (
	  <Container maxWidth="xl">
		<CustomedHeader />
		  
		<br></br>
		<br></br>
		  
		<Routes >
        	<Route exact path="/" element={<Show_as_List />} />
			<Route exact path="/list" element={<Show_as_List />} />
			<Route path="/map"  element={<Show_as_Map size={MORMAL_SIZE}/>} />
			<Route path="/map/expand"  element={<Show_as_Map sizeOption={FULL_SIZE}/>} />
			<Route exact path="/apply" element={<Show_Apply_Method />} />
			<Route  path="/write/*" element={<Write_apply_paper />} />
        </Routes >
		  
		<br></br>
		
		<Routes >
			<Route exact path="/" element={<Board_preview tiers={tiers}/>} />
        	<Route exact path="/list" element={<Board_preview tiers={tiers}/>} />
			<Route exact path="/map" element={<Board_preview  tiers={tiers}/>} />
			<Route exact path="/apply" element={<Board_preview tiers={applyBoardList}/>} />
			<Route  path="/write/search" element={<Search />} />
        </Routes >
		
      </Container>
  );
}

export default MainContainer;