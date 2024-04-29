// components/Events.js
import React from "react";
import Card from "./card";
import info from "./info";
import './cardsy.css'

function Events() {
  return (
    <div className="full">
      <h1 className="heading">UPCOMING EVENTS</h1>
      {info.map((event) => (
        <Card
          key={event.id}
          name={event.name}
          img={event.imgURL}
        />
      ))}
    </div>
  );
}

export default Events;
