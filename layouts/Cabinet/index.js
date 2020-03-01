import Panel from "./../../components/Panel";
import { Grid } from "@material-ui/core";
export default props => {
  return (
    <Grid container>
      <Grid item md={2}>
        <Panel />
      </Grid>
      <Grid item md="auto">{props.children}</Grid>
    </Grid>
  );
};
