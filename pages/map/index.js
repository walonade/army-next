import CabinetLayout from "../../layouts/Cabinet"
import Head from "next/head"
import { withAuthSync } from "../../utils/auth.js"
import dynamic from "next/dynamic"
const Map = dynamic(import("../../components/Map"), {ssr: false})
const MapPage = props => {
 return <>
      <Head>
        <title>Карта</title>
     </Head>
     <Map {...props}/> 
 </>
}
MapPage.Layout = CabinetLayout
export default withAuthSync(MapPage)
