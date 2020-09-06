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

import img from "../../assets/images/img5.png";

import withParamsState from "../../HOC/withParamsState";

moment.locale("es");

const DetailsBusiness = props => {
  const {
    name,
    nit,
    address,
    phone,
    state,
    createdAt
  } = props.location.state.business;

  return (
    <Container>
      <Card>
        <Row className="d-flex justify-content-center">
          <Col lg={4} className="align-self-center">
            <CardImg
              src={img}
              className="rounded mx-auto d-block"
              style={{
                maxWidth: "300px",
                maxHeight: "400px"
              }}
            />
          </Col>
          <Col lg={8}>
            <CardBody>
              <CardTitle className="text-center">
                Información de la Empresa
              </CardTitle>
              <div className="d-flex col">
                <label className="mr-3 font-weight-bold">Nombres:</label>
                <p className="d-inline">{name}</p>
              </div>
              <div className="d-flex col">
                <label className="mr-3 font-weight-bold">NIT:</label>
                <p className="d-inline">{nit}</p>
              </div>
              <div className="d-flex col">
                <label className="mr-3 font-weight-bold">Teléfono:</label>
                <p className="d-inline">{phone}</p>
              </div>
              <div className="d-flex col">
                <label className="mr-3 font-weight-bold">Dirección:</label>
                <p className="d-inline">{address}</p>
              </div>
              <div className="d-flex col">
                <label className="mr-3 font-weight-bold">Estado:</label>
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
                      pathname: "/admin/business"
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

export default withParamsState(DetailsBusiness);
