import React, { useCallback, useState } from "react";
import { Container, Card, TextField, Button, Switch } from "@material-ui/core/";
import Router from "next/router";
import { setToken } from "./../../utils/auth.js";
import fetch from "isomorphic-unfetch";
import { makeStyles } from "@material-ui/core/styles";
const useStyle = makeStyles({
  card: {
    maxWidth: 400,
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: 200,
    padding: 80,
    textAlign: "center"
  },
  title: {
    marginBottom: 30,
    marginLeft: "auto",
    marginRight: "auto"
  },
  form: {
    width: "80%",
    marginRight: "auto",
    marginLeft: "auto"
  },
  field: {
    display: "block",
    marginRight: "auto",
    marginLeft: "auto",
    marginBottom: 50
  },
  controls: {
    display: "flex",
    justifyContent: "space-between"
  }
});
const Auth = props => {
  const [data, setData] = useState({
    login: "",
    password: ""
  });
  const classes = useStyle();
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
      Router.push("/");
    }
  });
  return (
    <Container>
      <Card className={classes.card}>
        <h1 className={classes.title}>Авторизация</h1>
        <form className={classes.form} onSubmit={onSubmit}>
          <TextField
            onChange={handleSetLogin}
            label="Введите логин"
            fullWidth
            className={classes.field}
          />
          <TextField
            onChange={handleSetPassword}
            label="Введите пароль"
            fullWidth
            className={classes.field}
          />
          <div className={classes.controls}>
            <Button type="submit" variant="contained" color="primary">
              Войти
            </Button>
          </div>
        </form>
      </Card>
    </Container>
  );
};
export default Auth;
