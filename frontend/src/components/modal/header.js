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
			  <Link  to="/"> 
				  K-water
			  </Link>
          </Typography>
          <nav>
			<a
			href="https://www.miricanvas.com/v/1zrnpt"
			  target="_blank"
			  rel="noopener noreferrer"
			>
			   <Button variant="text">소개</Button>
			</a>
            <Link  to="/apply"> 
				  <Button variant="text">수질 검사 신청</Button>
			</Link>
            <Link  to="/board/announce"> 
				  <Button variant="text">공지사항</Button>
			</Link>
			<Link  to="/board/question"> 
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