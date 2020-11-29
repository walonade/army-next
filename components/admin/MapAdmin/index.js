import React, { useState } from "react"
import { Map, TileLayer } from "react-leaflet"
import L from"leaflet"
const fixStyleMap = { height: "700px", maxWidth: "100%" }
export default props => {
 const [zoom, setZoom] = useState(2)
 const {southWestLat, southWestLng, northEastLat, northEastLng} = props.bounds
 const latLngBounds = L.latLngBounds(L.latLng(southWestLat, southWestLng), L.latLng(northEastLat, northEastLng)) 
 return (
 southWestLat !== undefined ? 
    <Map
   onClick={props.setPosition}
   maxBounds={latLngBounds}
   crs={L.CRS.Simple}
   minZoom={2.5}
   maxZoom={7}
   center={props.center}
   zoom={zoom}
   style={fixStyleMap}
  >
   <TileLayer
    attribution="created by Krassavin"
    url="/images/map/{z}-{x}-{y}.jpg"
   />
  </Map> : null
 )
}
