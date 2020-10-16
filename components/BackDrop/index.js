import { Backdrop, CircularProgress } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import withStore from "../../utils/withStore"
const useStyles = makeStyles({
 backdrop: {
  zIndex: 10,
//   color: "#fff",
  background: "linear-gradient(360deg, rgba(104, 103, 103, 0.5) 0%, rgba(79, 78, 78, 0.155) 100%)"
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
