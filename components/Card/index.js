import { makeStyles } from "@material-ui/core/styles"
import {
 Card,
 CardContent,
 CardMedia,
 CardActions,
 CardActionArea,
 Typography,
 Button,
} from "@material-ui/core"
import NavigateNextIcon from "@material-ui/icons/NavigateNext"
import Link from "next/link"
import { useRouter } from "next/router"
const useStyles = makeStyles({
 card: {
  height: 350,
  width: 350,
 },
 image: {
  width: 350,
  height: 250,
 },
 button: {
  width: "100%",
 },
})

export default props => {
 const classes = useStyles()
 const router = useRouter()
 const next = () => router.push(props.href)
 return (
  <Card className={classes.card} onClick={next}>
   <CardActionArea>
    <CardContent className={classes.header}>
     <Typography variant="h6" align="center">
      {props.header}
     </Typography>
    </CardContent>
    <CardMedia image={props.image} className={classes.image} />
   </CardActionArea>
   <CardActions>
    <Link href={props.href}>
     <Button className={classes.button}>
      <NavigateNextIcon />
     </Button>
    </Link>
   </CardActions>
  </Card>
 )
}
