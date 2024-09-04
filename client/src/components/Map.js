// import React from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css";

// function DisasterMap({ news }) {
//   return (
//     <MapContainer
//       center={[20.5937, 78.9629]}
//       zoom={5}
//       style={{ height: "500px", width: "100%" }}
//     >
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//       />
//       {news.map((item, index) => (
//         <Marker key={index} position={[item.lat, item.lng]}>
//           <Popup>
//             {item.title}
//             <br />
//             {item.location}
//           </Popup>
//         </Marker>
//       ))}
//     </MapContainer>
//   );
// }

// export default DisasterMap;
