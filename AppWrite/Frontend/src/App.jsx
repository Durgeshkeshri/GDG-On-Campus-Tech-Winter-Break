import React, { useRef, useState } from "react";
import { Client, Databases, ID } from "appwrite";

const App = () => {
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);

  const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1") // Replace with your Appwrite endpoint
    .setProject(""); // Replace with your Appwrite project ID

  const databases = new Databases(client);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const data = {
        name: nameRef.current.value,
        email: emailRef.current.value,
        message: messageRef.current.value || "",
      };

      await databases.createDocument(
        "", // Replace with your database ID
        "", // Replace with your collection ID
        ID.unique(),
        data
      );

      setSuccessMessage("Form submitted successfully!");
      nameRef.current.value = "";
      emailRef.current.value = "";
      messageRef.current.value = "";
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setSubmitting(false);
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Simple Form</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: "400px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <input
          type="text"
          placeholder="Name"
          ref={nameRef}
          required
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
        <input
          type="email"
          placeholder="Email"
          ref={emailRef}
          required
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
        <textarea
          placeholder="Message"
          ref={messageRef}
          rows="5"
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
        <button
          type="submit"
          disabled={submitting}
          style={{
            padding: "10px",
            border: "none",
            backgroundColor: "#007BFF",
            color: "white",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {submitting ? "Submitting..." : "Submit"}
        </button>
      </form>
      {successMessage && (
        <p
          style={{
            marginTop: "10px",
            color: "green",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {successMessage}
        </p>
      )}
    </div>
  );
};

export default App;
