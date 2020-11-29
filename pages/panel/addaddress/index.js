import MainLayout from "../../../layouts/Main"
import { makeStyles } from "@material-ui/core/styles"
import { Paper } from "@material-ui/core/"
import { withAuthSync } from "../../../utils/auth"
import dynamic from "next/dynamic"
const FormAddress = dynamic(import("../../../components/admin/FormAddress"), {ssr: false})
const useStyle = makeStyles({
 paper: {
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignSelf: "flex-start",
  padding: 20,
  width: "100%",
  margin: 20
 },
})
const AddAddressPage = () => {
 const classes = useStyle()
 return (
   <Paper className={classes.paper} elevation={7}>
    <FormAddress /> 
   </Paper>
 )
}
AddAddressPage.Layout = MainLayout
export default withAuthSync(AddAddressPage, "admin")
