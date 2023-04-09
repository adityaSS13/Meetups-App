import React, { useContext } from "react";
import { Link } from "react-router-dom";
import FavouritesContext from "../../store/favourites-context";
import classes from "./MainNavigation.module.css";

/*We can use standard link anchor tag too, but that's unnecessary because it'll only send 
an additional request to the server. Instead the React router has special component for this: */

function MainNavigation() {
  const favouriteCtx = useContext(FavouritesContext);
  return (
    <header className={classes.header}>
      <div className={classes.logo}>Meetups</div>
      <nav>
        <ul>
          <li>
            <Link to={"/"}>All Meetups</Link>
          </li>
          <li>
            <Link to={"/new-meetup"}>Add a new meetup</Link>
          </li>
          <li>
            <Link to={"/favourites"}>
              My Favourites
              <span className={classes.badge}>
                {favouriteCtx.totalFavourites}
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
