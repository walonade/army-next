import React, { useState, useCallback } from "react"
import Form from "./../../../components/AuthorizationForm"
import withStore from "./../../../utils/withStore.js"
import Logout from "./../../../components/Logout"
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
  props.store.UserStore.login("admin", data)
 })
 const logout = useCallback(() => props.store.logout())
 return props.store.token === null || !props.store.isAdmin ? (
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
