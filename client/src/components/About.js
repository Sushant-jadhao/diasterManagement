// src/components/About.js
import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-container">
      <h1 className="about-title">About the Project</h1>
      <div className="about-content">
        <p className="about-description">
          <strong>Real-Time Disaster Information Aggregation Software</strong>
        </p>
        <p>
          <strong>Background:</strong> In the face of emergencies and disasters,
          timely and accurate information is crucial for effective response and
          recovery. However, disaster response agencies often find it
          challenging to collect and process information from a myriad of
          sources. The vast amounts of data available on social media platforms,
          news portals, and other open sources are overwhelming and can be
          difficult to manage manually.
        </p>
        <p>
          <strong>Objective:</strong> This project aims to address these
          challenges by developing a sophisticated software solution that
          aggregates and categorizes disaster-related data from various sources.
          The software leverages advanced algorithms to sift through the
          abundant information, classifying it into actionable categories. This
          real-time aggregation and categorization will be displayed on a
          user-friendly dashboard, providing disaster response agencies with
          quick access to relevant and timely information.
        </p>
        <p>
          <strong>Features:</strong>
        </p>
        <ul>
          <li>
            Aggregation of data from social media, news portals, and other
            sources.
          </li>
          <li>
            Advanced algorithms for classifying disaster-related information.
          </li>
          <li>Real-time insights and actionable information.</li>
          <li>User-friendly dashboard for quick data access and planning.</li>
        </ul>
        <p>
          <strong>Expected Impact:</strong> By streamlining the process of
          gathering and categorizing disaster-related data, the software
          significantly reduces the time required for response efforts. It
          enhances the effectiveness of disaster response operations by
          providing real-time insights and actionable information, ultimately
          aiming to save lives and improve the overall response to disasters.
        </p>
        <p>
          <strong>Collaborators:</strong> The project is developed in
          collaboration with the Ministry of Home Affairs and the National
          Disaster Response Force (NDRF). It is part of a broader effort to
          advance disaster management and response capabilities.
        </p>
      </div>
    </div>
  );
};

export default About;
