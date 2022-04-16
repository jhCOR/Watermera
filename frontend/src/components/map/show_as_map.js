import React, { useEffect } from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { load_location } from '../../adaptor/adaptor';
import {makeOverListener, setCenter} from '../map/mapUtil';
import { Size } from '../../adaptor/sizeManager';

const { kakao } = window;

const MapContainer = ({sizeOption}) => {

var [HEIGHT, HEIGHT_expand] = ['450px', '700px'];
var size_manager = new Size([null,HEIGHT],[null,HEIGHT_expand])
var [width, height ]= size_manager.getSize(sizeOption);
	
    useEffect(() => {

        const container = document.getElementById('myMap');
		const options = {
			center: new kakao.maps.LatLng(33.450701, 126.570667),
			level: 3
		};
        const map = new kakao.maps.Map(container, options);
		
		var location = load_location();
		for(var i=0;i<location.length;i++){
			
			var Position  = location[i].XY_position;
			var marker = new kakao.maps.Marker({
				position: Position,
				map: map, 
			});
			
			var iwContent;
			if(location[i].qulified){
				var iwContent = '<div width = "25%"; style="padding:5px;">'
							+location[i].Name+location[i].qulified+'<img width = "30px"; src="/resource/image/check_icon.png" />'
							+'</div>';
			}else{
				var iwContent = '<div width = "25%"; style="padding:5px;">'
							+location[i].Name+location[i].qulified
							+'</div>';
			}
			
			var iwRemoveable = true; 

			// 인포윈도우를 생성하고 지도에 표시합니다
			var infowindow = new kakao.maps.InfoWindow({
				map: map, // 인포윈도우가 표시될 지도
				position : Position, 
				content : iwContent,
				removable : iwRemoveable
			});
			kakao.maps.event.addListener(marker, 'click', makeOverListener(map, marker, infowindow));
		}

		setCenter(map);
		}, [height]);
	

    return (
		<Card sx={{ minWidth: 400, minHeight:200, display: 'inline-block' }}>
			<CardContent>
				<div id='myMap' style={{
					width: '1000px', 
					height: height
				}}></div>
			</CardContent>
			<Link to="/map/expand"> 
				  <Button >지도 확대하기</Button>
			</Link>
			<Link to="/list"> 
				  <Button >리스트로 보기</Button>
			</Link>
		</Card>
    );
}

export default MapContainer;