import React, { memo } from "react"
import { Marker, Popup } from "react-leaflet"
import { IconButton } from "@material-ui/core"
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline"
export default memo(
 props => {
  return (
   <Marker position={props.position} icon={props.icon}>
    <Popup position={props.position}>
     {!props.showButton ? (
      <IconButton onClick={props.remove}>
       <DeleteOutlineIcon />
      </IconButton>
     ) : null}
     {props.isAdmin ? <h4>Рота: {props.rota}</h4> : null}
     <h4>{props.type}</h4>
     <h4>{`${props.patrol} отдел полиции`}</h4>
     <h4>
      Адрес: {props.address} <br />
      {props.addressNote}
     </h4>
     <h4>Дата: {props.compDate}</h4>
     <h4>Время: {props.compTime}</h4>
     <h4>Объект: {props.object}</h4>
     <h4>КУИ: {props.kui}</h4>
     <h4>Маршрут: {props.patrolWay !== null ? props.patrolWay : "-"}</h4>
    </Popup>
   </Marker>
  )
 },
 (prevProps, nextProps) => (prevProps.id === nextProps.id ? true : false)
)
