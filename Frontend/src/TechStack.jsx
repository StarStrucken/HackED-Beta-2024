import "./TechStack.css";
import { FaPython, FaReact } from "react-icons/fa";
import {
  SiChartdotjs,
  SiNumpy,
  SiTensorflow,
  SiSelenium,
  SiFlask,
} from "react-icons/si";
import { FaGitAlt } from "react-icons/fa6";

export default function TechStack() {
  return (
    <div id="tech-stack" className="tech-stack-container">
      <h2 className="tech-stack">Tech Stack</h2>
      <div className="icons-grid">
        <div className="icon-wrapper">
          <FaPython title="Python" color="white"/>
        </div>
        <div className="icon-wrapper">
          <FaReact title="React" color="white"/>
        </div>
        <div className="icon-wrapper">
          <SiChartdotjs title="Chart.js" color="white"/>
        </div>
        <div className="icon-wrapper">
          <SiNumpy title="NumPy" color="white"/>
        </div>
        <div className="icon-wrapper">
          <SiTensorflow title="TensorFlow" color="white"/>
        </div>
        <div className="icon-wrapper">
          <SiSelenium title="Selenium" color="white"/>
        </div>
        <div className="icon-wrapper">
          <SiFlask title="Flask" color="white"/>
        </div>
        <div className="icon-wrapper">
          <FaGitAlt title="Git" color="white"/>
        </div>
      </div>
    </div>
  );
}
