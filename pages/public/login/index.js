import React, { useCallback, useState } from "react";
import Form from "./../../../components/AuthorizationForm";
import Router from "next/router";
import { setToken } from "./../../../utils/auth.js";
import fetch from "isomorphic-unfetch";
export default () => {
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
  const onSubmit = useCallback(async event => {
    event.preventDefault();
    const response = await fetch("/api/user/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(data)
    });
    if (response.status === 200) {
      const { token } = await response.json();
      setToken(token);
      Router.push("/public");
    }
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
};
