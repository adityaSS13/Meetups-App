import { Route, Routes } from "react-router-dom";
/*The job of the 'Route' component is to define different paths in the url we want to listen 
 to and which component should be loaded for these different paths */
import AllMeetupsPage from "./pages/AllMeetups";
import FavouritesPage from "./pages/Favourites";
import NewMeetupPage from "./pages/NewMeetup";
import React from "react";
//import MainNavigation from "./components/layouts/MainNavigation";
import Layout from "./components/layouts/Layout";

function App() {
  /*The part after the domain (in our case it is 'localhost:3000') is the path which can be just a simple
    slash ('/') (which can be considered as the default path). We define for which path which 
    component should be loaded: (we can choose any names for the paths) */
  return (
    <Layout>
      {/*<div>*
      <MainNavigation />*/}
      <Routes>
        <Route path="/" element={<AllMeetupsPage />} />
        {/*This will be the starting/default page*/}
        <Route path="/new-meetup" element={<NewMeetupPage />} />
        <Route path="/favourites" element={<FavouritesPage />} />
        {/*if the current url matches a particular path, then that particular component will be 
        rendered*/}
      </Routes>
      {/*</div>*/}
    </Layout>
  );
}

export default App;
