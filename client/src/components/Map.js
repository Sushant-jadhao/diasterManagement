// src/components/Map.js
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";

// Custom icon for disaster locations
const disasterIcon = new L.Icon({
  iconUrl: "image.png", // Replace with URL to your red dot icon
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://example.com/marker-shadow.png", // Optional: Replace with URL to your marker shadow image
  shadowSize: [41, 41],
});

const Map = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    // Fetch disaster locations from the API using axios
    axios
      .get("http://127.0.0.1:5000/api/disaster-locations")
      .then((response) => {
        setLocations(response.data);
      })
      .catch((error) => {
        console.error("Error fetching locations:", error);
      });
  }, []);

  return (
    <MapContainer
      center={[16.66667, 81.0]} // Center the map on the initial location
      zoom={6}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {locations.map((location, index) => (
        <Marker
          key={index}
          position={[location.latitude, location.longitude]}
          icon={disasterIcon}
        >
          <Popup>
            <strong>Location:</strong> {location.location} <br />
            <strong>Type:</strong> {location.type}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
