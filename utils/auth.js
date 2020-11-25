import React from "react"
import nextCookie from "next-cookies"
import jwtDecode from "jwt-decode"
import Router from "next/router"
export const auth = (ctx, forAdmin) => {
 const { token } = nextCookie(ctx)
 let isAdmin
 if(token) {
    const candidate = jwtDecode(token)
    isAdmin = candidate.isAdmin
 }
 if (!token) {
  if (typeof window === "undefined") {
   if(ctx.req.url !== "/") {
      ctx.res.writeHead(302, { Location: `/` })
      ctx.res.end()
   }
  } else {
   if(Router.pathname !== "/") Router.push("/")
  }
 }
 if(forAdmin === "admin") {
    if(!isAdmin) {
        if (typeof window === "undefined") {
            ctx.res.writeHead(302, { Location: `/` })
            ctx.res.end()
           } else {
            Router.push(`/`)
           }
    }
 }
 return {token, isAdmin}
}
export const withAuthSync = (WrappedComponent, forAdmin) => {
 const Wrapper = props => <WrappedComponent {...props} />
 Wrapper.Layout = WrappedComponent.Layout
 Wrapper.getInitialProps = async ctx => {
  const {token, isAdmin} = auth(ctx, forAdmin)
  const componentProps =
   WrappedComponent.getInitialProps &&
   (await WrappedComponent.getInitialProps(ctx))
  return { ...componentProps, token, isAdmin }
 }
 return Wrapper
}
