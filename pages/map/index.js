import CabinetLayout from "../../layouts/Cabinet"
import Head from "next/head"
import { withAuthSync } from "../../utils/auth.js"
import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
const MapPage = props => {
   let [Map, setMap] = useState(null)
   useEffect(() => {
      setMap(dynamic(import("../../components/Map"), {ssr: false}))
   }, [])
 return <>
      <Head>
        <title>Карта</title>
     </Head>
     {Map !== null ? <Map {...props}/> : null}
 </>
}
MapPage.Layout = CabinetLayout
export default withAuthSync(MapPage)
