import React, { Fragment, useState, useCallback, useEffect } from "react"
import {
 Grid,
 Typography,
 TextField,
 Button,
 FormControl,
 InputLabel,
 Select,
 MenuItem
} from "@material-ui/core/"
import { FixedSizeList } from "react-window"
import ListItemAddress from "../AddressListItem"
import withStore from "./../../../utils/withStore.js"
import dynamic from "next/dynamic"
export default withStore(props => {
    let [MapAdmin, setMapAdmin] = useState(null)
    useEffect(() => {
        setMapAdmin(dynamic(import("./../MapAdmin"), {ssr: false}))
    }, [])
 const {bounds, center, patrols} = props.store.SistemDataStore.sistemData
 const [address, setAddress] = useState("")
 const handleChangeAddress = useCallback(event =>
  setAddress(event.target.value)
 )
 const [position, setPosition] = useState(null)
 const [patrol, setPatrol] = useState("")
 const [openPatrol, setOpenPatrol] = useState(false)
 const handleChangePosition = useCallback(event => setPosition(event.latlng))
 const handleOpenPatrol = useCallback(() => setOpenPatrol(true))
 const handleClosePatrol = useCallback(() => setOpenPatrol(false))
 const handleChangePatrol = useCallback(event => setPatrol(event.target.value))
 const addAddress = useCallback(() => {
  if (position !== null && address !== "" && patrol !== "") {
   const data = {
    patrol,
    value: address.trim(),
    lat: position.lat,
    lng: position.lng,
   }
   props.store.AddressStore.addAddress(data)
  } else {
   props.store.NotificationStore.add(
    "все поля должны быть заполнены",
    "warning"
   )
  }
 })
 const listAddress = props.store.AddressStore.addressesForAdmin
 const addressRow = ({ index, style }) => (
     <div style={style} key={listAddress[index].id}>
      <ListItemAddress
       item={listAddress[index]}
       remove={props.store.AddressStore.deleteInListAddress[index]}
      />
     </div>
    )
    useEffect(() => {
        props.store.AddressStore.getAllAddresses()
    }, [])
 return (
  <Fragment>
   <Typography align="center" variant="h5">
    Добавить адрес
   </Typography>
   <TextField
    value={address}
    label="Введите адрес"
    onChange={handleChangeAddress}
   />
   <FormControl>
    <InputLabel>Отдел полиции</InputLabel>
    <Select
     open={openPatrol}
     onClose={handleClosePatrol}
     onOpen={handleOpenPatrol}
     value={patrol}
     onChange={handleChangePatrol}
    >
     {patrols.map((item, index) => (
      <MenuItem key={index} value={item}>
       {item}
      </MenuItem>
     ))}
    </Select>
   </FormControl>
   <Button color="primary" onClick={addAddress}>
    Добавить
   </Button>
   <Grid container justify="space-around">
    <Typography align="center" variant="overline">
     lat: {position !== null ? position.lat : ""}
    </Typography>
    <Typography align="center" variant="overline">
     lng: {position !== null ? position.lng : ""}
    </Typography>
   </Grid>
   {MapAdmin !== null ? <MapAdmin bounds={bounds} center={center} setPosition={handleChangePosition} /> : null}
   <Typography align="center" variant="overline">
    Выберите адрес на карте
   </Typography>
   <Typography align="center" variant="h5">
    Адреса
   </Typography>
   <FixedSizeList
    height={600}
    width="100%"
    itemSize={50}
    itemCount={listAddress.length}
   >
    {addressRow}
   </FixedSizeList>
  </Fragment>
 )
})
