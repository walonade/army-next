import CabinetLayout from "./../../layouts/AdminCabinet";
import { makeStyles } from "@material-ui/core/styles";
import { withAuthSync } from "./../../utils/auth.js";
import Card from "./../../components/Card"
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
    href: "/admin/map"
  },
  {
    id: 1,
    header: "Таблица",
    image: "/images/table-icon.png",
    href: "/admin/report"
  },
  {
    id: 2,
    header: "Панель администратора",
    image: "/images/panel.jpg",
    href: "/admin/panel"
  }
];
const Admin = () => {
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
Admin.Layout = CabinetLayout;
export default withAuthSync(Admin, true)
