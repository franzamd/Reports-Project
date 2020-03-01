import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./styles.css";

// reactstrap components
import { Button, FormGroup, Col, Form } from "reactstrap";

import AuthContext from "../../context/auth/authContext";

function Login(props) {
  window.scrollTo(0, 0);

  const authContext = useContext(AuthContext);

  const { error, isAuthenticated, clearErrors, login } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");

      clearInputs();
    }
  }, [error, isAuthenticated]);

  // Remove functions
  useEffect(() => () => clearErrors(), []);

  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const { email, password } = user;

  const handleInput = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = e => {
    e.preventDefault();

    login(user);
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
            Aplicación Reportes YPFB
            <br />
          </h2>
          <br />
          <p>Inicie sesión o regístrese desde aquí para acceder.</p>
        </div>
      </div>
      <div className="main">
        <Col md={6} sm={12} className="m-3">
          <div className="login-form">
            <Form onSubmit={onSubmit}>
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
              {error && (
                <div className="text-muted font-italic">
                  <small className="text-danger">{error}</small>
                </div>
              )}
              <div className="my-3 d-flex justify-content-around">
                <Button type="submit" color="primary">
                  Login
                </Button>
                <Link
                  to={{ pathname: "register" }}
                  className="btn btn-secondary"
                >
                  Registro
                </Link>
              </div>
            </Form>
          </div>
        </Col>
      </div>
    </div>
  );
}

export default Login;
