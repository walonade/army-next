import React from "react"
import { List, Typography } from "@material-ui/core/"
import ListItem from "./../../../components/admin/UsersListItem"
export default props => {
 return (
  <List className={props.className}>
   <Typography variant="h5">Пользователи</Typography>
   {props.users.map(item => {
    return <ListItem key={item.id} />
   })}
  </List>
 )
}
