import React, { useCallback, useState } from 'react';
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";

import { Box, Grid, Container, Typography, Divider, Card, CardContent, CardHeader, CardActions, Button,
	   AppBar, Toolbar} from '@mui/material';
import { request } from '../../adaptor/requestData';
function Board({tiers}) {
	const navigate = useNavigate();	
	
	var width = tiers.length == 1 ? 12 : 6;

	var request_data = new request(null);
	const showPost = (url) =>{
	request_data.requestData(null, url);
	navigate(url);
	}
  return (
	  
	<Container component="main">
        <Grid container spacing={1} alignItems="flex-end">
          {tiers.map((tier) => (
            <Grid
              item
              key={tier.title}
              xs={12}
              sm={width}
              md={width}
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
						onClick={() => showPost('/board/showPost?id='+tier.id)}
                      >
                        {line}
                      </Typography>
                    ))}
                  </ul>
				
                </CardContent>
				<Link to={tier.url}> 
				  <Button size="small">더보기</Button>
				</Link>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
  );
}

export default Board;