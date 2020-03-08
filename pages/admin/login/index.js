import React, { useState, useCallback } from "react";
import Form from "./../../../components/AuthorizationForm";
import withStore from "./../../../utils/withStore.js"
export default withStore(props => {
  const [data, setData] = useState({
    login: "",
    password: ""
  });
  const handleSetLogin = useCallback(event =>
    setData({ ...data, login: event.target.value })
  );
  const handleSetPassword = useCallback(event =>
    setData({ ...data, password: event.target.value })
  );
  const onSubmit = useCallback(event => {
    event.preventDefault();
    props.store.UserStore.login("admin", data, true)
  });
  return (
    <Form
      loginValue={data.login}
      passwordValue={data.password}
      onChangeLogin={handleSetLogin}
      onChangePassword={handleSetPassword}
      onSubmit={onSubmit}
    />
  );
})
