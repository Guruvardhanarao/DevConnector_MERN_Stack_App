import React, { Component } from "react";
import classnames from "classnames";
import { connect } from "react-redux";
import { signupUser } from "../../thunks/signupUser";
import { clearError } from "../../reducers/errorReducer";
import withNavigate from "../withNavigate";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      error: {},
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

    this.props.signupUser(newUser).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        this.props.navigate("/login");
      }
    });
  }

  render() {
    const { error } = this.props;

    return (
      <div className="container d-flex justify-content-center align-items-center mt-5">
        <div className="card h-auto w-50">
          <div className="card-body">
            <h2 className="card-title text-center">Sign up</h2>
            <h6 className="card-subtitle mb-2 text-muted text-center">
              Create your DevConnector account
            </h6>

            <form noValidate onSubmit={this.handleSubmit}>
              <div className="row mb-3 mt-5">
                <div className="col-md-12">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": error.name,
                    })}
                    placeholder="Name"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleChange}
                  />
                  {error.name && (
                    <div className="invalid-feedback">{error.name}</div>
                  )}
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-12">
                  <input
                    type="email"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": error.email,
                    })}
                    placeholder="Email ID"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                  {error.email && (
                    <div className="invalid-feedback">{error.email}</div>
                  )}
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-12">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": error.password,
                    })}
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                  {error.password && (
                    <div className="invalid-feedback">{error.password}</div>
                  )}
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-12">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": error.password2,
                    })}
                    placeholder="Confirm Password"
                    name="password2"
                    value={this.state.password2}
                    onChange={this.handleChange}
                  />
                  {error.password2 && (
                    <div className="invalid-feedback">{error.password2}</div>
                  )}
                </div>
              </div>

              <div className="d-grid">
                <button
                  type="submit"
                  className="btn btn-lg btn-primary btn-block"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
});

const mapDispatchToProps = {
  signupUser,
  clearError,
};

export default withNavigate(
  connect(mapStateToProps, mapDispatchToProps)(Register)
);
