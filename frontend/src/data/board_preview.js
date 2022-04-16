import announcePost from './announceBoardPost';
import questionPost from './QandABoardPost';
var announce_post = announcePost.map((post)=>post.title);
var question_post = questionPost.map((post)=>post.title);
const tiers = [
  {
    title: '공지사항',
	url:'/board/announce',
    description: announce_post.slice(0,4),
	purpose:'announce'
  },
  {
    title: 'Q & A',
	url:'/board/question',
    description: question_post.slice(0,4),
	purpose:'question'
  }
];

export default tiers;