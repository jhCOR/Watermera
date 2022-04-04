import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PorfileList from '../list';

function AnnouncementContainer() {

	var example_lists = [{example:10}]
	return <PorfileList lists={example_lists}/>;
}

export default AnnouncementContainer;