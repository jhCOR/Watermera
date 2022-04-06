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

<TextField id="standard-basic" label="Standard" variant="standard" />
export default function OutlinedCard() {
  const [value, setValue] = React.useState(null);
  return (
	
    <Box sx={{ minWidth: 800}}>
		<Card sx={{ minWidth: 400, display: 'inline-block' }}>
		  <CardContent>
			<Stack direction="row" spacing={2}>
				<TextField id="standard-basic" label="이름" variant="standard" sx = {{width : 200}}/>
				<LocalizationProvider dateAdapter={AdapterDateFns}  sx = {{width : 200}}>
					<DatePicker
						label="생년월일"
						value={value}
						onChange={(newValue) => {
						  setValue(newValue);
						}}
						renderInput={(params) => <TextField {...params} />}
					/>
				</LocalizationProvider>
			</Stack>

			<Stack direction="row" spacing={1}>
				<Input placeholder="주소" readOnly sx = {{width : 300}}/>
				<Link to="/write/search"> 
					<Button >주소 검색</Button>
				</Link>
			</Stack>
			<Typography variant="body2">
			 <Input placeholder="전화번호(000-0000-0000)" sx = {{width : 300}} />
			</Typography>
			<Typography sx={{ mb: 1.5 }} color="text.secondary">
			  <Input placeholder="검사목적"  sx = {{width : 300}}/>
			</Typography>
			<Typography variant="body2">
			 <Input placeholder="검사의뢰 항목"  sx = {{width : 300}}/>
			</Typography>
			  
		  </CardContent>
		  <CardActions>
			<a
			href="https://www.kwater.or.kr/ipinPage.do?s_mid=702"
			  target="_blank"
			  rel="noopener noreferrer"
			>
			  문의 및 이의신청
			</a>
		  </CardActions>
		</Card>
    </Box>
  );
}