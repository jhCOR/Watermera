import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {Button, TextField} from '@mui/material';
import {FormControl, InputGroup, Card} from 'react-bootstrap'; 
function form() {

  return (

     <InputGroup className="mb-3">
      	<form className="btn-default"  method="post" action="/user/friend">
			<Card variant="outlined">
				<TextField id="standard-basic" label="검색" variant="standard" name="friend"  type="text" className="form-control" />
				<Button variant="contained" id="button-addon2" type="submit">조회</Button>
			</Card>
		</form>
     </InputGroup>
  );
}

export default form;