import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Fab from '@mui/material/Fab';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Avatar from '@mui/material/Avatar';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import Search from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import MoreIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';

function Footer() {

  return (
	 <Box position="fixed" backgroundColor = 'gray' width = '90%' sx={{ top: 'auto', bottom: 0 }}>
          <Box sx={{ flexGrow: 1 }} />
			<p> Designed By Watermera 2022</p>
			<p> 타 문의사항이 이곳으로 보내주세요.</p>
      </Box>
  );
}

export default Footer;