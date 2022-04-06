import React from 'react';
import { AppBar, Toolbar, Typography, Button} from '@mui/material';
import { Link } from 'react-router-dom';

function Header() {

  return (
	<AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: 'wrap' }}>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
          	K-water
          </Typography>
          <nav>
			<Link  to="/map"> 
				  <Button variant="text">소개</Button>
			</Link>
            <Link  to="/apply"> 
				  <Button variant="text">수질 검사 신청</Button>
			</Link>
            <Link  to="/map"> 
				  <Button variant="text">공지사항</Button>
			</Link>
			<Link  to="/map"> 
				  <Button variant="text">Q&A</Button>
			</Link>
          </nav>
          <Button href="#" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
  );
}

export default Header;