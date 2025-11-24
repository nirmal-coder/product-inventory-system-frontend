import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <h1 style={{ fontSize: "80px", margin: "0", color: "#ff4757" }}>404</h1>
      <h2 style={{ fontSize: "28px", marginTop: "10px" }}>Page Not Found</h2>
      <p style={{ maxWidth: "400px", marginTop: "10px", opacity: 0.7 }}>
        The page you're looking for doesn't exist or has been removed.
      </p>

      <Link
        to="/"
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          background: "#1e90ff",
          color: "#fff",
          textDecoration: "none",
          borderRadius: "6px",
        }}
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
