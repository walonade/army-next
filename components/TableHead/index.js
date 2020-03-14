import React, {useMemo} from "react"
import { TableHead, TableCell, TableRow } from "@material-ui/core";
import { kindOfCrimeData } from "./../../data";
export default props => {
  const season = props.week ? (
    <TableCell align="center" variant="head">День недели</TableCell>
  ) : (
    <TableCell align="center" variant="head">Время суток</TableCell>
  );
  const crimes = useMemo(
    () =>
      kindOfCrimeData.map(item => (
        <TableCell align="center" variant="head" key={item}>
          {item}
        </TableCell>
      )),
    [kindOfCrimeData.length]
  );
  return (
    <TableHead>
      <TableRow>
        {season}
        {crimes}
        <TableCell align="center" variant="head">итого</TableCell>
        <TableCell align="center" variant="head">В %</TableCell>
        <TableCell align="center" variant="head">раскр. %</TableCell>
        <TableCell align="center" variant="head">нераскр. %</TableCell>
      </TableRow>
    </TableHead>
  );
};
