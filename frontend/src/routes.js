import { Navigate, useRoutes } from 'react-router-dom';
import { Link as RouterLink, useParams } from 'react-router-dom';
import Test from './components/searchForm';
import MainContainer from './components/containers/mainContainer';
import BoardContainer from './components/containers/boardContainer';
// ----------------------------------------------------------------------

export default function Router() {
	return useRoutes([
		{
			path: '/*',
			element: 
					<MainContainer />
				,
			children: [
				{ path: 'map' },
				{ path: 'list'},
				{ path: 'apply'},
				{ path: 'write/search'},

			],
		},
		{
			path: '/board/*',
			element: 
					<BoardContainer />
				,
		},
		{ path: '*', element: <Navigate to="/404" replace /> },
	]);
}