import { Card, Button } from "@material-ui/core/"
import { makeStyles } from "@material-ui/core/styles"
const useStyle = makeStyles({
 card: {
  position: "relative",
  width: 400,
  height: 300,
  marginRight: "auto",
  marginLeft: "auto",
  marginTop: 200,
  padding: 80,
 },
 title: {
  marginBottom: 30,
 },
 flex: {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
 },
})
export default props => {
 const classes = useStyle()
 return (
  <Card className={classes.card}>
   <div className={classes.flex}>
    <h1 className={classes.title}>Выйти</h1>
    <Button
     type="submit"
     variant="contained"
     color="primary"
     onClick={props.logout}
    >
     Выйти
    </Button>
   </div>
  </Card>
 )
}
