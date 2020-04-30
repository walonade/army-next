import React, { memo } from "react";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton
} from "@material-ui/core/";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import PersonIcon from "@material-ui/icons/Person";
import DeleteIcon from "@material-ui/icons/Delete";
const Element = props => {
  return (
    <ListItem button>
      <ListItemIcon>
        {props.item.isAdmin ? <SupervisorAccountIcon /> : <PersonIcon />}
      </ListItemIcon>
      <ListItemText primary={props.item.login} />
      {props.item.rota !== null ? (
        <ListItemText primary={`рота № ${props.item.rota}`} />
      ) : null}
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="delete" onClick={props.remove}>
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
