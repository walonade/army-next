import React, { Fragment, useState, useCallback } from "react";
import { Grid, Typography, TextField, Button } from "@material-ui/core/";
import withStore from "./../../../utils/withStore.js";
import dynamic from "next/dynamic";
const MapAdmin = dynamic(() => import("./../MapAdmin"), { ssr: false });
export default withStore(props => {
  const [address, setAddress] = useState("");
  const handleChangeAddress = useCallback(event =>
    setAddress(event.target.value)
  );
  const [position, setPosition] = useState(null);
  const handleChangePosition = useCallback(event => setPosition(event.latlng));
  const addAddress = useCallback(() => {
    if (position !== null || address !== "") {
      const data = {
        value: address,
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
