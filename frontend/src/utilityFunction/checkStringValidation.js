export default function checkSearchedWord(obj){
	if(obj.length >0){
		//특수문자 제거
		var expText = /[%=><]/ ;
		if(expText.test(obj) == true){
			alert("특수문자를 입력 할수 없습니다.") ;
			obj = obj.split(expText).join(""); 
			return false;
		}
		
		//특정문자열(sql예약어의 앞뒤공백포함) 제거
		var sqlArray = new Array(
			//sql 예약어
			"OR", "SELECT", "INSERT", "DELETE", "UPDATE", "CREATE", "DROP", "EXEC",
             		 "UNION",  "FETCH", "DECLARE", "TRUNCATE" 
		);
		
		var regex;
		for(var i=0; i<sqlArray.length; i++){
			regex = new RegExp( sqlArray[i] ,"gi") ;
			
			if (regex.test(obj) ) {
			    alert("\"" + sqlArray[i]+"\"와(과) 같은 특정문자로 검색할 수 없습니다.");
				obj =obj.replace(regex, "");
				return false;
			}
		}
	}
	return true ;
}