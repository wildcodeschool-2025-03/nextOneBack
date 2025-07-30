import { useEffect } from "react";
import "../styles/Error404Page.css";

export default function Error404Page() {
  useEffect(() => {
    const timeout = setTimeout(() => {
      window.location.href = "/accueil";
    }, 3000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="error404-container">
      <div className="loader-container">
        <div className="loader">
          <p className="loader-text">Redirection....</p>
        </div>
      </div>
    </div>
  );
}
