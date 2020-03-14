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

import withParamsState from "../../HOC/withParamsState";

import InputGroup from "../../components/common/InputGroup";
import ConfirmButton from "../../components/common/ConfirmButton";
import SelectListGroup from "../../components/common/SelectListGroup";
import DateFieldGroup from "../../components/common/DateFieldGroup";

import img1 from "../../assets/images/users/0.png";
import UserContext from "../../context/user/userContext";

const UpdateUser = props => {
  // user Id
  const { _id } = props.location.state;

  const userContext = useContext(UserContext);
  const { error, loading, updateUser, getUser, resetUsers } = userContext;

  const [user, setUser] = useState({
    username: "",
    email: "",
    role: "",
    state: "",
    createdAt: ""
  });

  useEffect(() => {
    getUser(_id);
  }, []);

  useEffect(() => {
    if (!loading && userContext.user && userContext.user.data) {
      setUser({
        ...user,
        username: userContext.user.data.username,
        email: userContext.user.data.email,
        role: userContext.user.data.role,
        state: userContext.user.data.state,
        createdAt: userContext.user.data.createdAt
      });
    }
  }, [loading]);

  useEffect(() => () => resetUsers(), []);

  const handleInput = e => {
    if (e.target.name === "state") {
      return setUser({
        ...user,
        [e.target.name]: e.target.value === "true" ? true : false
      });
    }

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
      role: user.role,
      state: user.state
    };

    await updateUser(_id, formData, props.history);
  };

  const errorUsername = error && error.username ? error.username : null;
  const errorEmail = error && error.email ? error.email : null;
  const errorRole = error && error.role ? error.role : null;
  const errorGlobal = typeof error === "string" ? error : null;

  // Options Select
  const optionsRole = [
    { _id: "1", label: "* Seleccione una opción", value: 0 },
    { _id: "2", label: "Usuario", value: "usuario" },
    { _id: "3", label: "Administrador", value: "administrador" }
  ];

  const optionsState = [
    { _id: "1", label: "* Seleccione una opción", value: 0 },
    { _id: "2", label: "Activo", value: true },
    { _id: "3", label: "Inactivo", value: false }
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
                  <h3 className="mb-0">Actualizar Usuario</h3>
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
              <Row>
                <Col lg="6">
                  <SelectListGroup
                    label="Estado"
                    name="state"
                    onChange={handleInput}
                    options={optionsState}
                    value={user.state}
                  />
                </Col>
                <Col lg="6">
                  <DateFieldGroup
                    label="Fecha de Registro"
                    name="date"
                    value={user.createdAt}
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

export default withParamsState(UpdateUser);
