import React, { Fragment, useState, useCallback, useEffect } from "react";
import MainLayout from "./../../../layouts/Main";
import fetch from "isomorphic-unfetch";
import {
  Grid,
  Typography,
  TextField,
  Button,
  Switch,
  Paper,
  List
} from "@material-ui/core/";
import { FixedSizeList } from "react-window";
import AppBar from "./../../../components/AppBar";
import { makeStyles } from "@material-ui/core/styles";
import { withAuthSync } from "./../../../utils/auth.js";
import SmartInput from "./../../../components/SmartInput";
import withStore from "./../../../utils/withStore.js";
import ListItem from "./../../../components/admin/UsersListItem";
import ListItemAddress from "./../../../components/admin/AddressListItem";
import FormAddress from "./../../../components/admin/FormAddress";
const useStyle = makeStyles(theme => ({
  root: {
    marginTop: 100,
    display: "flex",
    width: "100%",
    justifyContent: "space-evenly"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "100%"
  },
  paper: {
    display: "flex",
    justifyContent: "center",
    alignSelf: "flex-start",
    flexDirection: "column",
    maxWidth: 500,
    paddingLeft: 20,
    paddingRight: 20
  },
  switch: {
    display: "flex",
    justifyContent: "center",
    width: 200,
    alignItems: "center"
  },
  list: {
    textAlign: "center",
    width: 500
  }
}));
const AdminPanel = props => {
  const listAddress = props.store.AddressStore.addressesForAdmin;
  useEffect(() => {
    props.store.UserStore.getAllUsers();
    props.store.AddressStore.getAllAddresses();
  }, []);
  const classes = useStyle();
  const [rota, setRota] = useState(0);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setByAdmin] = useState(false);
  const handleChangeLogin = useCallback(event => setLogin(event.target.value));
  const handleChangePassword = useCallback(event =>
    setPassword(event.target.value)
  );
  const handleSetByAdmin = useCallback(() => {
    if (rota !== 0) return;
    setByAdmin(!isAdmin);
  });
  const handleChangeRota = useCallback(event => {
    setRota(+event);
    setByAdmin(false);
  });
  const addUser = useCallback(event => {
    event.preventDefault();
    let data = { login, password, rota, isAdmin };
    if (data.rota === 0) data = { ...data, rota: null };
    props.store.UserStore.createUser(data);
  });
  const addressRow = ({ index, style }) => (
    <div style={style} key={listAddress[index].id}>
      <ListItemAddress
        item={listAddress[index]}
        remove={props.store.AddressStore.deleteInListAddress[index]}
      />
    </div>
  );
  return (
    <Fragment>
      <AppBar />
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <form className={classes.form} onSubmit={addUser}>
            <Typography align="center" variant="h5">
              Добавить пользователя
            </Typography>
            <TextField
              value={login}
              label="логин"
              onChange={handleChangeLogin}
            />
            <TextField
              value={password}
              label="пароль"
              onChange={handleChangePassword}
            />
            <SmartInput
              label="номер роты"
              value={rota}
              onChange={handleChangeRota}
            />
            <div className={classes.switch}>
              <Typography variant="body1">сделать админом</Typography>
              <Switch
                checked={isAdmin}
                onChange={handleSetByAdmin}
                color="primary"
              />
            </div>
            <Button color="primary" type="submit">
              Добавить
            </Button>
          </form>
          <List className={classes.list}>
            <Typography align="center" variant="h5">
              Пользователи
            </Typography>
            {props.store.UserStore.users.map((item, index) => {
              return (
                <ListItem
                  key={item.id}
                  item={item}
                  remove={props.store.UserStore.deleteInListUser[index]}
                />
              );
            })}
          </List>
        </Paper>
        <Paper className={classes.paper}>
          <FormAddress />
          <Typography align="center" variant="overline">
            Выберите адрес на карте
          </Typography>
          <Typography align="center" variant="h5">
            Адреса
          </Typography>
          <FixedSizeList
            height={600}
            width={500}
            itemSize={50}
            itemCount={listAddress.length}
          >
            {addressRow}
          </FixedSizeList>
        </Paper>
      </div>
    </Fragment>
  );
};
AdminPanel.Layout = MainLayout;
export default withAuthSync(withStore(AdminPanel), true);
