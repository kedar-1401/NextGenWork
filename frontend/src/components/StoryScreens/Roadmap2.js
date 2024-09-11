import React, { useState, useContext } from "react";
import axios from "axios";
import Modal from "./Modal";
import "../../Css/Roadmap2.css";
import { AuthContext } from "../../Context/AuthContext";

const Roadmap = () => {
const { config } = useContext(AuthContext);

  const [prompt, setPrompt] = useState(""); // To store the student's input (domain)
  const [roadmap, setRoadmap] = useState(""); // To store the generated roadmap
  const [loading, setLoading] = useState(false); // Loading state for the API call
  const [error, setError] = useState(""); // Error handling
  const [showModal, setShowModal] = useState(false); // Modal for showing the personalized roadmap

  // Function to handle prompt submission
  const handleGenerateRoadmap = async () => {
    if (!prompt) {
      setError("Please enter a domain.");
      return;
    }
    setError("");
    setLoading(true);

    const formdata = new FormData()
    formdata.append("prompt", prompt)
       
    try {
      // Call your backend API to generate a personalized roadmap
    //   const response = await axios.post("/roadmap/generateRoadmap", {
    //     prompt,
    //   });

      const { roadmap } = await axios.post("/roadmap/generateRoadmap", prompt, config);
      setRoadmap(roadmap);
      setShowModal(true); // Show modal with roadmap
    } catch (err) {
      console.error("Error generating roadmap:", err);
      setError("Failed to generate roadmap. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Roadmap-page">
      <div className="Roadmap-left">
        <img src="roadmap.jpg" alt="Roadmap illustration" />
      </div>
      <div className="Roadmap-right">
        <h1 className="Roadmap-header">Personalized Roadmap Generator</h1>
        <h2 className="Roadmap-description">
          Enter your learning domain to get a personalized roadmap powered by AI.
        </h2>

        <div className="Roadmap-input">
          <input
            type="text"
            placeholder="Enter your domain (e.g., Web Development, Data Science)"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="Roadmap-prompt-input"
          />
        </div>

        {error && <p className="Roadmap-error">{error}</p>}

        <div className="Roadmap-buttons">
          <button onClick={handleGenerateRoadmap} disabled={loading}>
            {loading ? "Generating..." : "Get Personalized Roadmap"}
          </button>
        </div>

        <Modal show={showModal} onClose={() => setShowModal(false)}>
          {roadmap ? (
            <div className="Modal-content">
              <h3>Your Personalized Roadmap</h3>
              <p>{roadmap}</p>
            </div>
          ) : (
            <p>No roadmap available</p>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default Roadmap;
