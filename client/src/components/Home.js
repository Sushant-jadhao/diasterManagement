import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <div className="image-container">
        <img
          src="/path/to/your/image.png"
          alt="Disaster Management Logo"
          className="logo-image"
        />
      </div>
      <div className="content-container">
        <h1 className="title">
          Real-Time Disaster Information Aggregation Software
        </h1>
        <div className="details">
          <p>
            <strong>Description:</strong>
          </p>
          <p className="description-text">
            Disaster response agencies often struggle to gather timely and
            specific information about emergencies from various sources. Social
            media platforms serve as a valuable repository of such data, but
            manually monitoring and sorting through the vast amount of
            information is inefficient and resource-intensive. This software
            solution will efficiently aggregate and categorize disaster-related
            data from social media, news portals, and other open sources.
            Utilizing advanced algorithms, the software will classify
            information into different categories, presenting it on a
            user-friendly dashboard, allowing agencies to quickly access
            relevant information and plan their actions accordingly.
          </p>
          <p>
            <strong>Organization:</strong> Ministry of Home Affairs, The
            National Disaster Response Force (NDRF)
          </p>
          <p>
            <strong>Department:</strong> National Disaster Response Force (NDRF)
          </p>
          <p>
            <strong>Category:</strong> Software
          </p>
          <p>
            <strong>Theme:</strong> Disaster Management
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
