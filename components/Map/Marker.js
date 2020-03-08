import React, { memo, useState } from "react";
import { Marker, Popup } from "react-leaflet";
import { IconButton } from "@material-ui/core";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditIcon from "@material-ui/icons/Edit";
import moment from "moment";
export default memo(
  props => {
    const changeNumber = number => {
      return number < 10 ? `0${number}` : number;
    };
    const date = moment(props.date);
    const year = date.year();
    const month = date.month();
    const day = date.date();
    const hour = date.hour();
    const minute = date.minute();
    const setDate = `${changeNumber(day)}.${changeNumber(month)}.${year}`;
    const setTime = `${hour}.${minute}`;
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
        </Popup>
      </Marker>
    );
  },
  (prevProps, nextProps) => (prevProps.id === nextProps.id ? true : false)
);
