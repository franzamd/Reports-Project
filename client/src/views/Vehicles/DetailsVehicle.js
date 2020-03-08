import React from "react";
import {
  Col,
  Card,
  CardImg,
  CardTitle,
  Button,
  CardBody,
  Row,
  Container
} from "reactstrap";
import classnames from "classnames";
import moment from "moment";
import "moment/locale/es";

import img1 from "../../assets/images/sites/vehicle.png";

import withParamsState from "../../HOC/withParamsState";

moment.locale("es");

const DetailsVehicle = props => {
  const {
    transport,
    color,
    number,
    brand,
    volume,
    state,
    createdAt
  } = props.location.state.vehicle;

  return (
    <Container>
      <Card>
        <Row className="d-flex justify-content-center">
          <Col lg={4} className="align-self-center">
            <CardImg
              src={img1}
              className="rounded mx-auto d-block"
              style={{
                maxWidth: "300px",
                maxHeight: "400px"
              }}
            />
          </Col>
          <Col lg={6}>
            <CardBody>
              <CardTitle className="text-center">
                Información del Vehiculo
              </CardTitle>
              <div className="d-flex col">
                <label className="mr-3">Medio de transporte:</label>
                <p className="d-inline">{transport}</p>
              </div>
              <div className="d-flex col">
                <label className="mr-3">Color:</label>
                <p className="d-inline">{color}</p>
              </div>
              <div className="d-flex col">
                <label className="mr-3">Número de placa:</label>
                <p className="d-inline">{number}</p>
              </div>
              <div className="d-flex col">
                <label className="mr-3">Marca:</label>
                <p className="d-inline">{brand}</p>
              </div>
              <div className="d-flex col">
                <label className="mr-3">Volumen (Carga Total):</label>
                <p className="d-inline">{volume}</p>
              </div>
              <div className="d-flex col">
                <label className="mr-3">Estado:</label>
                <p
                  className={classnames("d-inline", {
                    "text-success": state,
                    "text-danger": !state
                  })}
                >
                  {state ? "Activo" : "Inactivo"}
                </p>
              </div>
              <div className="d-flex col font-weight-bold">
                <label className="mr-3">Ultimo Registro:</label>
                <p className="d-inline">
                  {moment(createdAt).format("DD MMMM YYYY, h:mm:ss a")}
                </p>
              </div>
              <div className="d-flex justify-content-center my-2">
                <Button
                  color="primary"
                  onClick={() =>
                    props.history.push({
                      pathname: "/admin/vehicles"
                    })
                  }
                >
                  Atras
                </Button>
              </div>
            </CardBody>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default withParamsState(DetailsVehicle);
