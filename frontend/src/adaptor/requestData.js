import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { load_announce } from './adaptor';
import axios from 'axios';
export class request{
	
	constructor(url){
		this.url = url;
		this.result=null;
		this.callback = function(params){}
	}
	
	requestData(Data, url){
		if(url)this.url = url;
		try{
			
			this.requestTo(Data);

		}catch(err){
			console.log(err);
			this.loadFrom();
		}
	}
	
	async requestTo(Data){
		var API_url = this.checkUrlValidation()
		var THIS = this;
		if(Data){
			await axios
			.post(API_url, Data)
			.then(function(response) {
				console.log(response)
				THIS.result = response;
				THIS.callback(response);
			})
			.catch(err => {
				console.error(err);
			});
		}else{
			await axios
			.get(API_url)
			.then(function(response) {
				console.log(response)
				THIS.result = response;
				THIS.callback(response);
			})
			.catch(err => {
				console.error(err);
			});
		}
	}
	
	loadFrom(){
		var startPoint = this.url.indexOf('id=')+3;
		var id_value = this.url.substring(startPoint);
	}
	
	checkUrlValidation(){
		console.assert(this.url, {url: this.url,errorMsg: "No Url Error"});
		var url;
		var option = this.url.indexOf('http')>-1 || this.url.indexOf('api')>-1;
		if(option){
			url = this.url;
		}else{		
			url = process.env.REACT_APP_api_url+this.url;
		}
		return url;
	}
}