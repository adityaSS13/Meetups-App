import MeetupItem from "./MeetupItem";
import classes from "./MeetupList.module.css";
import React from "react";

function MeetupList(props) {
  return (
    <ul className={classes.list}>
      {props.meetups.map((meetup) => (
        //multiple props:
        <MeetupItem
          key={meetup.id}
          id={meetup.id}
          image={meetup.image}
          title={meetup.title}
          address={meetup.address}
          description={meetup.description}
          /*Alternatively, we could have also used one single prop like this, but it would have
           had to be destructured inside the 'MeetupItem' component:
           meetup = {meetup} */
        />
      ))}
    </ul>
  );
}

export default MeetupList;
