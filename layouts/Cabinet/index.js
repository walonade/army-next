import React, { useRef, Fragment, useEffect } from "react"
import Panel from "./../../components/Panel"
import { makeStyles } from "@material-ui/core/styles"
import withStore from "../../utils/withStore"
const useStyles = makeStyles({
 root: {
  display: "flex",
  justifyContent: "flex-end",
  height: "100vh",
 },
 drawwer: {
  position: "fixed",
  top: 5,
  left: 5,
  height: "95%",
  width: 300,
  padding: 10,
  background: "#FFFFFF",
  boxShadow: "1px 1px 20px 2px rgba(0, 0, 0, 0.25)"
 },
 content: {
  width: "100vw - 305px"
 },
})
export default withStore(props => {
 const classes = useStyles()
 const componentRef = useRef()
 useEffect(() => {
    props.store.SistemDataStore.getSistemData()
  }, [])
 return (
  <div className={classes.root}>
   <div className={classes.drawwer}>
    <Panel printBlog={componentRef} />
   </div>
   <div className={classes.content}>
    <Fragment ref={componentRef}>{props.children}</Fragment>
   </div>
  </div>
 )
})
