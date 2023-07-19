// import React, { useEffect, useRef } from 'react';
// const MapContainer = () => {
//   const mapRef = useRef(null);

//   useEffect(() => {
//     const loadMap = () => {
//       const directionsService = new window.google.maps.DirectionsService();
//       const directionsRenderer = new window.google.maps.DirectionsRenderer();
//       const map = new window.google.maps.Map(mapRef.current, {
//         center: { lat: 19.21703592403442, lng: 72.98127298408392 },
//         zoom: 12,
//       });

//       directionsRenderer.setMap(map);
//       const calculateAndDisplayRoute = () => {
//         const startLocation = new window.google.maps.LatLng(19.21703592403442, 72.98127298408392);
//         const endLocation = new window.google.maps.LatLng(19.98481380195198, 73.75850085700372);
//         const surveyorLocation = new window.google.maps.LatLng(19.69636957222291, 73.5593589473057);
//         directionsService.route(
//           {
//             origin: startLocation,
//             waypoints: [{ location: surveyorLocation }],
//             destination: endLocation,
//             travelMode: 'DRIVING',
//           },
//           (response, status) => {
//             if (status === 'OK') {
//               directionsRenderer.setDirections(response);
//             } else {
//               console.error('Directions request failed due to ' + status);
//             }
//           }
//         );
//       };
//       calculateAndDisplayRoute();
//     };

//     // Load the Google Maps API script
//     const script = document.createElement('script');
//     script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAi7UdyfGU-fWu5M3_lzvixtXFTZyAZVe8&libraries=places`;
//     script.async = true;
//     script.defer = true;
//     script.onload = loadMap;
//     document.head.appendChild(script);

//     return () => {
//       // Clean up the script tag to avoid memory leaks
//       document.head.removeChild(script);
//     };
//   }, []);

//   return <div ref={mapRef} style={{ width: '100%', height: '600px' }} />;
// };
// export default MapContainer;

// export default GoogleApiWrapper({
//     apiKey: "AIzaSyAi7UdyfGU-fWu5M3_lzvixtXFTZyAZVe8"
// })(MapContainer);


import React, { useEffect, useRef, useState } from 'react';
import { getLatLongSouryour } from 'services/mapApi';
const MapContainer = ({ surveyor_master_id }) => {
  const mapRef = useRef(null);
  const [userLocation, setUserLocation] = useState(null);
  const [startLocation, setStartLocation] = useState(null);
  useEffect(() => {
    const loadMap = () => {
      const directionsService = new window.google.maps.DirectionsService();
      const directionsRenderer = new window.google.maps.DirectionsRenderer();
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 19.21703592403442, lng: 72.98127298408392 },
        zoom: 12,
      });

      directionsRenderer.setMap(map);
      const fetchUserLocation = async () => {
        try {
          // Fetch user's latitude and longitude from the API
          const response = await getLatLongSouryour(surveyor_master_id);
          const data = await response.getData;
          const lastData = data[data.length - 1]; // Get the last element of the array
          const userLatitude = lastData.latitude;
          const userLongitude = lastData.longitude;
          const startData=data[0];
          const startLatitude = startData.latitude;
          const startLongitude = startData.longitude;
          console.log(lastData);
          console.log(startData);

          setUserLocation({ latitude: userLatitude, longitude: userLongitude });
          setStartLocation({latitude:startLatitude,longitude:startLongitude});

          const startLocation = new window.google.maps.LatLng(startLatitude,startLongitude);
          const endLocation = new window.google.maps.LatLng(19.98481380195198, 73.75850085700372);
          const surveyorLocation = new window.google.maps.LatLng(userLatitude, userLongitude);

          directionsService.route(
            {
              origin: startLocation,
              waypoints: [{ location: surveyorLocation }],
              destination: endLocation,
              travelMode: 'DRIVING',
            },
            (response, status) => {
              if (status === 'OK') {
                directionsRenderer.setDirections(response);
              } else {
                console.error('Directions request failed due to ' + status);
              }
            }
          );
        } catch (error) {
          console.error('Error fetching user location:', error);
        }
      };
      fetchUserLocation();
      // Update user's location every 2 minutes
      const interval = setInterval(fetchUserLocation, 60000);
      return () => {
        clearInterval(interval);
      };
    };

    // Check if the Google Maps API script is already loaded
    if (!window.google || !window.google.maps) {
      // Load the Google Maps API script
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAi7UdyfGU-fWu5M3_lzvixtXFTZyAZVe8&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = loadMap;
      document.head.appendChild(script);

      return () => {
        // Clean up the script tag to avoid memory leaks
        document.head.removeChild(script);
      };
    } else {
      loadMap();
    }
  }, [surveyor_master_id]);

  return <div ref={mapRef} style={{ width: '100%', height: '600px' }} />;
};
export default MapContainer;