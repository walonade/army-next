import React, { memo } from "react";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton
} from "@material-ui/core/";
import PinDropIcon from "@material-ui/icons/PinDrop";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from '@material-ui/icons/Edit';
const Element = props => {
  return (
    <ListItem button>
      <ListItemIcon>
        <PinDropIcon />
      </ListItemIcon>
      <ListItemText primary={props.item.value} />
      <ListItemText primary={`${props.item.lat} ${props.item.lng}`} />
      <ListItemSecondaryAction>
        <IconButton onClick={props.change}>
          <EditIcon/>
        </IconButton>
        <IconButton onClick={props.remove}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};
const optimize = (prevProps, nextProps) => {
  return prevProps.item.id === nextProps.item.id ? true : false;
};
export default memo(Element, optimize);
