import React, { useCallback } from 'react';
import { Router, Route, Routes } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import Show_as_List from '../waterStatusReport/show_as_list';
import Show_as_Map from '../waterStatusReport/show_as_map';
import Test from '../searchForm';

import { Box, Grid, Container, Typography, Divider, Card, CardContent, CardHeader, CardActions, Button,
	   AppBar, Toolbar, Link} from '@mui/material';
import AnnounceContainer from './announceContainer';
import { gray } from '@mui/material/colors';

const tiers = [
  {
    title: '공지사항',
    description: [
      '공지사항 1',
      '공지사항 2',
      '공지사항 3',
      '공지사항 4',
    ],

  },
  {
    title: 'Q & A',
    description: [
      'Q & A 1',
      'Q & A 2',
      'Q & A 3',
      'Q & A 4',
    ],

  }
];
function MainContainer() {

  return (
	  <Container maxWidth="xl">
		
		<br></br>
		<br></br>
		  
		 <Routes >
        	<Route exact path="/" element={<Show_as_List />} />
			<Route exact path="/list" element={<Show_as_List />} />
        	<Route path="/map"  element={<Show_as_Map />} />
        </Routes >
                
		<br></br>
		  
		<Container component="main">
        <Grid container spacing={1} alignItems="flex-end">
          {tiers.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid
              item
              key={tier.title}
              xs={12}
              sm={6}
              md={6}
            >
              <Card>
                <CardHeader
                  title={tier.title}
                  titleTypographyProps={{ align: 'center', color:"text.primary"}}
                  sx={{
                    backgroundColor: '#bdbdbd'
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'baseline',
                      mb: 2,
                    }}
                  >
                  
                  </Box>
                  <ul>
                    {tier.description.map((line) => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                        key={line}
                      >
                        {line}
                      </Typography>
                    ))}
                  </ul>
				
                </CardContent>
				  <Button size="small">더보기</Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
		
      </Container>
  );
}

export default MainContainer;