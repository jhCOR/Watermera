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

export default function postPage() {
  return (
	
    <Box sx={{ minWidth: 800}}>
		<Card sx={{ minWidth: 800, display: 'inline-block' }}>
		  <CardContent>
			<Stack direction="row" spacing={2}>
				<Typography variant="body2" className="display-enter" align = 'left'> 
					게시글 화면
					<br />
				</Typography>
				
			</Stack>
			  
		  </CardContent>
		  <CardActions>

		  </CardActions>
		</Card>
    </Box>
  );
}