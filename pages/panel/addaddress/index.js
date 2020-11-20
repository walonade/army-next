import React, { Fragment } from "react"
import MainLayout from "../../../layouts/Main"
import FormAddress from "../../../components/admin/FormAddress"
import { makeStyles } from "@material-ui/core/styles"
import { Paper } from "@material-ui/core/"
import AppBar from "../../../components/AppBar"
import { withAuthSync } from "../../../utils/auth"
const useStyle = makeStyles(theme => ({
 root: {
  marginTop: 100,
  display: "flex",
  width: "100%",
  justifyContent: "center",
 },
 paper: {
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignSelf: "flex-start",
  paddingLeft: 20,
  paddingRight: 20,
  width: "100%",
 },
}))
const AddAddressPage = () => {
 const classes = useStyle()
 return (
  <Fragment>
    <AppBar/>
   <Paper className={classes.paper}>
    <FormAddress />
   </Paper>
  </Fragment>
 )
}
AddAddressPage.Layout = MainLayout
export default withAuthSync(AddAddressPage, true)
