/* This will be the first custom component which can be "wrapped" around jsx content because the
goal is use this 'Card' component on a 'MeetupItem': */
import React from "react";
import classes from "./Card.module.css";

/*We need to use props.children so that the content contained within 'Card' is rendered, otherwise
this 'Card' componenent 'swallows' the whole content and react doesn't display anything enclosed
within.
'props.children' is a special prop which every component receives BY DEFAULT and the 'children'
always hold the content which is passed between the opening and closing component tag. In the 
current case, the 'children' prop holds the following content (in MeetupItem.js):
<div className={classes.image}>
          <img src={props.image} alt={props.title} />
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <address>{props.address}</address>
          <p>{props.description}</p>
        </div>
        <div className={classes.actions}>
          <button>Add to favs!</button>
        </div>
*/
function Card(props) {
  return <div className={classes.card}>{props.children}</div>;
}
export default Card;
