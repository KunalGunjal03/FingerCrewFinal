import React from 'react';
import MapContainer from './MapContainer';

const App = () => {
  const surveyor_master_id = '978'; // Replace with the desired user ID

  return (
    <div>
      <h1>User Location</h1>
      <MapContainer surveyor_master_id={surveyor_master_id} />
    </div>
  );
};

export default App;
