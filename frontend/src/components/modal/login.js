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
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import {request} from '../../adaptor/requestData';
export default function Login() {
	const [email, setEmail] = React.useState('');
	const [passward, setPassward] = React.useState('');
	var request_data = new request(null);
	
	const login = function(){
		var loginInfo = {
			email,passward
		}
		request_data.requestData(loginInfo,'/longin');
		console.log(request_data.result);
	}
	
  return (
	
    <Box sx={{ minWidth: 800}}>
		<Card sx={{ minWidth: 400, display: 'inline-block' }}>
		  <CardContent>
			<Stack direction="row" spacing={2}>
				<TextField id="standard-basic" label="이메일" variant="standard" sx = {{width : 200}} onChange={(event) => setEmail(event.target.value)}/>
				<TextField id="standard-basic" label="비밀번호" variant="standard" sx = {{width : 200}} onChange={(event) => setPassward(event.target.value)}/>
			</Stack>

		  </CardContent>
		  <CardActions>
				<Button onClick={login}>로그인</Button>
		  </CardActions>
		</Card>
    </Box>
  );
}