import { withAuthSync } from "./../../utils/auth";
import CabinetLayout from "./../../layouts/Cabinet";
import { makeStyles } from "@material-ui/core/styles";
import Card from "./../../components/Card";
const useStyles = makeStyles({
  root: {
    paddingTop: 50,
    display: "flex",
    width: "calc(100vw - 300px)",
    justifyContent: "space-evenly"
  }
});
const data = [
  {
    id: 0,
    header: "Карта",
    image: "/images/map-icon.jpg",
    href: "/public/map"
  },
  {
    id: 1,
    header: "Таблица",
    image: "/images/table-icon.png",
    href: "/public/report"
  }
];
const Public = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {data.map(item => (
        <Card
          key={item.id}
          header={item.header}
          image={item.image}
          href={item.href}
        />
      ))}
    </div>
  );
};
Public.Layout = CabinetLayout;
export default withAuthSync(Public);
