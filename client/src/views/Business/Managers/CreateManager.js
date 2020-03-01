import React, { useState, useContext } from "react";
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

import BusinessContext from "../../../context/business/businessContext";

import InputGroup from "../../../components/common/InputGroup";
import ConfirmButton from "../../../components/common/ConfirmButton";
import withParamsState from "../../../HOC/withParamsState";

const CreateManager = props => {
  // Business id
  const { _id } = props.location.state;

  const businessContext = useContext(BusinessContext);
  const { error, loading, createManager } = businessContext;

  const [manager, setBusiness] = useState({
    name: "",
    lastname: "",
    ci: "",
    role: ""
  });

  const handleInput = e => {
    setBusiness({
      ...manager,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = async e => {
    e.preventDefault();

    const formData = {
      name: manager.name,
      lastname: manager.lastname,
      ci: manager.ci,
      role: manager.role
    };

    await createManager(_id, formData, props.history);
  };

  const onBack = () => {
    props.history.push({
      pathname: "/admin/business/managers",
      state: { _id }
    });
  };

  const errorName = error && error.name ? error.name : null;
  const errorLastName = error && error.lastname ? error.lastname : null;
  const errorCI = error && error.ci ? error.ci : null;
  const errorRole = error && error.role ? error.role : null;
  const errorGlobal = typeof error === "string" ? error : null;

  return (
    <Container>
      <Col xl="8">
        <Card>
          <Form onSubmit={onSubmit}>
            <CardHeader className="bg-white border-0">
              <Row>
                <Col xs="8">
                  <h3 className="mb-0">Crear Nuevo Encargado</h3>
                </Col>
                <Col
                  className="d-flex justify-content-end flex-wrap align-items-baseline"
                  xs="4"
                >
                  <ConfirmButton onClick={onSubmit} loading={loading} />
                  <Button onClick={onBack} size="sm" className="m-1">
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
                    label="Nombres *"
                    placeholder="Ej. Orlando Raul"
                    name="name"
                    value={manager.name}
                    error={errorName}
                    onChange={handleInput}
                  />
                </Col>
                <Col lg="6">
                  <InputGroup
                    label="Apellidos *"
                    placeholder="Ej. Reyes Cardozo"
                    name="lastname"
                    value={manager.lastname}
                    error={errorLastName}
                    onChange={handleInput}
                  />
                </Col>
              </Row>
              <Row>
                <Col lg="6">
                  <InputGroup
                    label="C.I. *"
                    placeholder="Ej. 6727194"
                    name="ci"
                    value={manager.ci}
                    error={errorCI}
                    onChange={handleInput}
                  />
                </Col>
                <Col lg="6">
                  <InputGroup
                    label="Rol *"
                    placeholder="Ej. Representante Legal"
                    name="role"
                    value={manager.role}
                    error={errorRole}
                    onChange={handleInput}
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

export default withParamsState(CreateManager);
