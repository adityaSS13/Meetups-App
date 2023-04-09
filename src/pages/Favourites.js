import React, { useContext } from "react";
import MeetupList from "../components/meetups/MeetupList";
import FavouritesContext from "../store/favourites-context";

function FavouritesPage() {
  const favouriteCtx = useContext(FavouritesContext);
  let content;
  if (favouriteCtx.totalFavourites === 0) {
    content = (
      <p
        style={{
          color: "red",
          fontWeight: "bold",
          fontStyle: "italic",
          fontSize: "50px",
        }}
      >
        No favourites yet!
      </p>
    );
  } else {
    content = <MeetupList meetups={favouriteCtx.favourites}></MeetupList>;
  }
  return (
    <section>
      <h1>My Favourite meetups</h1>
      {content}
    </section>
  );
}
export default FavouritesPage;
