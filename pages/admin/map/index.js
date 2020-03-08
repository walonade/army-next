import CabinetLayout from "./../../../layouts/AdminCabinet";
import dynamic from "next/dynamic";
const Map = dynamic(import("./../../../components/Map"), {ssr: false});
import { withAuthSync } from "./../../../utils/auth.js";
const MapPage = props => {
  return <Map />;
};
MapPage.Layout = CabinetLayout;
export default withAuthSync(MapPage, true);
