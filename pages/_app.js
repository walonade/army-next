import React from "react";
import NextApp from "next/app";
import { fetchInitialStoreState, Store } from "../store";
import { Provider } from "mobx-react";
import DefaultLayout from "./../layouts/Main";
import { ThemeProvider } from "styled-components";
import "leaflet/dist/leaflet.css";
import "./../styles/normalize.css";
import "./../styles/style.css"

const theme = {
  primary: "green"
};

export default class App extends NextApp {
  state = {
    store: new Store()
  };
  static async getInitialProps(appContext) {
    const appProps = await NextApp.getInitialProps(appContext);
    const initialStoreState = await fetchInitialStoreState();
    return {
      ...appProps,
      initialStoreState
    };
  }
  componentDidMount() {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentNode)
      jssStyles.parentNode.removeChild(jssStyles);
  }
  static getDerivedStateFromProps(props, state) {
    state.store.hydrate(props.initialStoreState);
    return state;
  }
  render() {
    const { Component, pageProps } = this.props;
    const Layout = Component.Layout || DefaultLayout;
    return (
      <Provider store={this.state.store}>
        <ThemeProvider theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </Provider>
    );
  }
}
