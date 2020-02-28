import React, { useEffect, useState, useContext } from "react";
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

import VehicleContext from "../../context/vehicle/vehicleContext";

const UpdateVehicle = props => {
  // Vehicle Id
  const { _id } = props.location.state;

  const vehicleContext = useContext(VehicleContext);
  const { error, loading, getVehicle, updateVehicle } = vehicleContext;

  const [vehicle, setVehicle] = useState({
    transport: "",
    color: "",
    number: "",
    brand: "",
    volume: "",
    state: "",
    createdAt: ""
  });

  useEffect(() => {
    getVehicle(_id);
  }, []);

  useEffect(() => {
    if (!loading && vehicleContext.vehicle && vehicleContext.vehicle.data) {
      setVehicle({
        transport: vehicleContext.vehicle.data.transport,
        color: vehicleContext.vehicle.data.color,
        number: vehicleContext.vehicle.data.number,
        brand: vehicleContext.vehicle.data.brand,
        volume: vehicleContext.vehicle.data.volume,
        state: vehicleContext.vehicle.data.state,
        createdAt: vehicleContext.vehicle.data.createdAt
      });
    }
  }, [loading]);

  const handleInput = e => {
    if (e.target.name === "state") {
      return setVehicle({
        ...vehicle,
        [e.target.name]: e.target.value === "true" ? true : false
      });
    }

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
      volume: vehicle.volume,
      state: vehicle.state
    };

    await updateVehicle(_id, formData, props.history);
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
                  <h3 className="mb-0">Actualizar Vehiculo</h3>
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
                <Col lg="6">
                  <InputGroup
                    label="Volumen *"
                    placeholder="Ej. 20000"
                    name="volume"
                    value={vehicle.volume}
                    error={errorVolume}
                    onChange={handleInput}
                  />
                </Col>
                <Col lg="6">
                  <SelectListGroup
                    label="Estado"
                    name="state"
                    onChange={handleInput}
                    options={optionsState}
                    value={vehicle.state}
                  />
                </Col>
              </Row>
              <Row>
                <Col lg="6">
                  <DateFieldGroup
                    label="Fecha de Registro"
                    name="date"
                    value={vehicle.createdAt}
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

export default withParamsState(UpdateVehicle);
