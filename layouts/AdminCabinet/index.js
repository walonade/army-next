import AdminPanel from "./../../components/admin/AdminPanel";
import { Grid } from "@material-ui/core";
export default props => {
  return (
    <Grid container>
      <Grid item md={2}>
        <AdminPanel />
      </Grid>
      <Grid item md="auto">{props.children}</Grid>
    </Grid>
  );
};
