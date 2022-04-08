import React, { useEffect } from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
const { kakao } = window;


const MapContainer = () => {

    useEffect(() => {
        const container = document.getElementById('myMap');
		const options = {
			center: new kakao.maps.LatLng(33.450701, 126.570667),
			level: 3
		};
        const map = new kakao.maps.Map(container, options);
    }, []);

    return (
		<Card sx={{ minWidth: 400, display: 'inline-block' }}>
			<CardContent>
				<div id='myMap' style={{
					width: '1000px', 
					height: '450px'
				}}></div>
			</CardContent>
			<Link to="/list"> 
				  <Button >리스트로 보기</Button>
			</Link>
		</Card>
    );
}

export default MapContainer;