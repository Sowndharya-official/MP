import React from "react";

const ProgressBar = ({ progress }) => {
  return (
    <div style={{ marginTop: "20px" }}>
      <div
        style={{
          width: "100%",
          height: "10px",
          background: "#ddd",
          borderRadius: "10px",
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            background: "#4CAF50",
            borderRadius: "10px",
            transition: "0.3s",
          }}
        />
      </div>

      <p>{progress}% Uploaded</p>
    </div>
  );
};

export default ProgressBar;