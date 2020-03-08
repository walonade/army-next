import React, { Fragment, useState, useCallback, useEffect } from "react";
import withStore from "./../../utils/withStore.js";
import { useRouter } from "next/router";
import { kindOfCrimeData } from "./../../data";
import moment from "moment";
import {
  Typography,
  Grid,
  Divider,
  TextField,
  IconButton,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  Button
} from "@material-ui/core";
import AutoComplite from "./../AutoComplite";
import DateTimePicker from "./../DateTimePicker";
import DatePicker from "./../DatePicker";
import SmartInput from "./../SmartInput";
import { makeStyles } from "@material-ui/core/styles";
import DescriptionIcon from "@material-ui/icons/Description";
import NoteAddOutlinedIcon from "@material-ui/icons/NoteAddOutlined";
const useStyles = makeStyles({
  formControl: {
    minWidth: 250
  },
  button: {
    width: 250
  }
});
const Panel = props => {
  const classes = useStyles();
  const router = useRouter();
  const getAutoItem = useCallback(item => item.value);
  const [kindOfCrime, setKindOfCrime] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [openKindOfCrime, setOpenKindOfCrime] = useState(false);
  const [openService, setOpenService] = useState(false);
  const [openPatrol, setOpenPatrol] = useState(false);
  const [dateFrom, setDateFrom] = useState(moment(moment()));
  const [dateTo, setDateTo] = useState(moment());
  const [valueKUI, setValueKUI] = useState(0);
  const [crimeData, setCrimeData] = useState(moment());
  const [patrol, setPatrol] = useState("");
  const [addressOfCrime, setAddressOfCrime] = useState("");
  const [objectOfCrime, setObjectOfCrime] = useState("");
  const [service, setService] = useState("");
  const handleChangeKindOfCrime = useCallback(event =>
    setKindOfCrime(event.target.value)
  );
  const handleCloseKindOfCrime = useCallback(() => setOpenKindOfCrime(false));
  const handleOpenKindOfCrime = useCallback(() => setOpenKindOfCrime(true));
  const handleOpenService = useCallback(() => setOpenService(true));
  const handleCloseService = useCallback(() => setOpenService(false));
  const handleOpenPatrol = useCallback(() => setOpenPatrol(true));
  const handleClosePatrol = useCallback(() => setOpenPatrol(false));
  const handleChangeDateFrom = useCallback(date => {
    if (date > dateTo) return;
    props.store.setFromDate(moment(date));
  });
  const handleChangeDateTo = useCallback(date => {
    if (date < dateFrom) return;
    props.store.setToDate(moment(date));
  });
  const handleChangeCrimeData = useCallback(date => setCrimeData(moment(date)));
  const handleChangeCrimeTime = useCallback(time => setCrimeTime(moment(time)));
  const handleChangeValueKUI = useCallback(event => setValueKUI(event));
  const handleChangeAddressOfCrime = useCallback((event, newValue) =>
    setAddressOfCrime(newValue.value)
  );
  const handleSelectAddressOfCrime = useCallback(value =>
    setAddressOfCrime(value)
  );
  const handleChangeObjectOfCrime = useCallback(event =>
    setObjectOfCrime(event.target.value)
  );
  const handleChangeService = useCallback(event =>
    setService(event.target.value)
  );
  const handleChangePatrol = useCallback(event =>
    setPatrol(event.target.value)
  );
  const updateList = useCallback(() =>
    props.store.CrimeStore.getCrimes()
  );
  const addToList = useCallback(() => {
    const data = {
      type: kindOfCrime,
      date: crimeData,
      address: addressOfCrime,
      object: objectOfCrime,
      kui: valueKUI,
      service,
      patrol
    };
    if (
      kindOfCrime &&
      crimeData &&
      addressOfCrime &&
      objectOfCrime &&
      valueKUI &&
      service &&
      patrol !== ""
    ) {
      props.store.CrimeStore.addToCrimes(data);
    }
  });
  const getAddresses = useCallback(() =>
    props.store.AddressStore.getAdresses()
  );
  return (
    <Fragment>
      <br />
      <Grid container justify="center">
        <Typography variant="h4">Logo</Typography>
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
      <Grid container justify="flex-end">
        <IconButton onClick={updateList}>
          <DescriptionIcon />
        </IconButton>
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
        <FormControl className={classes.formControl}>
          <InputLabel>Отдел полиции</InputLabel>
          <Select
            open={openPatrol}
            onClose={handleClosePatrol}
            onOpen={handleOpenPatrol}
            value={patrol}
            onChange={handleChangePatrol}
          >
            {["Северный", "Южный", "Центральный"].map((item, index) => (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel>Cлужба раскрывшая</InputLabel>
          <Select
            open={openService}
            onClose={handleCloseService}
            onOpen={handleOpenService}
            value={service}
            onChange={handleChangeService}
          >
            {["Войсковой наряд", "МВД"].map((item, index) => (
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
  );
};

export default withStore(Panel);
