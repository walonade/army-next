import React, { useState, useCallback, useEffect } from "react";
import { Map, TileLayer } from "react-leaflet";
import L from "leaflet";
const fixStyleMap = { height: "350px", width: "500px" };
const southWest = L.latLng(-222, 230);
const northEast = L.latLng(0, 0);
const bounds = L.latLngBounds(southWest, northEast);
const position = {
  lat: -126.609375,
  lng: 109.63151025772095
};
export default props => {
  const [zoom, setZoom] = useState(2);
  return (
    <Map
      onClick={props.setPosition}
      maxBounds={bounds}
      crs={L.CRS.Simple}
      minZoom={2.5}
      maxZoom={7}
      center={position}
      zoom={zoom}
      style={fixStyleMap}
    >
      <TileLayer
        attribution="created by Krassavin"
        url="/images/map/{z}-{x}-{y}.jpg"
      />
    </Map>
  );
};
