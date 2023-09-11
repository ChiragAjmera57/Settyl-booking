import React, { useEffect, useState } from "react";

const EventList = ({ eventIds }) => {
  const [eventData, setEventData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const promises = eventIds.map(async (id) => {
        try {
          const response = await fetch(`https://settyl-event-booking2.onrender.com/event/${id}`);
          if (!response.ok) {
            throw new Error(`Error fetching event data for ID ${id}`);
          }
          const eventData = await response.json();
          return eventData;
        } catch (error) {
          console.error(error);
          return null; // Handle errors as needed
        }
      });

      const eventResults = await Promise.all(promises);
      setEventData(eventResults.filter((data) => data !== null));
    };

    fetchData();
  }, [eventIds]);

  return (
    <div>
      <h1>Event List</h1>
      <ul>
    {eventData.map((event, index) => (
      <li key={index}>
        {event ? (
          <>
            <strong>Name:</strong> {event.event.name}<br />
            <strong>Location:</strong> {event.event.location}<br />
            <strong>Date:</strong> {event.event.bookingDeadline}
          </>
        ) : (
          "Event data not available"
        )}
      </li>
    ))}
  </ul>
    </div>
  );
};

export default EventList;
