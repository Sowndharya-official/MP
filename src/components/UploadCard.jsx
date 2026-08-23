import React from "react";

const UploadCard = ({
  file,
  setFile,
  uploadFile,
  uploading,
}) => {
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    if (!selectedFile.name.toLowerCase().endsWith(".zip")) {
      alert("Please select a ZIP file only.");
      e.target.value = "";
      return;
    }

    setFile(selectedFile);
  };

  return (
    <div
      style={{
        border: "2px dashed #4f8cff",
        padding: "30px",
        borderRadius: "15px",
        textAlign: "center",
        background: "#ffffff",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      <h2>📂 Upload Repository</h2>

      <p>Select your React / Node.js project ZIP file</p>

      <input
        type="file"
        accept=".zip"
        onChange={handleFileChange}
        disabled={uploading}
      />

      <br />
      <br />

      {file && (
        <div
          style={{
            padding: "15px",
            background: "#f5f5f5",
            borderRadius: "10px",
            marginBottom: "20px",
          }}
        >
          <h4>📦 {file.name}</h4>

          <p>
            Size: {(file.size / (1024 * 1024)).toFixed(2)} MB
          </p>

          <button
            onClick={() => setFile(null)}
            disabled={uploading}
            style={{
              background: "#dc3545",
              color: "#fff",
              border: "none",
              padding: "8px 15px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Remove File
          </button>
        </div>
      )}

      <button
        onClick={uploadFile}
        disabled={!file || uploading}
        style={{
          background: uploading ? "#999" : "#007bff",
          color: "#fff",
          border: "none",
          padding: "12px 25px",
          borderRadius: "8px",
          cursor: uploading ? "not-allowed" : "pointer",
          fontSize: "16px",
        }}
      >
        {uploading ? "Uploading..." : "Upload Project"}
      </button>
    </div>
  );
};

export default UploadCard;