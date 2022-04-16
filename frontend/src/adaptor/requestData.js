import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { load_announce } from './adaptor';
import axios from 'axios';
export class request{
	
	constructor(url){
		this.url = url;
	}
	
	requestData(Data, url){
		if(url)this.url = url;
		try{
			this.requestTo(Data);
		}catch{
			this.loadFrom();
		}
	}
	
	async requestTo(Data){
		var API_url = 'https://k-water-react.run.goorm.io'+this.url;
		if(Data){
			await axios
			.post(API_url, Data)
			.then(function(response) {
				console.log(response);
				return response;
			})
			.catch(err => {
				console.error(err);
			});
		}else{
			await axios
			.get(API_url)
			.then(function(response) {
				console.log(response);
				return response;
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
}