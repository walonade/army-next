import React, { useEffect } from "react";
import nextCookie from "next-cookies";
import cookie from "js-cookie";
import Router from "next/router";
export const logout = () => {
  cookie.remove("token");
  window.localStorage.setItem("logout", Date.now());
  Router.push("/login");
};
export const setToken = token => {
  cookie.set("token", token, { expires: 1 });
  Router.push("/user");
};
export const auth = ctx => {
  const { token } = nextCookie(ctx);
  if (ctx.req && !token) {
    ctx.res.writeHead(302, { Location: "/login" });
    ctx.res.end();
    return;
  }
  if (!token) {
    Router.push("/login");
  }
  return token;
};
export const withAuthSync = WrappedComponent => {
  const Wrapper = props => {
    const syncLogout = event => {
      if (event.key === "logout") {
        Router.push("/login");
      }
    };
    useEffect(() => {
      window.addEventListener("storage", syncLogout);
      return () => {
        window.removeEventListener("storage", syncLogout);
        window.localStorage.removeItem("logout");
      };
    });
    return <WrappedComponent {...props} />;
  };
  Wrapper.Layout = WrappedComponent.Layout
  Wrapper.getInitialProps = async ctx => {
    const token = auth(ctx);
    const componentProps =
      WrappedComponent.getInitialProps &&
      (await WrappedComponent.getInitialProps(ctx));

    return { ...componentProps, token };
  };
  return Wrapper;
};
