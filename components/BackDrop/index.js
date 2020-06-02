import { Backdrop, CircularProgress } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import withStore from "../../utils/withStore"
const useStyles = makeStyles({
 backdrop: {
  zIndex: 10,
  color: "#fff",
 },
})
export default withStore(props => {
 const classes = useStyles()
 return (
  <Backdrop className={classes.backdrop} open={props.store.isFetching}>
   <CircularProgress color="inherit" />
  </Backdrop>
 )
})
