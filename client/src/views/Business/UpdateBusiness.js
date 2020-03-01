import React, { useState, useEffect, useContext } from "react";
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

import BusinessContext from "../../context/business/businessContext";

const UpdateBusiness = props => {
  // Business Id
  const { _id } = props.location.state;

  const businessContext = useContext(BusinessContext);
  const { error, loading, updateBusiness, getBusinessById } = businessContext;

  const [business, setBusiness] = useState({
    name: "",
    address: "",
    phone: "",
    description: "",
    state: "",
    createdAt: ""
  });

  useEffect(() => {
    getBusinessById(_id);
  }, []);

  useEffect(() => {
    if (
      !loading &&
      businessContext.businessSelected &&
      businessContext.businessSelected.data
    ) {
      setBusiness({
        name: businessContext.businessSelected.data.name,
        address: businessContext.businessSelected.data.address,
        phone: businessContext.businessSelected.data.phone,
        description: businessContext.businessSelected.data.description,
        state: businessContext.businessSelected.data.state,
        createdAt: businessContext.businessSelected.data.createdAt
      });
    }
  }, [loading]);

  const handleInput = e => {
    if (e.target.name === "state") {
      return setBusiness({
        ...business,
        [e.target.name]: e.target.value === "true" ? true : false
      });
    }

    setBusiness({
      ...business,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = async e => {
    e.preventDefault();

    const formData = {
      name: business.name,
      address: business.address,
      phone: business.phone,
      description: business.description,
      state: business.state
    };

    await updateBusiness(_id, formData, props.history);
  };

  const errorName = error && error.name ? error.name : null;
  const errorPhone = error && error.phone ? error.phone : null;
  const errorDescription =
    error && error.description ? error.description : null;
  const errorAddress = error && error.address ? error.address : null;
  const errorGlobal = typeof error === "string" ? error : null;

  // Options Select
  const optionsState = [
    { _id: "1", label: "* Seleccione una opción", value: 0 },
    { _id: "2", label: "Activo", value: true },
    { _id: "3", label: "Inactivo", value: false }
  ];

  return (
    <Container>
      <Col xl="8">
        <Card>
          <Form onSubmit={onSubmit}>
            <CardHeader className="bg-white border-0">
              <Row>
                <Col xs="8">
                  <h3 className="mb-0">Actualizar Empresa</h3>
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
                    placeholder="Ej. John"
                    name="name"
                    value={business.name}
                    error={errorName}
                    onChange={handleInput}
                  />
                </Col>
                <Col lg="6">
                  <SelectListGroup
                    label="Estado"
                    name="state"
                    onChange={handleInput}
                    options={optionsState}
                    value={business.state}
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
                  <DateFieldGroup
                    label="Fecha de Registro"
                    name="date"
                    value={business.createdAt}
                  />
                </Col>
              </Row>
              <Row>
                <Col lg="12">
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

export default withParamsState(UpdateBusiness);
