import React, { useState, useCallback, useEffect } from "react";
import withStore from "./../../utils/withStore.js";
import MarkerIcon from "./../../components/Map/MarkerIcon.js";
import Marker from "./../../components/Map/Marker.js";
import Map from "./../../components/Map/index.js"
const addProperty = item =>
  Object.defineProperty(item, "marker", {
    writable: true,
    enumerable: true,
    value: MarkerIcon(item.type, item.date)
  });
const MapContainer = props => {
  useEffect(() => {
    props.store.getCrimes();
  }, []);
  const mapData = props.store.crimes.map(item => addProperty(item));
  return (
    <Map>
      {mapData.map((item, index) => (
        <Marker
          key={index}
          position={{
            lat: item.AddressId.lat,
            lng: item.AddressId.lng
          }}
          icon={item.marker}
          id={index}
        />
      ))}
    </Map>
  );
};
export default withStore(MapContainer);
