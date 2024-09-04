import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import "./Dashboard.css"; // Optional, for custom styling

const DisasterNews = () => {
  const [news, setNews] = useState([]);
  const [dataReady, setDataReady] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/disaster-news")
      .then((response) => response.json())
      .then((data) => {
        setNews(data);
        setDataReady(true);
      })
      .catch((error) => console.error("Error fetching disaster news:", error));
  }, []);

  useEffect(() => {
    if (dataReady) {
      // Prepare data for D3 visualization
      const disasterTypes = {};
      news.forEach((item) => {
        const type = item.title.toLowerCase(); // Use title or any other field to categorize
        if (disasterTypes[type]) {
          disasterTypes[type]++;
        } else {
          disasterTypes[type] = 1;
        }
      });

      // Convert object to array of {type, count}
      const data = Object.keys(disasterTypes).map((key) => ({
        type: key,
        count: disasterTypes[key],
      }));

      // Set up D3 visualization
      const width = 800;
      const height = 400;
      const margin = { top: 20, right: 30, bottom: 40, left: 40 };

      const svg = d3
        .select("#disaster-chart")
        .attr("width", width)
        .attr("height", height);

      const x = d3
        .scaleBand()
        .domain(data.map((d) => d.type))
        .range([margin.left, width - margin.right])
        .padding(0.1);

      const y = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.count)])
        .nice()
        .range([height - margin.bottom, margin.top]);

      svg
        .selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", (d) => x(d.type))
        .attr("y", (d) => y(d.count))
        .attr("height", (d) => y(0) - y(d.count))
        .attr("width", x.bandwidth())
        .attr("fill", "steelblue");

      svg
        .append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x));

      svg
        .append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y));
    }
  }, [dataReady, news]);

  return (
    <div className="disaster-news-container">
      <h2>Disaster News</h2>
      <div id="disaster-chart"></div>
    </div>
  );
};

export default DisasterNews;
