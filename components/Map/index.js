import React, { useState, useCallback, useEffect } from "react";
import { Map, TileLayer } from "react-leaflet";
import { makeStyles } from "@material-ui/core/styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import withStore from "./../../utils/withStore.js";
import L from "leaflet";
import MarkerIcon from "./MarkerIcon";
import Marker from "./Marker";
const fixStyleMap = { height: "calc(100vh - 50px)", width: "calc(100vw - 300px)" };
const southWest = L.latLng(-222, 230);
const northEast = L.latLng(0, 0);
const bounds = L.latLngBounds(southWest, northEast);
const addProperty = item =>
  Object.defineProperty(item, "marker", {
    writable: true,
    enumerable: true,
    value: MarkerIcon(item.type, item.date)
  });
const useStyles = makeStyles({
  root: {
    overflowX: "hidden",
  }
});
const MapComponent = props => {
  const classes = useStyles();
  const [position, setPosition] = useState({
    lat: -126.609375,
    lng: 109.63151025772095
  });
  const [zoom, setZoom] = useState(2);
  const mapData = props.store.CrimeStore.crimes.map(item => addProperty(item));
  const showPosition = useCallback(event => console.log(event.latlng));
  useEffect(() => {
    props.store.CrimeStore.getCrimes();
  }, []);
  return (
    <div className={classes.root}>
      <Map
        onClick={showPosition}
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
        {mapData.map((item, index) => (
          <Marker
            key={index}
            position={{
              lat: item.AddressId.lat,
              lng: item.AddressId.lng
            }}
            icon={item.marker}
            id={index}
            address={item.address}
            date={item.date}
            kui={item.kui}
            rota={item.rota}
            type={item.type}
            object={item.object}
            patrol={item.patrol}
            remove={props.store.CrimeStore.deleteInListCrimes[index]}
            showButton={props.store.isAdmin}
          />
        ))}
      </Map>
    </div>
  );
};
export default withStore(MapComponent);
