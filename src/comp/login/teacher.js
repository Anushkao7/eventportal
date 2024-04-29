import React, { useState, useEffect } from 'react';

const EventList = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        // Fetch events data from API
        fetch('http://127.0.0.1:8000/api/events/') // Update the URL according to your API endpoint
            .then(response => response.json())
            .then(data => setEvents(data))
            .catch(error => console.error('Error fetching events:', error));
    }, []);

    const handleApprove = (eventId) => {
        // Update the 'approved' status of the event
        fetch(`/api/events/${eventId}/approve/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ approved: true }),
        })
        .then(response => {
            if (response.ok) {
                // If the request is successful, update the event list
                setEvents(events.map(event => {
                    if (event.id === eventId) {
                        return { ...event, approved: true };
                    }
                    return event;
                }));
            } else {
                throw new Error('Failed to approve event');
            }
        })
        .catch(error => console.error('Error approving event:', error));
    };

    return (
        <div>
            <h2>Event List</h2>
            <ul>
                {events.map(event => (
                    <li key={event.id}>
                        <div>
                            <h3>{event.name}</h3>
                            <p>Date: {event.date}</p>
                            <p>Time: {event.time}</p>
                            <p>Summary: {event.summary}</p>
                            <img src={event.poster} alt={event.name} style={{ maxWidth: '200px' }} />
                            {!event.approved && (
                                <button onClick={() => handleApprove(event.id)}>Approve</button>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EventList;
