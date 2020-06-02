import React, { useState } from "react"
import { Map, TileLayer, withLeaflet } from "react-leaflet"
import PrintControlDefault from "react-leaflet-easyprint"
import { makeStyles } from "@material-ui/core/styles"
import {
 southWestLat,
 southWestLng,
 northEastLat,
 northEastLng,
} from "./../../data"
import withStore from "./../../utils/withStore.js"
import L from "leaflet"
import MarkerIcon from "./MarkerIcon"
import Marker from "./Marker"
const fixStyleMap = {
 height: "calc(100vh - 50px)",
 width: "calc(100vw - 300px)",
}
const southWest = L.latLng(southWestLat, southWestLng)
const northEast = L.latLng(northEastLat, northEastLng)
const bounds = L.latLngBounds(southWest, northEast)
const addProperty = item =>
 Object.defineProperty(item, "marker", {
  writable: true,
  enumerable: true,
  value: MarkerIcon(item.type, item.date, item.service),
 })
const useStyles = makeStyles({
 root: {
  overflowX: "hidden",
 },
})
const PrintControl = withLeaflet(PrintControlDefault)
const MapComponent = props => {
 const classes = useStyles()
 const [position, _] = useState({
  lat: -126.609375,
  lng: 109.63151025772095,
 })
 const [zoom, setZoom] = useState(3)
 const mapData = props.store.CrimeStore.crimes.map(item =>
  addProperty(item)
 )
 const downloadOptions = {
  position: "topleft",
  sizeModes: ["Current", "A4Portrait", "A4Landscape"],
  title: "Export as PNG",
  hideControlContainer: false,
  exportOnly: true,
 }
 return (
  <div className={classes.root}>
   <Map
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
    <PrintControl {...downloadOptions} />
    {mapData.map((item, index) => (
     <Marker
      key={item.id}
      position={{
       lat: item.AddressId.lat,
       lng: item.AddressId.lng,
      }}
      icon={item.marker}
      id={item.id}
      address={item.address}
      date={item.date}
      kui={item.kui}
      rota={item.rota}
      type={item.type}
      object={item.object}
      patrol={item.AddressId.patrol}
      patrolWay={item.patrolWay}
      addressNote={item.addressNote}
      remove={props.store.CrimeStore.deleteInListCrimes[index]}
      showButton={props.store.isAdmin}
     />
    ))}
   </Map>
  </div>
 )
}
export default withStore(MapComponent)
