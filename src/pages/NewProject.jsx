import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NewProject.css";

const NewProject = () => {
  const navigate = useNavigate();

  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [files, setFiles] = useState(null);

  const handleGenerate = async (e) => {
    e.preventDefault();

    console.log("PROMPT VALUE:", prompt);

      if (!prompt.trim()) {
        setError("Please describe the website you want to create.");
        return;
      }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "/api/ai/generate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: prompt.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to generate website."
        );
      }

      setFiles(data.files);

      sessionStorage.setItem(
        "generatedProject",
        JSON.stringify(data)
      );

    } catch (err) {
      console.error(err);

      setError(
        err.message || "Unable to generate website."
      );
    } finally {
      setLoading(false);
    }
  };

  const previewDocument = files
    ? `
      <!DOCTYPE html>
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>${files["style.css"] || ""}</style>
        </head>
        <body>
          ${files["index.html"] || ""}
          <script>
            ${files["script.js"] || ""}
          <\/script>
        </body>
      </html>
    `
    : "";

  const handleSecurityCheck = () => {
    navigate("/security-report");
  };

  return (
    <div className="builder-page">

      <header className="builder-header">
        <div>
          <h1>AI Website Builder</h1>

          <p>
            Describe your idea and Gemini will build it for you.
          </p>
        </div>
      </header>

      <main className="builder-workspace">

        {/* LEFT SIDE */}

        <section className="prompt-panel">

          <div className="panel-title">

            <span>✨</span>

            <div>
              <h2>Create your website</h2>

              <p>
                Tell AI what you want to build.
              </p>
            </div>

          </div>

          <form onSubmit={handleGenerate}>

  <label htmlFor="prompt">
    Website description
  </label>

  <textarea
    id="prompt"
    value={prompt}
    onChange={(e) => setPrompt(e.target.value)}
    placeholder="Example: Create a modern portfolio website for a computer science student with a hero section, skills, projects and contact form..."
    disabled={loading}
  />

  {error && (
    <div className="builder-error">
      {error}
    </div>
  )}

  <button
    type="submit"
    disabled={loading}
    className="generate-button"
  >
    {loading
      ? "✨ Generating..."
      : "✨ Generate Website"}
  </button>

</form>

          {/* GENERATED WEBSITE STATUS */}

          {files && (
            <div className="files-status">

              <div className="success-icon">
                ✓
              </div>

              <div>
                <strong>
                  Website generated successfully
                </strong>

                <p>
                  Your generated code has been saved in the backend.
                </p>
              </div>

              <button
                type="button"
                onClick={handleSecurityCheck}
              >
                🔐 Check Security
              </button>

            </div>
          )}

        </section>

        {/* RIGHT SIDE */}

        <section className="preview-panel">

          <div className="preview-header">

            <div>
              <span className="preview-dot"></span>

              <strong>
                Live Preview
              </strong>
            </div>

            {files && (
              <span className="preview-status">
                Generated
              </span>
            )}

          </div>

          <div className="preview-container">

            {loading ? (

              <div className="preview-loading">

                <div className="spinner"></div>

                <h3>
                  Building your website...
                </h3>

                <p>
                  Gemini is generating your HTML, CSS and JavaScript.
                </p>

              </div>

            ) : files ? (

              <iframe
                title="Generated Website Preview"
                srcDoc={previewDocument}
                className="website-preview"
              />

            ) : (

              <div className="preview-empty">

                <div className="preview-icon">
                  🖥️
                </div>

                <h3>
                  Your preview will appear here
                </h3>

                <p>
                  Enter a description on the left and generate your
                  website.
                </p>

              </div>

            )}

          </div>

        </section>

      </main>

    </div>
  );
};

export default NewProject;