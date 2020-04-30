import Router from "next/router";
const MainPage = () => null
MainPage.getInitialProps = async ctx => {
  if (typeof window === "undefined") {
    ctx.res.writeHead(302, { Location: "/public" });
    ctx.res.end();
  } else {
    Router.push("/public");
  }
}
export default MainPage
