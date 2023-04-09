/*'Context' is built-in state manager (if we want to manage global states, states affecting more
  than 1 components) in React, 'Redux' is external. The list of 'favourites' is some state that
  should cause the UI to update. We need to manage that state GLOBALLY and distribute it to 
  different components. (Without global states, we could use one state in App.js and then use props
  to affect the behavior of other components)*/

import React, { createContext, useState } from "react";

const FavouritesContext = createContext({
  favourites: [],
  totalFavourites: 0,
  addFavourite: (favouriteMeetup) => {},
  removeFavourite: (meetupId) => {},
  itemIsFavourite: (meetupId) => {},
});

/* The createContext creates an object which contains a react component (called 'Provider'). 
   We pass an object as a parameter. This 'Provider' component needs to be wrapped around all the 
   components that are interested in interacting with that context. We can use it in index.js to
   wrap it around the entire app so that all the components in the app have an access to the 
   context.*/

/*The 'Provider' component needs a 'value' prop where we pass the current context value. We set
the initial values above (favourites and totalFavourites) but we can update those values and pass
the latest values with help of this 'value' prop. Whenever that 'value' changes, all components 
that are listening to our context will be updated in the end. */

/*This component 'FavouritesContextProvider' will be our regular react component but it will 
provide this context to all the components that are interested in listening to the values. This 
component will also be responsible for updating the context values: */

export function FavouritesContextProvider(props) {
  const [userFavourites, setUserFavourites] = useState([]);

  function addFavouriteHandler(favouriteMeetup) {
    setUserFavourites((prevUserFavourites) => {
      return prevUserFavourites.concat(favouriteMeetup);
      //'concat' is like 'push', but it returns a new array
    });
  }

  function removeFavouriteHandler(meetupId) {
    setUserFavourites((prevUserFavourites) => {
      return prevUserFavourites.filter((meetup) => meetup.id !== meetupId);
      //dropping that meetup whose id matches
    });
  }

  function itemIsFavouriteHandler(meetupId) {
    return userFavourites.some((meetup) => meetup.id === meetupId);
    //'some' inbuilt function returns true if some item in the array matches our condition
  }

  /*The above 3 functions should be called from inside some of our other components and pages */

  const context = {
    favourites: userFavourites,
    totalFavourites: userFavourites.length,
    //simply 'pointing' at the functions:
    addFavourite: addFavouriteHandler,
    removeFavourite: removeFavouriteHandler,
    itemIsFavourite: itemIsFavouriteHandler,
  };

  return (
    <FavouritesContext.Provider value={context}>
      {props.children}
    </FavouritesContext.Provider>
  );
}

export default FavouritesContext;
