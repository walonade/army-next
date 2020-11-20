import React, { useCallback, useEffect } from "react"
import withStore from "./../../utils/withStore"
import { useRouter } from "next/router"
import ReactToPrint from "react-to-print"
import moment from "moment"
import {
 Typography,
 Grid,
 TextField,
 FormControl,
 MenuItem,
 InputLabel,
 Select,
 ButtonBase
} from "@material-ui/core"
import AutoComplite from "./../AutoComplite"
import DateTimePicker from "./../DateTimePicker"
import DatePicker from "./../DatePicker"
import SmartInput from "./../SmartInput"
import { makeStyles, withStyles } from "@material-ui/core/styles"
import DescriptionIcon from "@material-ui/icons/Description"
import PrintIcon from "@material-ui/icons/Print"
import { customUseState } from "../../utils/customHooks"
const useStyles = makeStyles({
 formControl: {
  maxWidth: 280,
  minWidth: 250,
  margin: 0
 }
})
const PanelButton = withStyles({
    root: {
        margin: "10px 0",
        color: "#FFFFFF",
        maxWidth: 280,
        minWidth: 250,
        height: 32,
        background: "linear-gradient(90.75deg, #3749AA 0%, #202E7B 100%)",
        boxShadow: "0px 2px 10px 1px rgba(23, 33, 86, 0.9)",
        borderRadius: 6,
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: 14,
        fontFamily: "Roboto"
    }
})(ButtonBase)
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
 const { crimesList, serviceList } = props.store.SistemDataStore.sistemData
 return (
   <Grid container direction="column" alignItems="center">
   <Typography variant="h4">АКО</Typography>
    <Typography variant="h6">Сформировать статистику</Typography>
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
    <PanelButton
     onClick={updateList}
     className={classes.button, classes.formControl}
    >
     <DescriptionIcon />
    </PanelButton>
    {routerHook.pathname === "/report" ? (
     <ReactToPrint
      trigger={() => (
       <PanelButton variant="contained" color="primary" className={classes.button, classes.formControl}>
        <PrintIcon />
       </PanelButton>
      )}
      content={() => props.printBlog.current}
      removeAfterPrint={true}
     />
    ) : null}
   <Typography variant="h6">Добавление записи</Typography>
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
      {crimesList.map((item, index) => (
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
    <PanelButton
     onClick={addToList}
    >
     <Typography variant="button">Добавить</Typography>
    </PanelButton>
   </Grid>
 )
}

export default withStore(Panel)
