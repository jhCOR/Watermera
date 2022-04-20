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
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import {request} from '../../adaptor/requestData';
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SendIcon from '@mui/icons-material/Send';
export default function Signup() {
	var [value, setValue] = React.useState(null);
	var [inputName, setInputName]   = useState("-")
	var [inputEmail, setInputEmail] = useState("-")
	var [inputPassword, setInputPassword] = useState("-")
	var [inputNumber, setInputNumber]   = useState("-")
	
	
	const { post, amount } = useSelector(state => ({
		post: state.dataController.post,
		amount: state.dataController.amount
	}) );
	var inputLocation = post.author;
	console.log(post);
	
	const navigate = useNavigate();	
	var request_data = new request(null);
	
	var send = ()=>{
		let userObjest = {
			email:inputEmail,
			hash:inputPassword,
			name:inputName,
			dob:value,
			phone:inputNumber,
			address:inputLocation
		}
		request_data.requestData(userObjest,'/register');
	}
	
	var searchLocation = function(){
		navigate('/user/signup/searchJuso');
	}
	
  return (
	
    <Box sx={{ minWidth: 800}}>
		<Card sx={{ minWidth: 400, display: 'inline-block' }}>
		  <CardContent>
			<Stack direction="row" spacing={2}>
				<TextField id="name"  label="이름" variant="standard"  sx = {{width : 200}}  onChange={(event) => setInputName(event.target.value)}/>
				<TextField id='email' label="이메일" variant="standard" sx = {{width : 200}}  onChange={(event) => setInputEmail(event.target.value)}/>
				<TextField id='email' label="비밀번호" variant="standard" sx = {{width : 200}}  onChange={(event) => setInputPassword(event.target.value)}/>
				<TextField id='email' label="비밀번호 확인" variant="standard" sx = {{width : 200}}  />
				<LocalizationProvider dateAdapter={AdapterDateFns}  sx = {{width : 200}}>
					<DatePicker
						label="생년월일"
						value={value}
						onChange={(newValue) => {
						  setValue(newValue);
						}}
						renderInput={(params) => <TextField {...params} id='birth_day'/>}
					/>
				</LocalizationProvider>
			</Stack>

			<Stack direction="row" spacing={1}>
				<Input placeholder="주소" id='juso' readOnly sx = {{width : 300}} value={inputLocation || ''}  />
				<Button onClick={searchLocation}>주소 검색</Button>
				
			</Stack>
			
			 <Input id='phoneNumber' placeholder="전화번호(000-0000-0000)" sx = {{width : 300}} onChange={(event) => setInputNumber(event.target.value)}/>
			
			  
		  </CardContent>
		  <CardActions>
				<Button endIcon={<SendIcon />} onClick={send}>완료</Button>
		  </CardActions>
		</Card>
    </Box>
  );
}