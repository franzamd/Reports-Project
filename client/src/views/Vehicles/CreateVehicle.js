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
import SelectListGroup from "../../components/common/SelectListGroup";

import VehicleContext from "../../context/vehicle/vehicleContext";

const CreateVehicle = props => {
  const vehicleContext = useContext(VehicleContext);
  const { error, loading, createVehicle } = vehicleContext;

  const [vehicle, setVehicle] = useState({
    transport: "",
    color: "",
    number: "",
    brand: "",
    volume: ""
  });

  const handleInput = e => {
    setVehicle({
      ...vehicle,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = async e => {
    e.preventDefault();

    const formData = {
      transport: vehicle.transport,
      color: vehicle.color,
      number: vehicle.number,
      brand: vehicle.brand,
      volume: vehicle.volume
    };

    await createVehicle(formData, props.history);
  };

  const errorTransport = error && error.transport ? error.transport : null;
  const errorColor = error && error.color ? error.color : null;
  const errorNumber = error && error.number ? error.number : null;
  const errorBrand = error && error.brand ? error.brand : null;
  const errorVolume = error && error.volume ? error.volume : null;

  const errorGlobal = typeof error === "string" ? error : null;

  // Options Select
  const optionsTransport = [
    { _id: "1", label: "* Seleccione una opción", value: 0 },
    { _id: "2", label: "Camion", value: "Camion" },
    { _id: "3", label: "Cisterna", value: "Cisterna" },
    { _id: "4", label: "Tren", value: "Tren" },
    { _id: "5", label: "Avion", value: "Avion" },
    { _id: "6", label: "Barcaza", value: "Barcaza" },
    { _id: "7", label: "Otro", value: "Otro" }
  ];

  return (
    <Container>
      <Col xl="8">
        <Card>
          <Form onSubmit={onSubmit}>
            <CardHeader className="bg-white border-0">
              <Row>
                <Col xs="8">
                  <h3 className="mb-0">Crear Nuevo Vehiculo</h3>
                </Col>
                <Col
                  className="d-flex justify-content-end flex-wrap align-items-baseline"
                  xs="4"
                >
                  <ConfirmButton onClick={onSubmit} loading={loading} />
                  <Button
                    onClick={() => props.history.goBack()}
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
                  <SelectListGroup
                    label="Transporte *"
                    name="transport"
                    onChange={handleInput}
                    options={optionsTransport}
                    value={vehicle.transport}
                    error={errorTransport}
                  />
                </Col>
                <Col lg="6">
                  <InputGroup
                    label="Color *"
                    placeholder="Ej. Blanco"
                    name="color"
                    value={vehicle.color}
                    error={errorColor}
                    onChange={handleInput}
                  />
                </Col>
              </Row>
              <Row>
                <Col lg="6">
                  <InputGroup
                    label="Placa *"
                    placeholder="Ej. TJA-1415"
                    name="number"
                    value={vehicle.number}
                    error={errorNumber}
                    onChange={handleInput}
                  />
                </Col>
                <Col lg="6">
                  <InputGroup
                    label="Marca"
                    placeholder="Ej. Volvo"
                    name="brand"
                    value={vehicle.brand}
                    error={errorBrand}
                    onChange={handleInput}
                  />
                </Col>
              </Row>
              <Row>
                <Col lg="12">
                  <InputGroup
                    label="Volumen *"
                    placeholder="Ej. 20000"
                    name="volume"
                    value={vehicle.volume}
                    error={errorVolume}
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

export default CreateVehicle;
