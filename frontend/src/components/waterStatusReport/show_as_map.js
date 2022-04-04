import React from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

function showMap() {

  return (
        <div className="imgContainer">
            <div className="image">
                <img alt="map" src={'/resource/image/map.png'} width='50%'></img>
            </div>
		<Link to="/list"> 
			<Button >지도로 보기</Button>
		</Link>
        </div>
  );
}


export default showMap;