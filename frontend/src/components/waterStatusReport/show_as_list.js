import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import { useState } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link } from 'react-router-dom';

import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination
} from '@mui/material';

function ShowList() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

var USERLIST =2;
var example = [{
avatarUrl: "/static/mock-images/avatars/avatar_7.jpg",
company: "Williamson, D'Amore and Collier",
id: "d890b376-c113-41c0-b813-5276c77afa10",
isVerified: '검출',
name: "강북",
role: "염소 이온",
status: "active"},
{avatarUrl: "/static/mock-images/avatars/avatar_7.jpg",
company: "Williamson, D'Amore and Collier",
id: "d890b376-41c0-b813-5276c77afa10",
isVerified: '검출',
name: "강남",
role: "염소 이온",
status: "active"},{avatarUrl: "/static/mock-images/avatars/avatar_7.jpg",
company: "Williamson, D'Amore and Collier",
id: "c113-41c0-b813-5276c77afa10",
isVerified: '검출',
name: "여수",
role: "염소 이온",
status: "active"},{avatarUrl: "/static/mock-images/avatars/avatar_7.jpg",
company: "Williamson, D'Amore and Collier",
id: "d890b376-c113-41c0-b813-52777a2310",
isVerified: '검출',
name: "강릉",
role: "염소 이온",
status: "active"},{avatarUrl: "/static/mock-images/avatars/avatar_7.jpg",
company: "Williamson, D'Amore and Collier",
id: "d890b376-c113-41c0-b813-5276c11fa10",
isVerified: '검출',
name: "보령",
role: "염소 이온",
status: "active"},{avatarUrl: "/static/mock-images/avatars/avatar_7.jpg",
company: "Williamson, D'Amore and Collier",
id: "d890b376-c113-41c0-b813-52713fa10",
isVerified: '검출',
name: "Andrew Bernhard",
role: "염소 이온",
status: "active"}]


  const handleChangePage = (event, newPage) => {
	console.log('newPage:')
	console.log(newPage)
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

	const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  return (
   
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            K-water : 수질 조회 시스템
          </Typography>
        </Stack>

        <Card>

            <TableContainer sx={{ minWidth: 800}}>
              <Table>

                <TableBody>
                {example
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { id, name, role, status, company, avatarUrl, isVerified } = row;
                      const isItemSelected = selected.indexOf(name) !== -1;

                      return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >

                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                            
                              <Typography variant="subtitle2" noWrap>
                                {name}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">{company}</TableCell>
                          <TableCell align="left">{role}</TableCell>
                          <TableCell align="left">{isVerified}</TableCell>

                        </TableRow>
                      );
                    })}
				{emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                
              </Table>
            </TableContainer>
			
			<Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="right"
            >
				<Link to="/map"> 
				  <Button >지도로 보기</Button>
				</Link>
				<TablePagination
					rowsPerPageOptions={[5, 10, 25]}
					component="div"
					count={example.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
            </Stack>
		
        </Card>
      </Container>
  );
}


export default ShowList;