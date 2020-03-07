import { Card, TextField, Button } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
const useStyle = makeStyles({
  card: {
    width: 400,
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
export default props => {
  const classes = useStyle();
  return (
    <Card className={classes.card}>
      <h1 className={classes.title}>Авторизация</h1>
      <form className={classes.form} onSubmit={props.onSubmit}>
        <TextField
          value={props.loginValue}
          onChange={props.onChangeLogin}
          label="Введите логин"
          fullWidth
          className={classes.field}
        />
        <TextField
          value={props.passwordValue}
          onChange={props.onChangePassword}
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
  );
};
