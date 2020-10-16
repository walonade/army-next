import React, {useState, useCallback} from "react"
import { Card, InputBase, ButtonBase, Typography, Backdrop } from "@material-ui/core/"
import { makeStyles, withStyles } from "@material-ui/core/styles"
import withStore from "../../utils/withStore"
const useStyle = makeStyles({
  backDrop: {
    zIndex: 10,
    background: "linear-gradient(360deg, rgba(104, 103, 103, 0.5) 0%, rgba(79, 78, 78, 0.155) 100%)"
  },
 card: {
  width: 329,
  height: 274,
  padding: 0,
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  borderRadius: 10
 },
 title: {
  width: "100%",
  height: 56,
  color: "white",
  top: 0,
  left: 0,
  background: "linear-gradient(91.4deg, #202E7B 0.38%, #111C55 100%)",
  boxShadow: "0px 2px 10px 1px rgba(0, 0, 0, 0.25)"
 },
 titleText: {
   position: "absolute",
   fontSize: 18,
   left: 31,
   top: 15
 },
 form: {
  width: "100%",
  height: "calc(100% - 56px)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-evenly"
 },
})
const FormField = withStyles({
  input: {
    background: "#FFFFFF",
    boxShadow: "0px 2px 10px 1px rgba(0, 0, 0, 0.25)",
    borderRadius: 10,
    width: 240,
    height: 40,
    fontSize: 14,
    fontWeight: 400,
    padding: "0px 10px"
  }
})(InputBase)
const FormButton = withStyles({
  root: {
    width: 264,
    height: 40,
    background: "linear-gradient(91.17deg, #3749AA 0.25%, #283682 98.14%)",
    boxShadow: "0px 2px 10px 1px #3749AA",
    borderRadius: 10,
    fontSize: 18,
    color: "#FFFFFF"
  }
})(ButtonBase)
export default withStore(props => {
 const classes = useStyle()
 const [data, setData] = useState({
    login: "",
    password: "",
   })
   const handleSetLogin = useCallback(event =>
    setData({ ...data, login: event.target.value })
   )
   const handleSetPassword = useCallback(event =>
    setData({ ...data, password: event.target.value })
   )
   const onSubmit = useCallback(event => {
    event.preventDefault()
    if (data.login === "" || data.password === "") {
     props.store.NotificationStore.add(
      "все поля должны быть заполнены",
      "warning"
     )
     return
    }
    props.store.UserStore.login("user", data)
   })
 return (
  <Backdrop className={classes.backDrop} open={true}>
    <Card className={classes.card}>
    <div className={classes.title}>
    <Typography className={classes.titleText}>Вход на сайт</Typography>
    </div>
    <form className={classes.form} onSubmit={onSubmit}>
      <FormField onChange={handleSetLogin} placeholder="Логин" type="login"/>
      <FormField onChange={handleSetPassword} placeholder="Пароль" type="password"/>
      <FormButton type="submit">Войти</FormButton>
    </form>
    </Card>
  </Backdrop>
 )
})
