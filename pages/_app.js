import React from "react"
import NextApp from "next/app"
import { fetchInitialStoreState, Store } from "../store"
import { Provider } from "mobx-react"
import DefaultLayout from "./../layouts/Main"
import "leaflet/dist/leaflet.css"
import "./../styles/normalize.css"
import "./../styles/style.css"
import "./../styles/print.css"
import "typeface-roboto"
import Notification from "./../components/Snackbar"
import BackDrop from "../components/BackDrop"
export default class App extends NextApp {
 state = {
  store: new Store(),
 }
 componentDidMount() {
  const jssStyles = document.querySelector("#jss-server-side")
  if (jssStyles && jssStyles.parentNode)
   jssStyles.parentNode.removeChild(jssStyles)
 }
 render() {
  const { Component, pageProps } = this.props
  const Layout = Component.Layout || DefaultLayout
  return (
   <Provider store={this.state.store}>
     <Layout>
      <Component {...pageProps} />
     </Layout>
     <Notification />
     <BackDrop/>
   </Provider>
  )
 }
}
