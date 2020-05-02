import React, { useCallback, useState, useEffect } from "react"
import Form from "./../../../components/AuthorizationForm"
import Logout from "./../../../components/Logout"
import withStore from "./../../../utils/withStore.js"
export default withStore(props => {
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
 const logout = useCallback(() => props.store.logout())
 return props.store.token === null || props.store.isAdmin ? (
  <Form
   loginValue={data.login}
   passwordValue={data.password}
   onChangeLogin={handleSetLogin}
   onChangePassword={handleSetPassword}
   onSubmit={onSubmit}
  />
 ) : (
  <Logout logout={logout} />
 )
})
