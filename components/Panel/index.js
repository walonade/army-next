import React, { Fragment, useState, useCallback } from "react"
import withStore from "./../../utils/withStore"
import { useRouter } from "next/router"
import ReactToPrint from "react-to-print"
import { kindOfCrimeData, serviceList } from "./../../data"
import moment from "moment"
import {
 Typography,
 Grid,
 Divider,
 TextField,
 FormControl,
 MenuItem,
 InputLabel,
 Select,
 Button,
} from "@material-ui/core"
import AutoComplite from "./../AutoComplite"
import DateTimePicker from "./../DateTimePicker"
import DatePicker from "./../DatePicker"
import SmartInput from "./../SmartInput"
import { makeStyles } from "@material-ui/core/styles"
import DescriptionIcon from "@material-ui/icons/Description"
import PrintIcon from "@material-ui/icons/Print"
import { customUseState } from "../../utils/customHooks"
const useStyles = makeStyles({
 formControl: {
  minWidth: 250,
 },
 button: {
  width: 250,
  marginTop: 20,
  marginBottom: 20,
 },
})
const Panel = props => {
 const routerHook = useRouter()
 const classes = useStyles()
 const getAutoItem = useCallback(item => item.value)
 const [kindOfCrime, setKindOfCrime] = customUseState("")
 const [openKindOfCrime, setOpenKindOfCrime] = customUseState(false)
 const [openService, setOpenService] = customUseState(false)
 const [valueKUI, setValueKUI] = customUseState(0)
 const [crimeData, setCrimeData] = customUseState(moment())
 const [addressOfCrime, setAddressOfCrime] = customUseState("")
 const [addressNote, setAddressNote] = customUseState("")
 const [objectOfCrime, setObjectOfCrime] = customUseState("")
 const [service, setService] = customUseState("")
 const [patrolWay, setPatrolWay] = customUseState("")
 const handleChangeKindOfCrime = useCallback(event =>
  setKindOfCrime(event.target.value)
 )
 const handleCloseKindOfCrime = () => setOpenKindOfCrime(false)
 const handleOpenKindOfCrime = () => setOpenKindOfCrime(true)
 const handleOpenService = () => setOpenService(true)
 const handleCloseService = () => setOpenService(false)
 const handleChangeDateFrom = useCallback(date => {
  if (date > props.store.dateTo) return
  props.store.setFromDate(moment(date))
 })
 const handleChangeDateTo = useCallback(date => {
  if (date < props.store.dateFrom) return
  props.store.setToDate(moment(date))
 })
 const handleChangeCrimeData = date => setCrimeData(moment(date))
 const handleChangeValueKUI = event => setValueKUI(+event)
 const handleChangeAddressOfCrime = (event, newValue) => {
  newValue !== null ? setAddressOfCrime(newValue.value) : setAddressOfCrime("")
 }
 const handleChangeAddressNote = event => setAddressNote(event.target.value)
 const handleChangeObjectOfCrime = event => setObjectOfCrime(event.target.value)
 const handleChangeService = event => setService(event.target.value)
 const handleChangePatrolWay = event => setPatrolWay(event.target.value)
 const updateList = useCallback(() => props.store.CrimeStore.getCrimes())
 const addToList = useCallback(() => {
  const data = {
   type: kindOfCrime,
   date: crimeData,
   address: addressOfCrime,
   addressNote: addressNote.length !== 0 ? addressNote : null,
   object: objectOfCrime,
   kui: valueKUI,
   service,
   patrolWay: patrolWay.length !== 0 ? patrolWay : null,
  }
  if (
   kindOfCrime &&
   crimeData &&
   addressOfCrime &&
   objectOfCrime &&
   valueKUI &&
   service !== ""
  ) {
   props.store.CrimeStore.addToCrimes(data)
  } else {
   props.store.NotificationStore.add(
    "все поля должны быть заполнены",
    "warning"
   )
  }
 })
 const getAddresses = useCallback(() => props.store.AddressStore.getAdresses())
 return (
  <Fragment>
   <br />
   <Grid container justify="center">
    <Typography variant="h4">АКО</Typography>
   </Grid>
   <br />
   <Divider />
   <br />
   <Grid container justify="center">
    <Typography variant="h6">Сформировать статистику</Typography>
   </Grid>
   <br />
   <Grid container justify="space-around">
    <DatePicker
     className={classes.formControl}
     label="От"
     max={props.store.toDate}
     value={props.store.fromDate}
     onChange={handleChangeDateFrom}
    />
    <DatePicker
     className={classes.formControl}
     label="До"
     min={props.store.fromDate}
     value={props.store.toDate}
     onChange={handleChangeDateTo}
    />
   </Grid>
   <Grid container justify="center">
    <Button
     onClick={updateList}
     variant="contained"
     color="primary"
     className={classes.button}
    >
     <DescriptionIcon />
    </Button>
    {routerHook.pathname === "/public/report" ? (
     <ReactToPrint
      trigger={() => (
       <Button variant="contained" color="primary" className={classes.button}>
        <PrintIcon />
       </Button>
      )}
      onBeforeGetContent={() => props.store.setPrint(true)}
      onBeforePrint={() => props.store.setPrint(false)}
      content={() => props.printBlog.current}
      removeAfterPrint={true}
     />
    ) : null}
   </Grid>
   <Divider />
   <br />
   <Grid container justify="center">
    <Typography variant="h6">Добавление записи</Typography>
   </Grid>
   <Grid container justify="center">
    <FormControl className={classes.formControl}>
     <InputLabel>Тип преступления</InputLabel>
     <Select
      label="Тип преступления"
      open={openKindOfCrime}
      onClose={handleCloseKindOfCrime}
      onOpen={handleOpenKindOfCrime}
      value={kindOfCrime}
      onChange={handleChangeKindOfCrime}
     >
      {kindOfCrimeData.map((item, index) => (
       <MenuItem key={index} value={item}>
        {item}
       </MenuItem>
      ))}
     </Select>
    </FormControl>
    <DateTimePicker
     value={crimeData}
     className={classes.formControl}
     onChange={handleChangeCrimeData}
     label="Укажите дату/время"
    />
    <SmartInput
     label="№ КУИ"
     value={valueKUI}
     onChange={handleChangeValueKUI}
     className={classes.formControl}
    />
    <AutoComplite
     getDataFromServer={getAddresses}
     options={props.store.AddressStore.addresses}
     getOptionLabel={getAutoItem}
     onChange={handleChangeAddressOfCrime}
     value={addressOfCrime}
     className={classes.formControl}
    />
    <TextField
     className={classes.formControl}
     label="заметки по адресу преступления"
     value={addressNote}
     onChange={handleChangeAddressNote}
    />
    <FormControl className={classes.formControl}>
     <InputLabel>Cлужба раскрывшая</InputLabel>
     <Select
      open={openService}
      onClose={handleCloseService}
      onOpen={handleOpenService}
      value={service}
      onChange={handleChangeService}
     >
      {serviceList.map((item, index) => (
       <MenuItem key={index} value={item}>
        {item}
       </MenuItem>
      ))}
     </Select>
    </FormControl>
    <TextField
     className={classes.formControl}
     label="Объект преступления"
     value={objectOfCrime}
     onChange={handleChangeObjectOfCrime}
    />
    <TextField
     className={classes.formControl}
     label="маршрут патрулирования"
     value={patrolWay}
     onChange={handleChangePatrolWay}
    />
   </Grid>
   <br />
   <Grid container justify="center">
    <Button
     onClick={addToList}
     variant="contained"
     color="primary"
     className={classes.button}
    >
     Добавить
    </Button>
   </Grid>
  </Fragment>
 )
}

export default withStore(Panel)
