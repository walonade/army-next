import Panel from "./../../components/Panel";
import AppBar from "./../../components/AppBar"
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  root: {
    display: "flex"
  },
  drawwer: {
    width: 300,
    borderRight: "1px solid #DCDCDC"
  },
  content: {
    flexGrow: 1
  },
});
export default props => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.drawwer}>
        <Panel />
      </div>
      <div className={classes.content}>
        <AppBar/>
        {props.children}
      </div>
    </div>
  );
};
