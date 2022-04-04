import React from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';

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

function PorfileList({lists}) {

  return (
	<TableContainer sx={{ minWidth: 800 }}>	 
        <List>
		{lists.map((list) => {
				var index=0;
			return (
			<ListItem disablePadding>
				<ListItemButton>
					{list.example} :<ListItemText key={index} primary={list.example}/>
				</ListItemButton>
			</ListItem>
			);
			index++;
		})}
		</List>
	</TableContainer>
  );
}

export default PorfileList;