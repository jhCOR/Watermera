import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';
import {load_announce, load_QandA} from '../../adaptor/adaptor';
import PostEditor from './writePostPage';
export default function postPage() {
	
var search = window.location.search;
var PREFIX = search.indexOf('purpose=');
var PURPOSE =  search.substring(PREFIX + 'purpose='.length); 

var post;
if(PURPOSE == 'announce'){
	post = load_announce();
}else if('question'){
	post = load_QandA();
}

  return (
	
    <Box sx={{ minWidth: 800}}>
		<Card sx={{ minWidth: 800, display: 'inline-block' }}>
		  <CardContent>
			
			<Typography variant="h4" className="display-enter" align = 'left'> 
				{post[0].title}
				<br />
			</Typography>
			<br />
			<Typography variant="body2" className="display-enter" align = 'left'> 
				{post[0].content}
				<br />
			</Typography>
						  
		  </CardContent>
		  <CardActions>
			<PostEditor />
		  </CardActions>
		</Card>
    </Box>
  );
}