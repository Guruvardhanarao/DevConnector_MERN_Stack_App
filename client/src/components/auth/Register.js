import React, { Component } from "react";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    };

    console.log(newUser);
  }

  render() {
    return (
      <div className="container d-flex justify-content-center align-items-center mt-5">
        <div className="card h-auto w-50 text-center">
          <div className="card-body">
            <h2 className="card-title">Register</h2>
            <h6 className="card-subtitle mb-2 text-muted">
              Create your DevConnector account
            </h6>

            <form onSubmit={this.handleSubmit}>
              <div className="row mb-3 mt-5">
                <div className="col-md-12">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Name"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="row mb-3">
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
              <div className="row mb-3">
                <div className="col-md-12">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Confirm Password"
                    name="password2"
                    value={this.state.password2}
                    onChange={this.handleChange}
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default Register;
