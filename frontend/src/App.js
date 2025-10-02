import React, { useState, useEffect } from 'react';


function App() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/activities')
      .then(response => response.json())
      .then(data => {
        setActivities(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching activities:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="App">Loading Mindful Moments...</div>;

  return (
    <div className="App">
      <header className="App-header">
        <h1>🌿 Mindful Moments</h1>
        <p>Your calming activities companion</p>
        
        <div className="activities-list">
          <h2>Available Activities</h2>
          {activities.map(activity => (
            <div key={activity.id} className="activity-card">
              <h3>{activity.name}</h3>
              <p>Duration: {activity.duration} seconds</p>
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;