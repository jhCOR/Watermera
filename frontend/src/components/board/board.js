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

function ShowList({postObject}) {
	
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
	console.log('newPage:')
	console.log(newPage)
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
	var example = postObject.content();
	const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - example.length) : 0;

  return (
   
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            {postObject.title}
          </Typography>
        </Stack>

        <Card>

            <TableContainer sx={{ minWidth: 800}}>
              <Table>

                <TableBody>
                {example
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { id, title, content, author, date, postBody, postTime } = row;
                      const isItemSelected = selected.indexOf(title) !== -1;

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
                                {title}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">{content}</TableCell>
                          <TableCell align="left">{author}</TableCell>
                          <TableCell align="left">{date}</TableCell>

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