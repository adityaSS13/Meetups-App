import Card from "../ui/Card";
import classes from "./NewMeetupForm.module.css";
import React, { useRef } from "react";
/*To handle the form submission, we got to do 2 main things - we have to 'listen' to the form
submission and then we have to prevent browser default which is it sends an http request 
automatically, hence reloading the page. We also need to 'read' the entered values */

function NewMeetupForm(props) {
  /*Check this for 'useRef' - https://react.dev/reference/react/useRef */
  //You can think of refs as instance variables of class-based components
  //https://blog.logrocket.com/usestate-vs-useref/
  const titleInputRef = useRef();
  const imageInputRef = useRef();
  const addressInputRef = useRef();
  const descriptionInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault(); //https://stackoverflow.com/questions/43488861/what-does-event-preventdefault-do-exactly-inside-a-submit-button-function

    const enteredTitle = titleInputRef.current.value;
    const enteredImage = imageInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;

    //This data (object) will be sent to a server, which will then store it in a database:
    const meetupData = {
      title: enteredTitle,
      image: enteredImage,
      address: enteredAddress,
      description: enteredDescription,
    };
    //console.log(meetupData);
    props.onAddMeetup(meetupData);
    /*With react or with SPAs in general, we typically need a backend API to which we can send
    our requests (backend which does not send back html but instead expects data in a certain
    format, typically a JSON format; and returns data in that format; which simply exposes some
    urls to which we can send requests..). We don't connect the frontend React to a database 
    directly because of security reasons. The server to which we send request then connects to
    a database and stores data in the same. In this case, we are not writing our own API, but
    instead using 'firebase' as a 'dummy backend' here (firebase has multiple features). 
    'Firebase' is a service which contains a database and an API to which we can send requests 
    which will then ensure that the data is saved in that DB. 
    After we create a 'test' database in firebase, we can use the provided url to send requests
    to. Behind the scenes in the firebase servers, those requests will be parsed and depending 
    on which kind of requests we send, data attached to the request will be extracted and stored
    in the database automatically. It may look like we're directly sending requests to a database
    but we are actually sending requests to the firebase API, which then behind-the-scenes stores
    them in the database. In this case, the url to which we submit our requests on submitting the
    form is: https://react-meetup-app-ce4a8-default-rtdb.firebaseio.com 
    This url can be manipulated; we can add 'segments' after this domain and these segements will
    be translated in 'folders' (tables in the DB)*/
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="title">Meetup Title</label>
          {/*The 'ref' property is used to connect the above refs: */}
          <input type="text" required id="title" ref={titleInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="image">Meetup Image</label>
          <input type="url" required id="image" ref={imageInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="address">Address</label>
          <input type="text" required id="address" ref={addressInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            required
            rows="5"
            ref={descriptionInputRef}
          />
        </div>
        <div className={classes.action}>
          <button className={classes.addButton}>Add Meetup</button>
          {/*By default, a 'submit' event will be triggered if we
          have a 'button' in the form and if that button is clicked */}
        </div>
      </form>
    </Card>
  );
}

export default NewMeetupForm;
