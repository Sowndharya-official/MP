import React from "react";

const Preview = () => {
  const project = JSON.parse(
    sessionStorage.getItem("generatedProject") || "{}"
  );

  const files = project.files || {};

  const html = files["index.html"] || "";

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <iframe
        title="Generated Website Preview"
        srcDoc={html}
        style={{
          width: "100%",
          height: "100%",
          border: "none",
        }}
      />
    </div>
  );
};

export default Preview;