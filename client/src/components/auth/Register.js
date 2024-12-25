import React, { Component } from "react";
import axios from "axios";
import classnames from "classnames";
import { connect } from "react-redux";
import { useSelector, useDispatch } from "react-redux";

import { autenticate, register } from "../../reducers/authReducer";

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

    this.props.register(newUser);
    console.log(this.props.auth.user);
    // axios
    //   .post("/api/users/register", newUser)
    //   .then((res) => {
    //     console.log(res.data);
    //   })
    //   .catch((err) => {
    //     this.setState({ errors: err.response.data });
    //     console.log(err);
    //   });
  }

  render() {
    const { errors } = this.state;

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
                      "is-invalid": errors.name,
                    })}
                    placeholder="Name"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleChange}
                  />
                  {errors.name && (
                    <div className="invalid-feedback">{errors.name}</div>
                  )}
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-12">
                  <input
                    type="email"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.email,
                    })}
                    placeholder="Email ID"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-12">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.password,
                    })}
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-12">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.password2,
                    })}
                    placeholder="Confirm Password"
                    name="password2"
                    value={this.state.password2}
                    onChange={this.handleChange}
                  />
                  {errors.password2 && (
                    <div className="invalid-feedback">{errors.password2}</div>
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
});

const mapDispatchToProps = {
  autenticate,
  register,
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
