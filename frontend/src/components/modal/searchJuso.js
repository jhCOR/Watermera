import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import {request} from '../../adaptor/requestData';
import checkSearchedWord from '../../utilityFunction/checkStringValidation';
import Board from '../board/board';
const countPerPage = 100;

const FindAddress = () => {
	var request_data = new request(null);
	const [keywords, setKeyword] = useState("");
	const [addrs, setAddrs] = useState([]);
	const [pageNum, setNum] = useState(1);
	
	
	var applyReturnedData = (data)=>{
		var parsedAddress = (JSON.parse(data.data.substring(1,data.data.length-1)).results.juso);
		
		var parsed_listed_address = [];
		var {roadAddr:id, zipNo:title, jibunAddr:content, roadAddr:author} = parsedAddress;
		var i=0;
		for (var {roadAddr:id, zipNo:title, jibunAddr:content, roadAddr:author} of parsedAddress) {
			parsed_listed_address[i] = {id,title,content,author};
			i++;
		}
		setAddrs(parsed_listed_address);
	}

	var search = () => {

		checkSearchedWord(keywords);
		let addressObject = {
			confmKey:process.env.REACT_APP_jusoSearch_api_id,
			currentPage:pageNum,
			keyword: keywords,
			countPerPage:20,
		}

		var urlString 
		= '?confmKey='+addressObject.confmKey
			+'&currentPage='+addressObject.currentPage
			+'&countPerPage='+addressObject.countPerPage
			+'&keyword='+addressObject.keyword
			+'&resultType=json';

		request_data.callback = applyReturnedData;
		request_data.requestData(null, process.env.REACT_APP_jusoSearch_api_url+
									 urlString);

	};
	var load_address = function(){
		return addrs;
	}
var addressListObject = {title:'주소 목록', content:load_address, purpose:'searchAddr'};
  return (
    <div>
      <div >
        <TextField
          label="검색어"
          variant="outlined"
          value={keywords}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <Button variant="contained" onClick={search}>
          검색
        </Button>
      </div>
      <Board postObject = {addressListObject}/>
    </div>
  );
};

export default FindAddress;