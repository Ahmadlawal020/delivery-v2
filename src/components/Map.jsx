import React, { useState, useRef, useEffect } from "react";
import {
  GoogleMap,
  useLoadScript,
  DirectionsRenderer,
} from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "100vh",
};

const center = {
  lat: 37.7749,
  lng: -122.4194,
};

const Map = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [destination, setDestination] = useState(null);
  const [directions, setDirections] = useState(null);
  const mapRef = useRef(null);
  const userMarkerRef = useRef(null);
  const destinationMarkerRef = useRef(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  // Get the user's current location
  const getUserLocation = () => {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const location = { lat: latitude, lng: longitude };
        setUserLocation(location);
        if (mapRef.current) mapRef.current.panTo(location);

        // Create marker for user location
        if (userMarkerRef.current) {
          userMarkerRef.current.setPosition(location);
        } else {
          userMarkerRef.current = new window.google.maps.Marker({
            map: mapRef.current,
            position: location,
            title: "You",
            icon: {
              url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
            },
          });
        }
      },
      (error) => {
        console.error("Error getting user location:", error.message);
      }
    );
  };

  // Handle map click to set destination
  const handleMapClick = (event) => {
    const clickedLocation = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    setDestination(clickedLocation);

    // Create marker for destination
    if (destinationMarkerRef.current) {
      destinationMarkerRef.current.setPosition(clickedLocation);
    } else {
      destinationMarkerRef.current = new window.google.maps.Marker({
        map: mapRef.current,
        position: clickedLocation,
        title: "Destination",
        icon: {
          url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
        },
      });
    }

    calculateRoute(clickedLocation);
  };

  // Calculate route using Directions Service
  const calculateRoute = (destination) => {
    if (!userLocation || !destination) return;

    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: userLocation,
        destination: destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          console.error("Error calculating route:", status);
        }
      }
    );
  };

  // Cleanup markers on unmount
  useEffect(() => {
    return () => {
      if (userMarkerRef.current) userMarkerRef.current.setMap(null);
      if (destinationMarkerRef.current)
        destinationMarkerRef.current.setMap(null);
    };
  }, []);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <div>
      {/* <button onClick={getUserLocation} style={{ marginBottom: "10px" }}>
        Get My Location
      </button> */}
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={userLocation || center}
        onClick={handleMapClick}
        onLoad={(map) => (mapRef.current = map)}
      >
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
      {directions && (
        <div style={{ marginTop: "10px" }}>
          <h3>Route Information</h3>
          <p>Distance: {directions.routes[0].legs[0].distance.text}</p>
          <p>Duration: {directions.routes[0].legs[0].duration.text}</p>
        </div>
      )}
    </div>
  );
};

export default Map;

// import React, { useState, useRef, useEffect } from "react";
// import {
//   GoogleMap,
//   useLoadScript,
//   DirectionsRenderer,
// } from "@react-google-maps/api";

// const mapContainerStyle = {
//   width: "100%",
//   height: "100vh",
// };

// const center = {
//   lat: 37.7749,
//   lng: -122.4194,
// };

// const Map = () => {
//   const [userLocation, setUserLocation] = useState(null);
//   const [destination, setDestination] = useState(null);
//   const [directions, setDirections] = useState(null);
//   const mapRef = useRef();
//   const userMarkerRef = useRef(null);
//   const destinationMarkerRef = useRef(null);

//   const { isLoaded, loadError } = useLoadScript({
//     googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
//   });

//   // Get the user's current location
//   const getUserLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           const location = { lat: latitude, lng: longitude };
//           setUserLocation(location);
//           mapRef.current.panTo(location);

//           // Create AdvancedMarkerElement for user location
//           if (userMarkerRef.current) {
//             userMarkerRef.current.position = location;
//           } else {
//             userMarkerRef.current =
//               new google.maps.marker.AdvancedMarkerElement({
//                 map: mapRef.current,
//                 position: location,
//                 title: "You",
//               });
//           }
//         },
//         (error) => {
//           console.error("Error getting user location:", error);
//         }
//       );
//     } else {
//       console.error("Geolocation is not supported by this browser.");
//     }
//   };

//   // Handle map click to set destination
//   const handleMapClick = (event) => {
//     const destination = {
//       lat: event.latLng.lat(),
//       lng: event.latLng.lng(),
//     };
//     setDestination(destination);

//     // Create AdvancedMarkerElement for destination
//     if (destinationMarkerRef.current) {
//       destinationMarkerRef.current.position = destination;
//     } else {
//       destinationMarkerRef.current =
//         new google.maps.marker.AdvancedMarkerElement({
//           map: mapRef.current,
//           position: destination,
//           title: "Destination",
//         });
//     }

//     calculateRoute(destination);
//   };

//   // Calculate route using Directions Service
//   const calculateRoute = (destination) => {
//     if (!userLocation || !destination) return;

//     const directionsService = new window.google.maps.DirectionsService();
//     directionsService.route(
//       {
//         origin: userLocation,
//         destination: destination,
//         travelMode: window.google.maps.TravelMode.DRIVING,
//       },
//       (result, status) => {
//         if (status === window.google.maps.DirectionsStatus.OK) {
//           setDirections(result);
//         } else {
//           console.error("Error calculating route:", status);
//         }
//       }
//     );
//   };

//   // Cleanup markers on unmount
//   useEffect(() => {
//     return () => {
//       if (userMarkerRef.current) {
//         userMarkerRef.current.map = null;
//       }
//       if (destinationMarkerRef.current) {
//         destinationMarkerRef.current.map = null;
//       }
//     };
//   }, []);

//   if (loadError) return <div>Error loading maps</div>;
//   if (!isLoaded) return <div>Loading Maps...</div>;

//   return (
//     <div>
//       {/* <button onClick={getUserLocation} style={{ marginBottom: "10px" }}>
//         Get My Location
//       </button> */}
//       <GoogleMap
//         mapContainerStyle={mapContainerStyle}
//         zoom={12}
//         center={center}
//         onClick={handleMapClick}
//         onLoad={(map) => (mapRef.current = map)}
//       >
//         {directions && <DirectionsRenderer directions={directions} />}
//       </GoogleMap>
//       {directions && (
//         <div style={{ marginTop: "10px" }}>
//           <h3>Route Information</h3>
//           <p>Distance: {directions.routes[0].legs[0].distance.text}</p>
//           <p>Duration: {directions.routes[0].legs[0].duration.text}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Map;
