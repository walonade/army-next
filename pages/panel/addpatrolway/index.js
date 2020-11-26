import MainLayout from "../../../layouts/Main"
import withStore from "../../../utils/withStore"
import { Map, TileLayer, withLeaflet } from "react-leaflet"
import L from "leaflet"
import { Paper } from "@material-ui/core"
const AddPatrolWayPage = withStore(() => {
    const fixStyleMap = {
        height: "calc(100vh - 20px)",
        width: "calc(100vw - 20px)",
       }
    return (
        <Paper>
        </Paper>
    )
})
AddPatrolWayPage.Layout = MainLayout
export default AddPatrolWayPage