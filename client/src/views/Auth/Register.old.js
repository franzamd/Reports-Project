import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./styles.css";

// reactstrap components
import { Button, FormGroup, Col, Form } from "reactstrap";

import AuthContext from "../../context/auth/authContext";

function Register(props) {
  window.scrollTo(0, 0);

  const authContext = useContext(AuthContext);

  const { error, isAuthenticated, clearErrors, register } = authContext;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
      clearInputs();
    }
  }, [error, isAuthenticated]);

  // Remove functions
  useEffect(() => () => clearErrors(), []);

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    password2: ""
  });

  const { username, email, password, password2 } = user;

  const handleInput = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = e => {
    e.preventDefault();

    const formData = {
      username: user.username,
      email: user.email,
      password: user.password,
      password2: user.password2
    };

    register(formData);
  };

  const clearInputs = () => {
    setUser({
      email: "",
      password: ""
    });
  };

  return (
    <div>
      <div className="sidenav">
        <div className="login-main-text">
          <h2>
            Registrarse
            <br />
          </h2>
          <br />
          <p>Ingrese los siguientes campos para completar el registro</p>
        </div>
      </div>
      <div className="main">
        <Col md={6} sm={12} className="my-2">
          <div className="login-form">
            <Form onSubmit={onSubmit}>
              <FormGroup>
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  placeholder="Ej. jdoe"
                  value={username}
                  onChange={handleInput}
                />
              </FormGroup>
              {error && error.username && (
                <div className="text-muted font-italic">
                  <small className="text-danger">{error.username}</small>
                </div>
              )}
              <FormGroup>
                <label>Email</label>
                <input
                  type="text"
                  name="email"
                  className="form-control"
                  placeholder="Ej. jdoe@gmail.com"
                  value={email}
                  onChange={handleInput}
                />
              </FormGroup>
              {error && error.email && (
                <div className="text-muted font-italic">
                  <small className="text-danger">{error.email}</small>
                </div>
              )}
              <FormGroup>
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={handleInput}
                />
              </FormGroup>
              {error && error.password && (
                <div className="text-muted font-italic">
                  <small className="text-danger">{error.password}</small>
                </div>
              )}
              <FormGroup>
                <label>Repetir Contraseña</label>
                <input
                  type="password"
                  name="password2"
                  className="form-control"
                  placeholder="Repetir Password"
                  value={password2}
                  onChange={handleInput}
                />
              </FormGroup>
              {error && typeof error === "string" && (
                <div className="text-muted font-italic text-center">
                  <small className="text-danger">Error: {error}</small>
                </div>
              )}
              <div className="my-4 d-flex justify-content-around">
                <Button type="submit" color="primary">
                  Registrarse
                </Button>
                <Link to={{ pathname: "login" }} className="btn btn-secondary">
                  Regresar a login
                </Link>
              </div>
            </Form>
            <br></br>
          </div>
        </Col>
      </div>
    </div>
  );
}

export default Register;
