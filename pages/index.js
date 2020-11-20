import React, {useEffect} from "react"
import Main from "../layouts/Main"
import { makeStyles, withStyles } from "@material-ui/core/styles"
import { Typography } from "@material-ui/core"
import Link from "next/link"
import AuthorizationForm from "../components/AuthorizationForm"
import withStore from "../utils/withStore"
const useStyles = makeStyles({
 root: {
  width: "100vw",
  textAlign: "center",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)"
 },
 cards: {
    display: "flex",
    justifyContent: "space-evenly",
    justifyItems: "flex-end"
 },
 card: {
    cursor: "pointer"
 }
})
const MyTypography = withStyles({
   h1: {
      fontSize: 64,
      fontStyle: "normal",
      fontWeight: 400,
   }
})(Typography)
const data = [
 {
  id: 0,
  image: "/images/map.svg",
  href: "/map",
 },
 {
  id: 1,
  image: "/images/table.svg",
  href: "/report",
 },
]
const Public = props => {
 const classes = useStyles()
 const isAuthorization = props.store.token === null ? true : false
 return (
     <>
   <div className={classes.root}>
   <MyTypography variant="h1">Выберите действие</MyTypography>
  <div className={classes.cards}>
   {data.map(item => (
    <Link href={item.href} key={item.id}>
     <img className={classes.card} src={item.image}/>
    </Link>
   ))}
  </div>
  </div>
   {isAuthorization ? <AuthorizationForm/> : null}
    </>
 )
}
Public.Layout = Main
export default withStore(Public)
