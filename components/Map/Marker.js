import React, { memo } from "react";
import { Marker, Popup } from "react-leaflet";
export default memo(
  props => {
    return (
      <Marker position={props.position} icon={props.icon}>
        <Popup>
          <br />
          Easily customizable.
        </Popup>
      </Marker>
    );
  },
  (prevProps, nextProps) => (prevProps.id === nextProps.id ? true : false)
);
