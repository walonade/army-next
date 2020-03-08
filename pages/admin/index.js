import CabinetLayout from "./../../layouts/AdminCabinet";
import { Grid } from "@material-ui/core";
import { withAuthSync } from "./../../utils/auth.js";
import Link from "next/link";
const Admin = () => {
  return <Grid>tgsdgfghfhghfg</Grid>;
};
Admin.Layout = CabinetLayout;
export default withAuthSync(Admin, true)
