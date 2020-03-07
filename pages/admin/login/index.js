import React, { useState, useCallback } from "react";
import Form from "./../../../components/AuthorizationForm";
import Router from "next/router";
import { setToken, setAdmin } from "./../../../utils/auth.js";
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
    const response = await fetch("/api/admin/login", {
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
      setAdmin(true);
      Router.push("/admin");
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
