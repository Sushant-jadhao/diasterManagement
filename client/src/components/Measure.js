// src/components/Measures.js
import React from "react";
import "./Measures.css";

const Measures = () => {
  return (
    <div className="measures-container">
      <h1 className="measures-title">Disaster Response Measures</h1>
      <div className="measures-content">
        <div className="measure-category">
          <h2>Earthquakes</h2>
          <p>
            Earthquakes can cause significant damage to buildings and
            infrastructure. It is crucial to follow these measures to ensure
            safety and effective response:
          </p>
          <ul>
            <li>
              Drop, Cover, and Hold On: During an earthquake, drop to your
              knees, cover your head and neck, and hold on until the shaking
              stops.
            </li>
            <li>
              Secure Heavy Items: Ensure that heavy items and furniture are
              secured to walls to prevent them from falling.
            </li>
            <li>
              Prepare an Emergency Kit: Include essentials like water,
              non-perishable food, a flashlight, batteries, and a first-aid kit.
            </li>
            <li>
              Check for Injuries: After the shaking stops, check yourself and
              others for injuries and provide first aid as needed.
            </li>
            <li>
              Inspect Your Home: Look for structural damage and gas leaks. If
              there is significant damage, evacuate the building and seek
              shelter elsewhere.
            </li>
          </ul>
        </div>
        <div className="measure-category">
          <h2>Floods</h2>
          <p>
            Floods can lead to extensive property damage and pose health risks.
            Follow these measures to stay safe during a flood:
          </p>
          <ul>
            <li>
              Move to Higher Ground: If you are in a flood-prone area, move to
              higher ground immediately to avoid rising water.
            </li>
            <li>
              Avoid Flooded Areas: Do not walk, swim, or drive through
              floodwaters as they may be deeper or more dangerous than they
              appear.
            </li>
            <li>
              Prepare an Emergency Kit: Include items such as water, food, a
              battery-powered radio, a flashlight, and important documents.
            </li>
            <li>
              Stay Informed: Keep up to date with weather reports and flood
              warnings from local authorities.
            </li>
            <li>
              Follow Evacuation Orders: If local authorities issue an evacuation
              order, follow it promptly to ensure your safety.
            </li>
          </ul>
        </div>
        <div className="measure-category">
          <h2>Landslides</h2>
          <p>
            Landslides can occur due to heavy rainfall or seismic activity. To
            minimize the impact of landslides, consider the following measures:
          </p>
          <ul>
            <li>
              Recognize Warning Signs: Be aware of signs such as tilting trees,
              crumbling soil, or unusual sounds that may indicate a landslide.
            </li>
            <li>
              Evacuate Immediately: If you suspect a landslide is imminent,
              evacuate the area quickly to avoid being caught in the slide.
            </li>
            <li>
              Stay Away from Slopes: Avoid walking or driving near slopes,
              hillsides, or unstable terrain during heavy rainfall.
            </li>
            <li>
              Install Early Warning Systems: In areas prone to landslides,
              consider installing early warning systems to detect potential
              slides.
            </li>
            <li>
              Support and Reinforce Structures: Ensure that buildings and
              infrastructure are reinforced to withstand landslides and soil
              erosion.
            </li>
          </ul>
        </div>
        <div className="measure-category">
          <h2>Drought</h2>
          <p>
            Droughts can lead to water shortages and affect agriculture. To
            manage and mitigate the effects of drought, follow these measures:
          </p>
          <ul>
            <li>
              Conserve Water: Implement water-saving practices such as reducing
              water use, fixing leaks, and using drought-resistant plants in
              landscaping.
            </li>
            <li>
              Monitor Water Supply: Keep track of water levels and supply to
              anticipate and address potential shortages.
            </li>
            <li>
              Implement Water Restrictions: Follow any water restrictions or
              guidelines set by local authorities to manage water resources
              effectively.
            </li>
            <li>
              Prepare for Future Droughts: Develop and implement long-term water
              management plans and strategies to address future drought
              conditions.
            </li>
            <li>
              Support Agricultural Practices: Use water-efficient agricultural
              practices and technologies to reduce the impact of drought on
              crops and livestock.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Measures;
