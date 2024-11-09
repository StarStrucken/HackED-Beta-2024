import "./TechStack.css"

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
}

export default function TechStack() {
    return (
        <>
            <header id="tech-stack">Tech Stack</header>
            <p>This project was built using the following technologies:</p>
            <ul
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    gap: "10px",
                }}
            >
                <li>React</li>
                <li>React Bootstrap</li>
                <li>Chart.js</li>
                <li>Python</li>
                <li>Flask</li>
                <li>TensorFlow</li>
                <li>yahooFinance</li>
                <li>Selenium</li>
            </ul>
        </>
    )
}