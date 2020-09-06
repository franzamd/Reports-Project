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

import ChauffeurContext from "../../context/chauffeur/chauffeurContext";

const CreateChauffeur = props => {
  const chauffeurContext = useContext(ChauffeurContext);
  const { error, loading, createChauffeur, resetChauffeurs } = chauffeurContext;

  const [chauffeur, setChauffeur] = useState({
    name: "",
    lastname: "",
    ci: "",
    issued: "",
    address: "",
    license: ""
  });

  useEffect(
    () => () => {
      resetChauffeurs();
    },
    []
  );

  const handleInput = e => {
    setChauffeur({
      ...chauffeur,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = async e => {
    e.preventDefault();

    const formData = {
      name: chauffeur.name,
      lastname: chauffeur.lastname,
      ci: chauffeur.ci,
      issued: chauffeur.issued,
      address: chauffeur.address,
      license: chauffeur.license
    };

    await createChauffeur(formData, props.history);
  };

  const errorName = error && error.name ? error.name : null;
  const errorLastName = error && error.lastname ? error.lastname : null;
  const errorCI = error && error.ci ? error.ci : null;
  const errorIssued = error && error.issued ? error.issued : null;
  const errorAddress = error && error.address ? error.address : null;
  const errorLicense = error && error.license ? error.license : null;

  const errorGlobal = typeof error === "string" ? error : null;

  // Options Select
  const optionsIssuedes = [
    { _id: "1", label: "* Seleccione una opción", value: 0 },
    { _id: "2", label: "Chuquisaca", value: "CH" },
    { _id: "3", label: "La Paz", value: "LP" },
    { _id: "4", label: "Cochabamba", value: "CB" },
    { _id: "5", label: "Oruro", value: "OR" },
    { _id: "6", label: "Potosi", value: "PO" },
    { _id: "7", label: "Tarija", value: "TJ" },
    { _id: "8", label: "Santa Cruz", value: "SC" },
    { _id: "9", label: "Beni", value: "BE" },
    { _id: "10", label: "Pando", value: "PA" }
  ];

  return (
    <Container className="d-flex justify-content-center">
      <Col xl="8">
        <Card>
          <Form onSubmit={onSubmit}>
            <CardHeader className="bg-white border-0">
              <Row>
                <Col xs="8">
                  <h3 className="mb-0">Crear Nuevo Chofer</h3>
                </Col>
                <Col
                  className="d-flex justify-content-end flex-wrap align-items-baseline"
                  xs="4"
                >
                  <ConfirmButton onClick={onSubmit} loading={loading} />
                  <Button
                    onClick={e =>
                      props.history.push({
                        pathname: "/admin/chauffeurs"
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
                    value={chauffeur.name}
                    error={errorName}
                    onChange={handleInput}
                  />
                </Col>
                <Col lg="6">
                  <InputGroup
                    label="Apellidos *"
                    placeholder="Ej. Doe"
                    name="lastname"
                    value={chauffeur.lastname}
                    error={errorLastName}
                    onChange={handleInput}
                  />
                </Col>
              </Row>
              <Row>
                <Col lg="6">
                  <InputGroup
                    label="C.I. *"
                    placeholder="Ej. 4141688"
                    name="ci"
                    value={chauffeur.ci}
                    error={errorCI}
                    onChange={handleInput}
                  />
                </Col>
                <Col lg="6">
                  <SelectListGroup
                    label="Expedido *"
                    name="issued"
                    onChange={handleInput}
                    options={optionsIssuedes}
                    value={chauffeur.issued}
                    error={errorIssued}
                  />
                </Col>
              </Row>
              <Row>
                <Col lg="6">
                  <InputGroup
                    label="Licencia/Brevet *"
                    placeholder="Ej. 4141688"
                    name="license"
                    value={chauffeur.license}
                    error={errorLicense}
                    onChange={handleInput}
                  />
                </Col>
                <Col lg="6">
                  <InputGroup
                    label="Dirección *"
                    placeholder="Ej. Av Las Americas N°2415"
                    name="address"
                    value={chauffeur.address}
                    error={errorAddress}
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

export default CreateChauffeur;
