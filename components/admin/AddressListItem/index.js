import React, { memo } from "react"
import {
 ListItem,
 ListItemIcon,
 ListItemText,
 ListItemSecondaryAction,
 IconButton,
} from "@material-ui/core/"
import PinDropIcon from "@material-ui/icons/PinDrop"
import DeleteIcon from "@material-ui/icons/Delete"
export default memo(
 props => {
  return (
   <ListItem button>
    <ListItemIcon>
     <PinDropIcon />
    </ListItemIcon>
    <ListItemText primary={props.item.value}/>
    <ListItemText primary={`${props.item.patrol} отдел`}/>
    <ListItemSecondaryAction>
     <IconButton onClick={props.remove}>
      <DeleteIcon />
     </IconButton>
    </ListItemSecondaryAction>
   </ListItem>
  )
 },
 (prevProps, nextProps) =>
  prevProps.item.id === nextProps.item.id ? true : false
)
