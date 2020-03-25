import { AppBar, Toolbar, IconButton } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import withStore from "./../../utils/withStore.js"
const useStyles = makeStyles({
  toolbar: {
    height: 50,
    display: "flex",
    justifyContent: "space-between"
  },
  button: {
    color: "white"
  }
});
export default withStore(props => {
  const classes = useStyles();
  const router = useRouter();
  const back = () => router.back();
  return (
    <AppBar position="sticky">
      <Toolbar className={classes.toolbar}>
        <IconButton className={classes.button} onClick={back}>
          <ArrowBackIosIcon />
        </IconButton>
        <IconButton className={classes.button} onClick={props.store.logout}>
          <ExitToAppIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
})
