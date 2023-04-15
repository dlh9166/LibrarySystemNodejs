import React from "react";

const ErrorFallback = ({ error }) => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Oops! Something went wrong.</h2>
      <p>{error && error.toString()}</p>
      <button onClick={() => window.location.reload()}>Reload Page</button>
    </div>
  );
};

export default ErrorFallback;