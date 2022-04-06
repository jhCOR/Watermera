import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import "../componentStyle/textStyle.css"
import textContainer from '../../data/applyMethodTxt'

import {
  Card,
  Stack,
  Table,
  Button,
  Checkbox,
  TableBody,
  Container,
  Typography,
  TableContainer,
  TablePagination
} from '@mui/material';

function ShowList() {

  return (
   
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            K-water :수질 검사 절차 안내
          </Typography>
        </Stack>

        <Card>

            <TableContainer sx={{ minWidth: 800}} style={{maxHeight: 400, overflow: 'auto'}}>
              <Table>

                <TableBody   >
					
					<Typography variant="body2" className="display-enter" align = 'left'> 
						{textContainer.first}
						<br />
					</Typography>
					<Typography variant="body2" className="display-enter" align = 'left'>
						{textContainer.second}
					</Typography>
					<Typography variant="body2" className="display-enter" align = 'left'>
						{textContainer.third}
						<br />
					</Typography>
					<Typography variant="body2" className="display-enter" align = 'left'>
						{textContainer.forth}
					</Typography>
					<Typography variant="body2" className="display-enter" align = 'left'>
						{textContainer.fifth}
						<br />
					</Typography>
					<Typography variant="body2">
						수질검사 결과에 대한 문의 및 이의신청은 K-water 홈페이지에서 하실 수 있습니다.
						http://www.kwater.or.kr - 국민소통 - 고객광장 - 민원(질의)신청
					</Typography>
					
					<Link to="/write"> 
					  <Button >신청서 작성</Button>
					</Link>
                </TableBody>
                
              </Table>
            </TableContainer>
		
        </Card>
      </Container>
  );
}


export default ShowList;