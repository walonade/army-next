import React, { memo } from "react"
import { Marker, Popup } from "react-leaflet"
import { IconButton } from "@material-ui/core"
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline"
import moment from "moment"
export default memo(
 props => {
  const setDate = moment(props.date).format("DD.MM.YYYY").toString()
  const setTime = moment(props.date).format("HH:mm").toString()
  return (
   <Marker position={props.position} icon={props.icon}>
    <Popup>
     {!props.showButton ? (
      <IconButton onClick={props.remove}>
       <DeleteOutlineIcon />
      </IconButton>
     ) : null}
     <h4>{props.type}</h4>
     <h4>{`${props.patrol} отдел полиции`}</h4>
     <h4>Адрес: {props.address}</h4>
     <h4>Дата: {setDate}</h4>
     <h4>Время: {setTime}</h4>
     <h4>Объект: {props.object}</h4>
     <h4>КУИ: {props.kui}</h4>
     <h4>Маршрут: {props.patrolWay !== "" ? props.patrolWay : "-"}</h4>
    </Popup>
   </Marker>
  )
 },
 (prevProps, nextProps) => (prevProps.id === nextProps.id ? true : false)
)
