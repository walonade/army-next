import React, {
  Fragment,
  useState,
  useCallback,
  useRef,
  useEffect,
  useMemo
} from "react";
import {
  Grid,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@material-ui/core/";
import { patrols } from "./../../../data/index.js";
import withStore from "./../../../utils/withStore.js";
import dynamic from "next/dynamic";
const MapAdmin = dynamic(() => import("./../MapAdmin"), { ssr: false });
export default withStore(props => {
  const [address, setAddress] = useState("");
  const handleChangeAddress = useCallback(event =>
    setAddress(event.target.value)
  );
  const [position, setPosition] = useState({lat: null, lng: null});
  const [patrol, setPatrol] = useState("");
  const [openPatrol, setOpenPatrol] = useState(false);
  const handleChangePosition = useCallback(event => setPosition(event.latlng));
  const handleOpenPatrol = useCallback(() => setOpenPatrol(true));
  const handleClosePatrol = useCallback(() => setOpenPatrol(false));
  const handleChangePatrol = useCallback(event =>
    setPatrol(event.target.value)
  );
  const addAddress = useCallback(() => {
    if (
      position !== null &&
      address !== "" &&
      patrol !== ""
    ) {
      const data = {
        patrol,
        value: address.trim(),
        lat: position.lat,
        lng: position.lng
      };
      props.store.AddressStore.addAddress(data);
    } else {
      props.store.NotificationStore.add(
        "все поля должны быть заполнены",
        "warning"
      );
    }
  });
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
      <MapAdmin position={position} setPosition={handleChangePosition} />
    </Fragment>
  );
});
