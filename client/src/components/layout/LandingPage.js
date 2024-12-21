import React from "react";

function LandingPage() {
  return (
    <div className="landing">
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="card" style={{ width: "40rem" }}>
          <div className="card-body">
            <h2 className="card-title text-center">Developer Connector</h2>
            <p className="card-text my-4">
              Create a developer profile/portifolio, share posts and get help
              from other developers
            </p>
            <div className="text-center">
              <a href="#" className="card-link btn btn-primary">
                Signup
              </a>
              <a href="#" className="card-link btn btn-light">
                Login
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
