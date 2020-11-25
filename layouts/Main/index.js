import { Grid } from "@material-ui/core"
import { useEffect } from "react"
import withStore from "../../utils/withStore"
export default withStore(props => {
    useEffect(() => {
        props.store.SistemDataStore.getSistemData()
    }, [])
 return <Grid container>{props.children}</Grid>
})
