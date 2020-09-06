import React from "react";
import {
  Col,
  Card,
  CardImg,
  CardTitle,
  Button,
  CardBody,
  Row,
  Container,
} from "reactstrap";
import classnames from "classnames";
import moment from "moment";
import "moment/locale/es";

import img1 from "../../assets/images/sites/chauffeur.png";

import withParamsState from "../../HOC/withParamsState";

moment.locale("es");

const DetailsChauffeur = (props) => {
  const {
    name,
    lastname,
    ci,
    issued,
    license,
    address,
    state,
    user,
    createdAt,
  } = props.location.state.chauffeur;

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
                maxHeight: "400px",
              }}
            />
          </Col>
          <Col lg={8}>
            <CardBody>
              <CardTitle className="text-center">
                Información del Chofer
              </CardTitle>
              <div className="d-flex col">
                <label className="mr-3 font-weight-bold">Nombres:</label>
                <p className="d-inline">{name}</p>
              </div>
              <div className="d-flex col">
                <label className="mr-3 font-weight-bold">Apellidos:</label>
                <p className="d-inline">{lastname}</p>
              </div>
              <div className="d-flex col">
                <label className="mr-3 font-weight-bold">C.I.:</label>
                <p className="d-inline">{ci}</p>
              </div>
              <div className="d-flex col">
                <label className="mr-3 font-weight-bold">Expedido:</label>
                <p className="d-inline">{issued}</p>
              </div>
              <div className="d-flex col">
                <label className="mr-3 font-weight-bold">
                  Licencia/Brevet:
                </label>
                <p className="d-inline">{license}</p>
              </div>
              <div className="d-flex col">
                <label className="mr-3 font-weight-bold">Estado:</label>
                <p
                  className={classnames("d-inline", {
                    "text-success": state,
                    "text-danger": !state,
                  })}
                >
                  {state ? "Activo" : "Inactivo"}
                </p>
              </div>
              <div className="d-flex col">
                <label className="mr-3 font-weight-bold">Dirección:</label>
                <p className="d-inline">{address}</p>
              </div>
              <div className="d-flex col font-weight-bold">
                <label className="mr-3">Ultimo Registro:</label>
                <p className="d-inline">
                  {moment(createdAt).format("DD MMMM YYYY, h:mm:ss a")}
                </p>
              </div>
              <div className="d-flex col">
                <label className="mr-3 font-weight-bold">Registrado por:</label>
                <p className="d-inline">{user.username}</p>
              </div>
              <div className="d-flex justify-content-center my-2">
                <Button
                  color="primary"
                  onClick={() =>
                    props.history.push({
                      pathname: "/admin/chauffeurs",
                    })
                  }
                >
                  Atrás
                </Button>
              </div>
            </CardBody>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default withParamsState(DetailsChauffeur);
