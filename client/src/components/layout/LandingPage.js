import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="landing-page h-100">
      <div className="overlay"></div>
      <div className="content d-flex justify-content-center align-items-center h-100">
        <div className="card p-3" style={{ width: "40rem" }}>
          <div className="card-body">
            <h2 className="card-title text-center">Developer Connector</h2>
            <p className="card-text my-4">
              Create a developer profile/portifolio, share posts and get help
              from other developers
            </p>
            <div className="text-center">
              <Link to="/register" className="card-link btn btn-primary">
                Signup
              </Link>
              <Link to="/login" className="card-link btn btn-light">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
