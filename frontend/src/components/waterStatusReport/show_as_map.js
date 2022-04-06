import React from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

function showMap() {
	
return (
    <div className="mapContainer">
		<img alt="map" src={'/resource/image/map.png'} width='50%'></img>
		<Link to="/list"> 
			<Button >리스트로 보기</Button>
		</Link>
    </div>
  );
}

/*
<Map
	center={{ lat: 33.5563, lng: 126.79581 }}
	style={{ width: "100%", height: "360px" }}
>
	<MapMarker position={{ lat: 33.55635, lng: 126.795841 }}>
		<div style={{color:"#000"}}>Hello World!</div>
	</MapMarker>
</Map>
*/
export default showMap;