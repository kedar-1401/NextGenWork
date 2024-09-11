import React from "react";
import "./../../Css/Tools.css";

const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="accordion-item">
      <button className="accordion-button" onClick={toggleAccordion}>
        {title}
      </button>
      {isOpen && <div className="accordion-content">{children}</div>}
    </div>
  );
};

const SubAccordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleSubAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="sub-accordion-item">
      <button className="sub-accordion-button" onClick={toggleSubAccordion}>
        {title}
      </button>
      {isOpen && <div className="sub-accordion-content">{children}</div>}
    </div>
  );
};

const QuestionnaireAccordion = () => {
  return (
    <Accordion title="Questionnaire">
      <SubAccordion title="What is NextGenWork?">
        <p>
          NextGenWork is a vibrant community dedicated to empowering individuals in
          the technology industry. We provide resources, support, and networking
          opportunities to help people advance their careers in tech.
        </p>
      </SubAccordion>
      <SubAccordion title="Who can join NextGenWork?">
        <p>
          NextGenWork welcomes individuals from all backgrounds who are involved or
          interested in the technology industry.
        </p>
      </SubAccordion>
      <SubAccordion title="What resources does NextGenWork offer?">
        <p>
          We offer access to events, workshops, job opportunities, mentorship
          programs, and networking sessions for professionals in tech.
        </p>
      </SubAccordion>
      <SubAccordion title="How can I get involved in NextGenWork?">
        <p>
          You can join our community by participating in events, contributing
          your expertise, sharing your experiences, or becoming a mentor.
        </p>
      </SubAccordion>
      <SubAccordion title="How does NextGenWork promote diversity?">
        <p>
          We collaborate with companies committed to diversity, share job
          openings from inclusive organizations, and highlight success stories
          of professionals in tech.
        </p>
      </SubAccordion>
      <SubAccordion title="Where can I find more information about NextGenWork?">
        <p>
          Visit our website or follow us on social media to stay updated on
          events, news, and initiatives.
        </p>
      </SubAccordion>
    </Accordion>
  );
};


const Tools = () => {
  const spreadsheetUrl = process.env.PUBLIC_URL + "/opportunity.xlsx";

  const handleExploreClick = () => {
    window.open('https://theglobalscholarship.org/internships', '_blank');
  };
  
  return (
    <div className="Inclusive-addStory-page">
      <h1>Welcome to NextGenWork</h1>
      <img src="women.jpg" alt="NextGenWork Community" />
      <p>
      NextGenWork is a vibrant community dedicated to empowering individuals in the technology industry, with a focus on fostering inclusivity and equal opportunity. We provide valuable resources, career advancement support, and networking opportunities for everyone. Our community shares information about industry events, job openings, and initiatives aimed at creating an equitable environment for all professionals. Whether you're looking to grow your skills, network with peers, or champion diversity, NextGenWork is here to help you succeed.
      </p>

      <h2>Our Mission</h2>
      <p>
      Our mission is to create a supportive space where everyone in the technology industry can thrive. We aim to:
      </p>
      <ul>
        <li>
        Provide access to events and workshops tailored to advancing careers in tech
        </li>
        <li>Share job opportunities at companies committed to diversity and inclusion</li>
        <li>Facilitate mentorship and networking opportunities for all professionals</li>
        <li>Promote success stories of individuals in tech, inspiring the next generation of leaders</li>
      </ul>

      <h2>Upcoming Events</h2>
      <img src="events.jpg" alt="Empowering Women" />
      <p>
        Stay tuned for our upcoming events, including workshops, hackathons, and
        networking sessions. These events are designed to help you build your
        skills, connect with industry leaders, and advance your career.
      </p>

      <h2>Join Us</h2>
      <img src="hackathon.jpg" alt="Tech Events" />
      <p>
        Become a part of NextGenWork and take advantage of the resources and
        support we offer. Whether you are a student, a professional, or an
        organization, there is a place for you in our community.
      </p>

      <QuestionnaireAccordion />

      <button className="addStory-btn" onClick={handleExploreClick}>
        Explore More Opportunities
      </button>
    </div>
  );
};

export default Tools;
