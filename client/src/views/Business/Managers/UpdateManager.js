import React, { useState, useContext } from "react";
import {
  Container,
  Col,
  Card,
  CardHeader,
  CardBody,
  Row,
  Button,
  Form,
} from "reactstrap";

import withParamsState from "../../../HOC/withParamsState";
import InputGroup from "../../../components/common/InputGroup";
import ConfirmButton from "../../../components/common/ConfirmButton";
import SelectListGroup from "../../../components/common/SelectListGroup";
import DateFieldGroup from "../../../components/common/DateFieldGroup";

import BusinessContext from "../../../context/business/businessContext";

const UpdateManager = (props) => {
  // Business Id
  const { _id } = props.location.state;
  const managerSelected = props.location.state.manager;

  const businessContext = useContext(BusinessContext);
  const { error, loading, updateManager } = businessContext;

  const [manager, setManager] = useState({
    name: managerSelected.name,
    lastname: managerSelected.lastname,
    ci: managerSelected.ci,
    role: managerSelected.role,
    descrption: managerSelected.descrption,
    state: managerSelected.state,
    createdAt: managerSelected.createdAt,
  });

  const handleInput = (e) => {
    if (e.target.name === "state") {
      return setManager({
        ...manager,
        [e.target.name]: e.target.value === "true" ? true : false,
      });
    }

    setManager({
      ...manager,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name: manager.name,
      lastname: manager.lastname,
      ci: manager.ci,
      role: manager.role,
      state: manager.state,
    };

    await updateManager(_id, managerSelected._id, formData, props.history);
  };

  const onBack = () => {
    props.history.push({
      pathname: "/admin/business/managers",
      state: { _id },
    });
  };

  const errorName = error && error.name ? error.name : null;
  const errorLastName = error && error.lastname ? error.lastname : null;
  const errorCI = error && error.ci ? error.ci : null;
  const errorRole = error && error.role ? error.role : null;
  const errorGlobal = typeof error === "string" ? error : null;

  // Options Select
  const optionsState = [
    { _id: "1", label: "* Seleccione una opción", value: 0 },
    { _id: "2", label: "Activo", value: true },
    { _id: "3", label: "Inactivo", value: false },
  ];

  return (
    <Container className="d-flex justify-content-center">
      <Col xl="8">
        <Card>
          <Form onSubmit={onSubmit}>
            <CardHeader className="bg-white border-0">
              <Row>
                <Col xs="8">
                  <h3 className="mb-0">Actualizar Encargado</h3>
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
              <Row>
                <Col lg="6">
                  <SelectListGroup
                    label="Estado *"
                    name="state"
                    onChange={handleInput}
                    options={optionsState}
                    value={manager.state}
                  />
                </Col>
                <Col lg="6">
                  <DateFieldGroup
                    label="Fecha de Registro"
                    name="date"
                    value={manager.createdAt}
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

export default withParamsState(UpdateManager);
