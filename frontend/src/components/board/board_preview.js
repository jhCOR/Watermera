import React, { useCallback, useState } from 'react';

import { Link } from 'react-router-dom';
import { Box, Grid, Container, Typography, Divider, Card, CardContent, CardHeader, CardActions, Button,
	   AppBar, Toolbar} from '@mui/material';

function Board({tiers}) {
	
var width = tiers.length == 1 ? 12 : 6;
	
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