// var MarkerAndInfo = function(){
// 	return function(){
// 			var location = load_location();
// 		for(var i=0;i<location.length;i++){
// 			// 마커가 표시될 위치입니다 
// 			var Position  = location[i].XY_position;
// 			// 마커를 생성합니다
// 			var marker = new kakao.maps.Marker({
// 				position: Position,
// 				map: map, 
// 			});
// 			var iwContent = '<div style="padding:5px;">'+location[i].Name+'</div>', 
// 			iwRemoveable = true; 

// 			// 인포윈도우를 생성하고 지도에 표시합니다
// 			var infowindow = new kakao.maps.InfoWindow({
// 				map: map, // 인포윈도우가 표시될 지도
// 				position : Position, 
// 				content : iwContent,
// 				removable : iwRemoveable
// 			});
// 			kakao.maps.event.addListener(marker, 'click', makeOverListener(map, marker, infowindow));
// 		}

// 		// 인포윈도우를 표시하는 클로저를 만드는 함수입니다 
// 		function makeOverListener(map, marker, infowindow) {
// 			return function() {
// 				infowindow.open(map, marker);
// 			};
// 		}
// 		function setCenter() {            
// 			// 이동할 위도 경도 위치를 생성합니다 
// 			var moveLatLon = new kakao.maps.LatLng(33.452613, 126.570888);

// 			// 지도 중심을 이동 시킵니다
// 			map.setCenter(moveLatLon);
// 		}
// 	}
// }