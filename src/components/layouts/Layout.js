import React from "react";
import MainNavigation from "./MainNavigation";
import classes from "./Layout.module.css";

function Layout(props) {
  return (
    <div style={{ backgroundColor: "lightskyblue" }}>
      <MainNavigation />
      {/*Check this for 'main' tag: https://www.w3schools.com/tags/tag_main.asp */}
      <main className={classes.main}>{props.children}</main>
    </div>
  );
}

export default Layout;
