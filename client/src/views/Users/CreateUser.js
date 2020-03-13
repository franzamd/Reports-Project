import React, { useState, useContext, useEffect } from "react";
import {
  Container,
  Col,
  Card,
  CardHeader,
  CardBody,
  Row,
  Button,
  Form
} from "reactstrap";

import InputGroup from "../../components/common/InputGroup";
import ConfirmButton from "../../components/common/ConfirmButton";
import SelectListGroup from "../../components/common/SelectListGroup";

import img1 from "../../assets/images/users/0.png";

import UserContext from "../../context/user/userContext";

const CreateUser = props => {
  const userContext = useContext(UserContext);
  const { error, loading, createUser, resetUsers } = userContext;

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
    role: ""
  });

  useEffect(() => () => resetUsers(), []);

  const handleInput = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = async e => {
    e.preventDefault();

    const formData = {
      username: user.username,
      email: user.email,
      password: user.password,
      password2: user.password2,
      role: user.role
    };

    await createUser(formData, props.history);
  };

  const errorUsername = error && error.username ? error.username : null;
  const errorEmail = error && error.email ? error.email : null;
  const errorPassword = error && error.password ? error.password : null;
  const errorRole = error && error.role ? error.role : null;
  const errorGlobal = typeof error === "string" ? error : null;

  // Options Select
  const optionsRole = [
    { _id: "1", label: "* Seleccione una opción", value: 0 },
    { _id: "2", label: "Usuario", value: "usuario" },
    { _id: "3", label: "Administrador", value: "administrador" }
  ];

  return (
    <Container className="d-flex justify-content-center">
      <Col className="order-xl-2 mb-5 mb-xl-0" xl="4" lg={4}>
        <Card className="card-profile shadow">
          <Row className="justify-content-center">
            <Col className="order-lg-2 m-4" lg="3">
              <div className="card-profile-image d-flex justify-content-center ">
                <img
                  style={{
                    width: "200px",
                    height: "200px"
                  }}
                  alt={user.username}
                  className="rounded-circle"
                  src={img1}
                />
              </div>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col>
        <Card>
          <Form onSubmit={onSubmit}>
            <CardHeader className="bg-white border-0">
              <Row>
                <Col xs="8">
                  <h3 className="mb-0">Crear Nuevo Usuario del Acceso</h3>
                </Col>
                <Col
                  className="d-flex justify-content-end flex-wrap align-items-baseline"
                  xs="4"
                >
                  <ConfirmButton onClick={onSubmit} loading={loading} />
                  <Button
                    onClick={e =>
                      props.history.push({
                        pathname: "/admin/users"
                      })
                    }
                    size="sm"
                    className="m-1"
                  >
                    Cancelar
                  </Button>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <div className="mb-3 font-italic">
                <small>Los campos con * son obligatorios</small>
              </div>
              {errorGlobal && (
                <div className="text-danger text-center mb-3 font-italic">
                  <small>{errorGlobal}</small>
                </div>
              )}
              <Row>
                <Col lg="6">
                  <InputGroup
                    label="Username *"
                    placeholder="Ej. william"
                    name="username"
                    value={user.username}
                    error={errorUsername}
                    onChange={handleInput}
                  />
                </Col>
                <Col lg="6">
                  <InputGroup
                    label="Email *"
                    placeholder="Ej. willjhonson@gmail.com"
                    name="email"
                    value={user.email}
                    error={errorEmail}
                    onChange={handleInput}
                  />
                </Col>
              </Row>
              <Row>
                <Col lg="6">
                  <InputGroup
                    label="Password *"
                    placeholder=""
                    name="password"
                    type="password"
                    value={user.password}
                    error={errorPassword}
                    onChange={handleInput}
                  />
                </Col>
                <Col lg="6">
                  <InputGroup
                    label="Repetir Password *"
                    placeholder=""
                    name="password2"
                    type="password"
                    value={user.password2}
                    onChange={handleInput}
                  />
                </Col>
              </Row>
              <Row>
                <Col lg="12">
                  <SelectListGroup
                    label="Rol *"
                    name="role"
                    onChange={handleInput}
                    options={optionsRole}
                    value={user.role}
                    error={errorRole}
                  />
                </Col>
              </Row>
            </CardBody>
          </Form>
        </Card>
      </Col>
    </Container>
  );
};

export default CreateUser;
