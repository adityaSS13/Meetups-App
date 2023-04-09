/*'Context' is built-in state manager (if we want to manage global states, states affecting more
  than 1 components) in React, 'Redux' is external.*/
import React, { useEffect, useState } from "react";
import MeetupList from "../components/meetups/MeetupList";

/*
const DUMMY_DATA = [
  //this dummy list of objects will be replaced by actual data requested from a server
  {
    id: "m1",
    title: "This is a first meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/2560px-Stadtbild_M%C3%BCnchen.jpg",
    address: "Meetupstreet 5, 12345 Meetup City",
    description:
      "This is a first, amazing meetup which you definitely should not miss. It will be a lot of fun!",
  },
  {
    id: "m2",
    title: "This is a second meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/2560px-Stadtbild_M%C3%BCnchen.jpg",
    address: "Meetupstreet 5, 12345 Meetup City",
    description:
      "This is a first, amazing meetup which you definitely should not miss. It will be a lot of fun!",
  },
];
*/
/*In real case, the meetups won't come from any dummy data source but from an actual server.
On the 'Add New Meetup' page, we will have a form for entering data about a meetup and then 
that data should be sent to some server(backend) where it'll be stored in some database so that
it can be fetched and loaded in the 'All Meetups' page. By doing that, meetups that are added
in 'Add New Meetup' ('NewMeetup.js') could be shared with all visitors all over the world since 
all data is stored in some database on some backend server and not just in our browser; and the data will also be 
there even if we reload the page. If we just store data in memory, it is lost when we reload the
page because the JS application restarts and the previous state is lost. Thus, the first step is
to add this form to the 'Add New Meetup' page so that in the second step we can gather the 
entered data and send it to the server. 

The data stored in the firebase DB is to be shown on this default 'AllMeetups' page*/

/*We don't want to render this page 'AllMeetupsPage' before the promise returned by 'fetch' gets
 completed. But, JS does not wait for that promise to complete before 'returning' (rendering) the
 JSX. We also cannot use 'async' and 'await' for the functions 'AllMeetupsPage' and 'fetch'
 respectively as React component functions must be synchronous and must not return a promise (they
 need to directly return a JSX). We need to defer returning the JSX until we have a response. We 
 can return a temporary JSX code (eg a loading spinner) and then once we have a response, we need
 to update that return JSX code. We can use states for this. */
function AllMeetupsPage() {
  const [isLoading, setIsLoading] = useState(true); //starting with true
  const [loadedMeetups, setLoadedMeetups] = useState([]);
  /*The data stored in the firebase DB is to be shown on this default 'AllMeetups' page.
    The default method for 'fetch' is 'GET' itself. The 'fetch' function returns a 'promise'
    which resolves to the actual 'response' at some point:*/
  useEffect(() => {
    setIsLoading(true);
    fetch(
      "https://react-meetup-app-ce4a8-default-rtdb.firebaseio.com/meetups.json"
    )
      .then((response) => {
        return response.json(); /*The 'json()' method here gives access to the data, which is 
      automatically converted from json to a plain JS object. But, this method also returns a promise. So, we
      chain. So, we use another 'then' block: */
      })
      .then((data) => {
        // we need to convert the data object into an array:
        const meetups = [];
        for (const key in data) {
          const meetup = {
            id: key,
            ...data[key], //spread operator: https://codeburst.io/what-are-three-dots-in-javascript-6f09476b03e1
          };
          meetups.push(meetup);
        }
        setIsLoading(false); //changing the state to false once we have the data
        setLoadedMeetups(meetups);
      });
  }, []);
  /*The 'useEffect' hook along with a valid second argument makes sures that the fetch block is 
  executed only once after one render, thus preventing an infinite loop. The '[]' as the 2nd
  argument means that there are no dependencies. Had it been say [isLoading], then the fetch
  block would've run whenever there was any change in the value of 'isLoading'. Ideally, in this
  second argument (dependencies array), we should add all external values our useEffect function
  relies on. In this case, there aren't any external values. We can still consider 'setIsLoading'
  and 'setLoadedMeetups' external dependencies and include them in the dependencies array. */

  //temporary JSX while the data is being fetched:
  if (isLoading) {
    return (
      <section>
        <p>loading...</p>
      </section>
    );
  }
  /*In the end, we need to extract that array of meetups from that response data */
  return (
    <section>
      <h1>All Meetups</h1>
      {/*<ul>*/}
      {/* The 'map()' function of JS creates a new array from the results of calling a function 
      for every element. Check - https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_map
      Here, we have named every element/object of the 'DUMMY_DATA' array as 'meetup':
      translating the above list of JS objects into JSX elements, which will be rendered:*/}
      {/*
        {DUMMY_DATA.map((meetup) => {
          return <li key={meetup.id}>{meetup.title}</li>; //array of objects transformed into array of li elements
          //Without the 'key' prop above, react will show this warning:
          //'Each child in a list should have a unique "key" prop.' Check this for info:
          //https://sentry.io/answers/unique-key-prop/ 
        })}
      */}
      {/*</ul>*/}
      {/*<MeetupList meetups={DUMMY_DATA} />*/}
      <MeetupList meetups={loadedMeetups} />
    </section>
  );
}
export default AllMeetupsPage;
