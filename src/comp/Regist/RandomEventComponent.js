import React, { useState, useEffect } from 'react';
import eventsData from '../Regist/events.json';
import './random.css'; // Import CSS file
import { useNavigate } from 'react-router-dom';

const RandomEventComponent = () => {
  const navigate = useNavigate();
  const [randomEvents, setRandomEvents] = useState([]);

  useEffect(() => {
    getRandomEvents();
  }, []);

  const getRandomEvents = () => {
    const numEventsToShow = 3; // Number of random events to display
    const shuffledEvents = shuffleArray(eventsData); // Shuffle the events array
    const selectedEvents = shuffledEvents.slice(0, numEventsToShow); // Select a subset of events
    setRandomEvents(selectedEvents);
  };

  // Function to shuffle an array
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  return (
    <div>
      <div className='sus'>
        <h2>Submit Successfully</h2>
      </div>
      <div className="random-event-container">
        <h3>Other Event Recommendation</h3>
        {randomEvents.map((event, index) => (
          <div key={index} className="random-event">
            <p>Name: {event.eventName}</p>
            <p>Link: <a href={event.eventLink}>{event.eventLink}</a></p>
          </div>
        ))}
        <div className='but'>
        <button type="submit" onClick={() => navigate('/')}>Back to Home</button></div>
      </div>
    </div>
  );
};

export default RandomEventComponent;
