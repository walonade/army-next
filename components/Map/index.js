import React, { useState } from "react"
import {Paper} from "@material-ui/core"
import { Map, TileLayer, withLeaflet } from "react-leaflet"
import L from "leaflet"
import PrintControlDefault from "react-leaflet-easyprint"
import { makeStyles } from "@material-ui/core/styles"
import {
 southWestLat,
 southWestLng,
 northEastLat,
 northEastLng,
} from "./../../data"
import withStore from "./../../utils/withStore.js"
import MarkerIcon from "./MarkerIcon"
import Marker from "./Marker"
class MyMap extends Map {
    constructor(props) {
        super(props)
    }
    updateLeafletElement(fromProps, toProps) {
        console.log(this)
    }
}
const fixStyleMap = {
 height: "calc(100vh - 20px)",
 width: "calc(100vw - 350px)",
}
const southWest = L.latLng(southWestLat, southWestLng)
const northEast = L.latLng(northEastLat, northEastLng)
const bounds = L.latLngBounds(southWest, northEast)
const useStyles = makeStyles({
 root: {
  overflowX: "hidden",
  width: "calc(100vw - 350px)",
  float: "right",
  marginRight: 10,
  marginTop: 10,
 },
})
const PrintControl = withLeaflet(PrintControlDefault)
const MapComponent = props => {
 const classes = useStyles()
 const [position, setPosition] = useState({
  lat: -126.609375,
  lng: 109.63151025772095,
 })
 const [zoom, setZoom] = useState(3)
 const downloadOptions = {
  position: "topleft",
  sizeModes: ["Current", "A4Portrait", "A4Landscape"],
  title: "Export as PNG",
  hideControlContainer: false,
  exportOnly: true,
 }
 return (
  <Paper className={classes.root}>
   <MyMap
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
    {props.store.CrimeStore.updatedCrimes.map((item, index) =>
     item.AddressId !== null ? (
      <Marker
       rota={item.rota}
       key={item.id}
       position={{
        lat: item.AddressId.lat,
        lng: item.AddressId.lng,
       }}
       isAdmin={props.store.isAdmin}
       icon={MarkerIcon.apply(null, [item.type, item.date, item.service])}
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
       compTime={item.compTime}
       compDate={item.compDate}
      />
     ) : null
    )}
   </MyMap>
  </Paper>
 )
}
export default withStore(MapComponent)
