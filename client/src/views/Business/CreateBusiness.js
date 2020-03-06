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

import InputGroup from "../../components/common/InputGroup";
import ConfirmButton from "../../components/common/ConfirmButton";

import BusinessContext from "../../context/business/businessContext";

const CreateBusiness = props => {
  const businessContext = useContext(BusinessContext);
  const { error, loading, createBusiness } = businessContext;

  const [business, setBusiness] = useState({
    name: "",
    nit: "",
    address: "",
    phone: "",
    description: ""
  });

  const handleInput = e => {
    setBusiness({
      ...business,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = async e => {
    e.preventDefault();

    const formData = {
      name: business.name,
      nit: business.nit,
      address: business.address,
      phone: business.phone,
      description: business.description
    };

    await createBusiness(formData, props.history);
  };

  const errorName = error && error.name ? error.name : null;
  const errorNIT = error && error.nit ? error.nit : null;
  const errorAddress = error && error.address ? error.address : null;
  const errorPhone = error && error.phone ? error.phone : null;
  const errorDescription =
    error && error.description ? error.description : null;
  const errorGlobal = typeof error === "string" ? error : null;

  return (
    <Container>
      <Col xl="8">
        <Card>
          <Form onSubmit={onSubmit}>
            <CardHeader className="bg-white border-0">
              <Row>
                <Col xs="8">
                  <h3 className="mb-0">Crear Nueva Empresa</h3>
                </Col>
                <Col
                  className="d-flex justify-content-end flex-wrap align-items-baseline"
                  xs="4"
                >
                  <ConfirmButton onClick={onSubmit} loading={loading} />
                  <Button
                    onClick={() =>
                      props.history.push({
                        pathname: "/admin/business"
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
                    label="Nombres *"
                    placeholder="Ej. EMTRECUR SRL"
                    name="name"
                    value={business.name}
                    error={errorName}
                    onChange={handleInput}
                  />
                </Col>
                <Col lg="6">
                  <InputGroup
                    label="NIT *"
                    placeholder="Ej. 301004158172"
                    name="nit"
                    value={business.nit}
                    error={errorNIT}
                    onChange={handleInput}
                  />
                </Col>
              </Row>
              <Row>
                <Col lg="6">
                  <InputGroup
                    label="Dirección *"
                    placeholder="Ej. Av. Las Americas Nº1214"
                    name="address"
                    value={business.address}
                    error={errorAddress}
                    onChange={handleInput}
                  />
                </Col>
                <Col lg="6">
                  <InputGroup
                    label="Teléfono o Celular *"
                    placeholder="Ej. +59172415325"
                    name="phone"
                    value={business.phone}
                    error={errorPhone}
                    onChange={handleInput}
                  />
                </Col>
              </Row>
              <hr className="my-4" />
              <h6 className="heading-small text-muted mb-4">
                Información Adicional
              </h6>
              <div className="pl-lg-4">
                <InputGroup
                  label="Descripción"
                  placeholder="Algún comentario ..."
                  name="description"
                  rows="4"
                  type="textarea"
                  value={business.description}
                  error={errorDescription}
                  onChange={handleInput}
                />
              </div>
            </CardBody>
          </Form>
        </Card>
      </Col>
    </Container>
  );
};

export default CreateBusiness;
