import React from 'react';
import MapContainer from './MapContainer';

const App = () => {
  const surveyor_master_id = '978';
  return (
    <div>
      <h1>Partner Location</h1>
      <MapContainer surveyor_master_id={surveyor_master_id} />
    </div>
  );
};
export default App;
