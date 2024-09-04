import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css"; // Optional, for custom styling

const Dashboard = () => {
  const [news, setNews] = useState([]);
  const [dataReady, setDataReady] = useState(false);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/api/disaster-news")
      .then((response) => {
        console.log("API Response:", response.data); // Debugging
        setNews(response.data);
        setDataReady(true);
      })
      .catch((error) => {
        console.error("Error fetching disaster news:", error);
      });
  }, []);

  return (
    <div className="disaster-news-container">
      <h2>Disaster News</h2>
      <div className="card-container">
        {dataReady ? (
          news.map((item, index) => (
            <div className="card" key={index}>
              <h3>{item.type.charAt(0).toUpperCase() + item.type.slice(1)}</h3>
              <p>
                <strong>Location:</strong>{" "}
                {item.location !== "Unknown"
                  ? item.location
                  : "Location not specified"}
              </p>
              <p>
                <strong>People Involved:</strong>{" "}
                {item.people_involved !== "Unknown"
                  ? item.people_involved
                  : "Not specified"}
              </p>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
