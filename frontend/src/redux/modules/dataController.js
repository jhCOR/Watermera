/* 액션 타입 만들기 */
// Ducks 패턴을 따를땐 액션의 이름에 접두사를 넣어주세요.
// 이렇게 하면 다른 모듈과 액션 이름이 중복되는 것을 방지 할 수 있습니다.
const LOAD = 'dataController/LOAD';
const SAVE = 'dataController/SAVE';
const DELETE = 'dataController/DELETE';

/* 액션 생성함수 만들기 */
// 액션 생성함수를 만들고 export 키워드를 사용해서 내보내주세요.
export const saveData = post => ({ type: SAVE, post });
export const loadData = () => ({ type: LOAD });
export const deleteData = () => ({ type: DELETE });

/* 초기 상태 선언 */
const initialState = {
  post: {title: '수질 조회', content:[{postTitle:'빈 제목', postBody:'빈 내용', postTime: '비어있는 시간', postAuthor:'작성자 없음'}]},
  amount: 0
};

/* 리듀서 선언 */
// 리듀서는 export default 로 내보내주세요.
export default function counter(state = initialState, action) {
	console.log(state)
  switch (action.type) {
    case LOAD:
      return state;
		  
    case SAVE:
		  console.log(state)
      return {
        ...state,
        post: state.post
      };
		  
    case DELETE:
      return {
        ...state,
        number: state.number - state.diff
      };
    default:
      return state;
  }
}