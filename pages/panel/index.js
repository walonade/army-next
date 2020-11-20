import React, { Fragment, useCallback, useEffect } from "react"
import MainLayout from "../../layouts/Main"
import { Typography, TextField, Button, Paper, List } from "@material-ui/core/"
import AppBar from "../../components/AppBar"
import { makeStyles } from "@material-ui/core/styles"
import { withAuthSync } from "../../utils/auth.js"
import SmartInput from "../../components/SmartInput"
import withStore from "../../utils/withStore.js"
import UsersListItem from "../../components/admin/UsersListItem"
import ConfigurationForm from "../../components/admin/ConfigurationForm"
import { customUseState } from "../../utils/customHooks"

const useStyle = makeStyles(theme => ({
 root: {
  marginTop: 100,
  display: "flex",
  width: "100%",
  justifyContent: "space-evenly",
 },
 form: {
  display: "flex",
  flexDirection: "column",
  width: "100%",
 },
 paper: {
  display: "flex",
  justifyContent: "center",
  alignSelf: "flex-start",
  flexDirection: "column",
  maxWidth: 500,
  paddingLeft: 20,
  paddingRight: 20,
 },
 switch: {
  display: "flex",
  justifyContent: "center",
  width: 200,
  alignItems: "center",
 },
 list: {
  textAlign: "center",
  width: 500,
 },
}))
const AdminPanel = props => {
 useEffect(() => {
  props.store.UserStore.getAllUsers()
 }, [])
 const classes = useStyle()
 const [rota, setRota] = customUseState(0)
 const [login, setLogin] = customUseState("")
 const [password, setPassword] = customUseState("")
 const [adminPassword, setAdminPassword] = customUseState("")
 const [adminPasswordComplete, setAdminPasswordComplete] = customUseState("")
 const handleChangeLogin = event => setLogin(event.target.value)
 const handleChangePassword = event => setPassword(event.target.value)
 const handleChangeRota = event => setRota(+event)
 const handleChangeAdminPassword = event => setAdminPassword(event.target.value)
 const handleChangeAdminPasswordComplete = event =>
  setAdminPasswordComplete(event.target.value)
 const addUser = useCallback(() => {
  if (login !== "" && password !== "" && rota !== 0) {
   let data = { login, password, rota }
   props.store.UserStore.createUser(data)
  } else {
   props.store.NotificationStore.add(
    "все поля должны быть заполнены",
    "warning"
   )
  }
 })
 const changePassword = useCallback(() => {
  if (
   adminPassword !== "" &&
   adminPassword.length > 6 &&
   adminPassword === adminPasswordComplete
  ) {
   props.store.UserStore.changeAdminPassword(adminPassword)
  } else if (adminPassword.length < 6) {
   props.store.NotificationStore.add("пароль должен быть более 6 символов")
  } else if (adminPassword !== adminPasswordComplete) {
   props.store.NotificationStore.add("подтвердите пароль")
  } else {
   props.store.NotificationStore.add("пароль не валидный")
  }
 })
 return (
  <Fragment>
   <AppBar />
   <div className={classes.root}>
    <Paper className={classes.paper}>
     <div className={classes.form}>
      <Typography align="center" variant="h5">
       Добавить пользователя
      </Typography>
      <TextField value={login} label="логин" onChange={handleChangeLogin} />
      <TextField
       value={password}
       label="пароль"
       onChange={handleChangePassword}
      />
      <SmartInput label="номер роты" value={rota} onChange={handleChangeRota} />
      <Button color="primary" onClick={addUser}>
       Добавить
      </Button>
     </div>
     <List className={classes.list}>
      <Typography align="center" variant="h5">
       Пользователи
      </Typography>
      {props.store.UserStore.users.map((item, index) => (
       <UsersListItem
        key={item.id}
        item={item}
        remove={props.store.UserStore.deleteInListUser[index]}
       />
      ))}
     </List>
    </Paper>
    <Paper className={classes.paper}>
     <div className={classes.form}>
      <Typography align="center" variant="h5">
       Изменение пароля администратора
      </Typography>
      <TextField
       value={adminPassword}
       label="введите новый пароль (более 6 символов)"
       onChange={handleChangeAdminPassword}
      />
      <TextField
       value={adminPasswordComplete}
       label="подтвердите введённый пароль"
       onChange={handleChangeAdminPasswordComplete}
      />
      <Button color="primary" onClick={changePassword}>
       Изменить
      </Button>
     </div>
    </Paper>
    <Paper className={classes.paper}>
       <ConfigurationForm/>
    </Paper>
   </div>
  </Fragment>
 )
}
AdminPanel.Layout = MainLayout
export default withAuthSync(withStore(AdminPanel), "admin")
