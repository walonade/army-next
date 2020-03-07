import React, { useEffect } from "react";
import nextCookie from "next-cookies";
import cookie from "js-cookie";
import Router, { useRouter } from "next/router";
export const logout = () => {
  cookie.remove("token");
  window.localStorage.setItem("logout", Date.now());
  Router.push("/login");
};
export const setToken = token => {
  cookie.set("token", token, { expires: 1 });
};
export const setAdmin = boolean => {
  cookie.set("isAdmin", boolean, { expires: 1 });
};
export const auth = (ctx, forAdmin) => {
  const { token, isAdmin } = nextCookie(ctx);
  const url = forAdmin ? "admin" : "public";
  if (forAdmin) {
    if (!isAdmin) {
      if (typeof window === "undefined") {
        ctx.res.writeHead(302, { Location: "/admin/login" });
        ctx.res.end();
      } else {
        Router.push("/admin/login");
      }
    }
  }
  if (!forAdmin) {
    if (isAdmin) {
      if (typeof window === "undefined") {
        ctx.res.writeHead(302, { Location: "/public/login" });
        ctx.res.end();
      } else {
        Router.push("/public/login");
      }
    }
  }
  if (!token) {
    if (typeof window === "undefined") {
      ctx.res.writeHead(302, { Location: `/${url}/login` });
      ctx.res.end();
    } else {
      Router.push(`/${url}/login`);
    }
  }
  return token;
};
export const withAuthSync = (WrappedComponent, forAdmin = false) => {
  const Wrapper = props => {
    const syncLogout = event => {
      if (event.key === "logout") {
        Router.push("/public/login");
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
  Wrapper.Layout = WrappedComponent.Layout;
  Wrapper.getInitialProps = async ctx => {
    const token = auth(ctx, forAdmin);
    const componentProps =
      WrappedComponent.getInitialProps &&
      (await WrappedComponent.getInitialProps(ctx));

    return { ...componentProps, token };
  };
  return Wrapper;
};
