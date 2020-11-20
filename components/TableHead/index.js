import React, { useMemo } from "react"
import { TableHead, TableCell, TableRow } from "@material-ui/core"
import { withStyles } from "@material-ui/core/styles"
import withStore from "../../utils/withStore"
const TableHeader = withStyles({
    head: {
      background: "#3749AA",
      color: "white"
    }
  })(TableCell)
export default withStore(props => {
  const {crimesList} = props.store.SistemDataStore.sistemData
 const season = props.week ? (
  <TableHeader align="center" variant="head">
   День недели
  </TableHeader>
 ) : (
  <TableHeader align="center" variant="head">
   Время суток
  </TableHeader>
 )
 const crimes = useMemo(
  () =>
  crimesList.map(item => (
    <TableHeader align="center" variant="head" key={item}>
     {item}
    </TableHeader>
   )),
  [crimesList.length]
 )
 return (
  <TableHead>
   <TableRow>
    {season}
    {crimes}
    <TableHeader align="center" variant="head">
     итого
    </TableHeader>
    <TableHeader align="center" variant="head">
     В %
    </TableHeader>
    <TableHeader align="center" variant="head">
     раскр. %
    </TableHeader>
    <TableHeader align="center" variant="head">
     нераскр. %
    </TableHeader>
   </TableRow>
  </TableHead>
 )
})
