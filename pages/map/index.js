import CabinetLayout from "../../layouts/Cabinet"
import dynamic from "next/dynamic"
import { withAuthSync } from "../../utils/auth.js"
const Map = dynamic(import("../../components/Map"), { ssr: false })
const MapPage = () => {
 return <Map />
}
MapPage.Layout = CabinetLayout
export default withAuthSync(MapPage)
