/*In real case, the meetups won't come from any dummy data source but from an actual server.
On the 'Add New Meetup' page, we will have a form for entering data about a meetup and then 
that data should be sent to some server(backend) where it'll be stored in some database so that
it can be fetched and loaded in the 'All Meetups' page. By doing that, meetups that are added
in 'Add New Meetup' could be shared with all visitors all over the world since all data is stored
in some database on some backend server and not just in our browser; and the data will also be 
there even if we reload the page. If we just store data in memory, it is lost when we reload the
page because the JS application restarts and the previous state is lost. Thus, the first step is
to add this form to the 'Add New Meetup' page (this one) so that in the second step we can gather
the entered data and send it to the server. */

import React from "react";
import { useNavigate } from "react-router-dom";
//'useHistory' is deprecated; is replaced by 'useNavigate'
import NewMeetupForm from "../components/meetups/NewMeetupForm";

function NewMeetupPage() {
  const history = useNavigate();

  function addMeetupHandler(meetupData) {
    /*The JS inbuilt function 'fetch' that allows us to send http requests (we can also use
      3rd party packages like 'axios' for sending http requests): */
    fetch(
      "https://react-meetup-app-ce4a8-default-rtdb.firebaseio.com/meetups.json",
      {
        method: "POST",
        body: JSON.stringify(meetupData),
        headers: {
          "Content-Type": "application/json", //metadata
        },
      }
      //We can do more things with 'fetch' like 'listen' to success and fail cases
      //'fetch' returns a 'promise', which resolves as soon as this is done
      //https://www.programiz.com/javascript/promise
      /*in the 'then' block, we define a function which will execute when the promise completes,
        here, we simply navigate to the default home page after the promise completes: */
    ).then(() => {
      history.replace("/");
    });
    //argument is the string - url to which we send our request
    /*This url can be manipulated; we can add 'segments' after this domain and these segements will
    be translated in 'folders' (tables in the DB):
    https://react-meetup-app-ce4a8-default-rtdb.firebaseio.com/meetups - this would add a 'meetups'
    table/collection to the database (we add '.json' as per firebase's requirement).
    By default, 'fetch' sends a 'GET' request. Most APIs are built such that storing data requires
    a 'POST' request. POST is used to send data to a server to create/update a resource. */
  }
  return (
    <section>
      <h1>Add New Meetup</h1>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </section>
  );
}
export default NewMeetupPage;
