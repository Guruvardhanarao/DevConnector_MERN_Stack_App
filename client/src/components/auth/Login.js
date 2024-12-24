import React, { Component } from "react";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password,
    };

    console.log(user);
  }

  render() {
    return (
      <div className="container d-flex justify-content-center align-items-center mt-5">
        <div className="card h-auto w-50 text-center">
          <div className="card-body">
            <h2 className="card-title">Login</h2>
            <h6 className="card-subtitle mb-2 text-muted">
              Login to your DevConnector account
            </h6>

            <form onSubmit={this.handleSubmit}>
              <div className="row mb-3 mt-5">
                <div className="col-md-12">
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Email ID"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-12">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;
