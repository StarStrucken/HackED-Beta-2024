// Team component

import "./Team.css";
import {
  SiTensorflow,
  SiPandas,
  SiSelenium,
  SiChartdotjs,
  SiFlask,
  SiScikitlearn,
} from "react-icons/si";
import { FaPython, FaReact, FaYahoo } from "react-icons/fa";

// Function to scroll to a section
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
}

export default function Team() {
  return (
    <div className="team">
      <header id="team" className="team-header">
        Team Members
      </header>
      <div className="team-list">
        <p className="team-list-members">
          Ishaan Ratanshi - Frontend + Backend + Testing{" "}
          <FaPython color="white" size={25} />{" "}
          <FaReact color="white" size={25} />{" "}
          <SiFlask color="white" size={25} />{" "}
          <SiChartdotjs color="white" size={25} />{" "}
          <SiSelenium color="white" size={25} />
        </p>
        <p className="team-list-members">
          Samippya Pokharel - Frontend + Backend{" "}
          <FaPython color="white" size={25} />{" "}
          <FaReact color="white" size={25} />{" "}
          <SiFlask color="white" size={25} />{" "}
          <SiChartdotjs color="white" size={25} />
        </p>
        <p className="team-list-members">
          Kulgagan Bajwa - Machine Learning <FaPython color="white" size={25} />{" "}
          <SiTensorflow color="white" size={25} />{" "}
          <SiScikitlearn color="white" size={25} />{" "}
          <FaYahoo color="white" size={25} />{" "}
          <SiPandas color="white" size={25} />
        </p>
      </div>

      <button className="team-button" onClick={() => scrollToSection("top")}>
        Back to Top
      </button>
    </div>
  );
}
