import React, { Fragment, useState, useCallback, useEffect } from "react";
import withStore from "./../../utils/withStore.js";
import { useRouter } from "next/router";
import moment from "moment";
import { kindOfCrimeData } from "./../../data";
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
import DataPicker from "./../DataPicker";
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
  const [dateFrom, setDateFrom] = useState(moment());
  const [dateTo, setDateTo] = useState(moment());
  const [valueKUI, setValueKUI] = useState(0);
  const [crimeData, setCrimeData] = useState(moment());
  const [addressOfCrime, setAddressOfCrime] = useState("");
  const [objectOfCrime, setObjectOfCrime] = useState("");
  const [service, setService] = useState("");
  const handleChangeKindOfCrime = useCallback(event =>
    setKindOfCrime(event.target.value)
  );
  const handleCloseKindOfCrime = useCallback(() => setOpenKindOfCrime(false));
  const handleOpenKindOfCrime = useCallback(() => setOpenKindOfCrime(true));
  const handleChangeDateFrom = useCallback(time => setDateFrom(moment(time)));
  const handleChangeDateTo = useCallback(time => setDateTo(moment(time)));
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
  const updateList = useCallback(() => {});
  const addToList = useCallback(() => {
    const data = {
      type: kindOfCrime,
      date: crimeData,
      address: addressOfCrime,
      service,
      object: objectOfCrime,
      rota: 1,
      kui: valueKUI
    };
    if (
      kindOfCrime &&
      crimeData &&
      addressOfCrime &&
      objectOfCrime &&
      valueKUI &&
      service !== ""
    ) {
      props.store.addToCrimes(data);
    }
  });
  const getAddresses = useCallback(() => props.store.getAdresses());
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
        <DataPicker
          className={classes.formControl}
          id="dateFrom"
          label="От"
          value={dateFrom}
          onChange={handleChangeDateFrom}
        />
        <DataPicker
          className={classes.formControl}
          id="dateTo"
          label="До"
          value={dateTo}
          onChange={handleChangeDateTo}
        />
      </Grid>
      <br />
      {router.pathname !== "/" && "/admin" ? (
        <Fragment>
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
              <InputLabel id="kind-of-crime">Тип преступления</InputLabel>
              <Select
                id="kind-of-crime-select"
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
            <DataPicker
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
              options={props.store.addresses}
              getOptionLabel={getAutoItem}
              onChange={handleChangeAddressOfCrime}
              value={addressOfCrime}
              className={classes.formControl}
            />
            <TextField
              className={classes.formControl}
              id="service"
              label="Служба раскрывшая"
              value={service}
              onChange={handleChangeService}
            />
            <TextField
              className={classes.formControl}
              id="odject-of-crimes"
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
      ) : null}
    </Fragment>
  );
};

export default withStore(Panel);
