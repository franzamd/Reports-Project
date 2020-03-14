import React, { useContext, useEffect, useState } from "react";
import jsreport from "jsreport-browser-client-dist";
import {
  Col,
  Card,
  Button,
  CardBody,
  Row,
  CardHeader,
  Table
} from "reactstrap";
import classnames from "classnames";
import moment from "moment";
import "moment/locale/es";

import RoadmapContext from "../../context/roadmap/roadmapContext";

import ConfirmButton from "../../components/common/ConfirmButton";

import withParamsState from "../../HOC/withParamsState";

moment.locale("es");

const DetailsRoadmap = props => {
  // Roadmap Id
  const { _id } = props.location.state;

  const roadmapContext = useContext(RoadmapContext);
  const { getRoadmap, loading, resetRoadmaps } = roadmapContext;

  const [roadmap, setRoadmap] = useState({
    products: [
      {
        substance: "",
        types: {
          primary: "",
          product: "",
          percentage: ""
        },
        amount: "",
        unit: "",
        container: {
          type: "",
          amount: ""
        },
        name: ""
      }
    ],
    chauffeur: "",
    vehicle: "",
    business: "",
    manager: "",
    authorization: "",
    finish: "",
    begin: "",
    validity: "",
    itinerary: {
      destination: {
        municipality: "",
        province: "",
        departament: "",
        address: ""
      },
      origin: {
        municipality: "",
        province: "",
        departament: "",
        address: ""
      }
    },
    route: "",
    tramit: "",
    city: "",
    state: "",
    createdAt: ""
  });

  useEffect(() => {
    getInitialFunctions();
  }, []);

  const getInitialFunctions = async () => {
    await getRoadmap(_id);
  };

  useEffect(() => {
    if (!loading && roadmapContext.roadmap.data) {
      setRoadmap(roadmapContext.roadmap.data);
    }
  }, [loading]);

  useEffect(
    () => () => {
      resetRoadmaps();
    },
    []
  );

  const getManager = (business, managerId) => {
    return business.managers.find(
      manager => manager._id.toString() === managerId
    );
  };

  const printPDF = () => {
    roadmap.createdAt = moment().format("DD MMMM YYYY, h:mm:ss a");
    roadmap.begin = moment(roadmap.begin).format("L");
    roadmap.finish = moment(roadmap.finish).format("L");

    roadmap.manager = getManager(roadmap.business, roadmap.manager);

    jsreport.serverUrl = "http://localhost:5488";

    let reportRequest = {
      template: { shortid: "rkJTnK2ce" },
      data: roadmap
    };

    jsreport.render(reportRequest);

    return props.history.goBack();
  };

  const getManagerData = id => {
    if (roadmap.business.managers) {
      const manager = roadmap.business.managers.find(item => {
        if (item._id.toString() === id) return item;
        return {};
      });

      return `${manager.lastname} - ${manager.role}`;
    }
  };

  return (
    <Col>
      <Card>
        <CardHeader className="bg-white border-0">
          <Row>
            <Col xs="8">
              <h3 className="mb-0">Información de la Hoja de Ruta</h3>
            </Col>
            <Col
              className="d-flex justify-content-end flex-wrap align-items-baseline"
              xs="4"
            >
              <ConfirmButton
                onClick={printPDF}
                message="Imprimir"
                loading={loading}
              />
              <Button
                onClick={e =>
                  props.history.push({
                    pathname: "/admin/roadmaps"
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
          <Row>
            <div className="d-flex col">
              <label className="mr-3 font-weight-bold">Nº de tramite:</label>
              <p className="d-inline">{roadmap.tramit}</p>
            </div>
            <div className="d-flex col">
              <label className="mr-3 font-weight-bold">
                Ciudad de emision:
              </label>
              <p className="d-inline">{roadmap.city}</p>
            </div>
          </Row>
          <hr className="my-4" />
          <h6 className="heading-small text-muted mb-4">Información Empresa</h6>
          <Row>
            <div className="d-flex col">
              <label className="mr-3 font-weight-bold">Empresa:</label>
              <p className="d-inline">{roadmap.business.name}</p>
            </div>
            <div className="d-flex col">
              <label className="mr-3 font-weight-bold">Registro:</label>
              <p className="d-inline">{roadmap.business.nit}</p>
            </div>
          </Row>
          <Row>
            <div className="d-flex col">
              <label className="mr-3 font-weight-bold">Encargado:</label>
              <p className="d-inline">{getManagerData(roadmap.manager)}</p>
            </div>
          </Row>
          <hr className="my-4" />
          <h6 className="heading-small text-muted mb-4">
            Información Vehiculo
          </h6>
          <Row>
            <div className="d-flex col">
              <label className="mr-3 font-weight-bold">Placa:</label>
              <p className="d-inline">{roadmap.vehicle.number}</p>
            </div>
            <div className="d-flex col">
              <label className="mr-3 font-weight-bold">Marca:</label>
              <p className="d-inline">{roadmap.vehicle.brand}</p>
            </div>
          </Row>
          <Row>
            <div className="d-flex col">
              <label className="mr-3 font-weight-bold">Medio Transporte:</label>
              <p className="d-inline">{roadmap.vehicle.transport}</p>
            </div>
            <div className="d-flex col">
              <label className="mr-3 font-weight-bold">Color:</label>
              <p className="d-inline">{roadmap.vehicle.color}</p>
            </div>
          </Row>
          <hr className="my-4" />
          <h6 className="heading-small text-muted mb-4">Información Chofer</h6>
          <Row>
            <div className="d-flex col">
              <label className="mr-3 font-weight-bold">C.I.:</label>
              <p className="d-inline">{roadmap.chauffeur.ci}</p>
            </div>
            <div className="d-flex col">
              <label className="mr-3 font-weight-bold">Licencia:</label>
              <p className="d-inline">{roadmap.chauffeur.license}</p>
            </div>
          </Row>

          <Row>
            <div className="d-flex col">
              <label className="mr-3 font-weight-bold">Nombres:</label>
              <p className="d-inline">{roadmap.chauffeur.name}</p>
            </div>
            <div className="d-flex col">
              <label className="mr-3 font-weight-bold">Apellidos:</label>
              <p className="d-inline">{roadmap.chauffeur.lastname}</p>
            </div>
          </Row>
          <hr className="my-4" />
          <h6 className="heading-small text-muted mb-4">
            Información Productos
          </h6>
          <Row>
            <Table size="sm" responsive>
              <thead>
                <tr>
                  <th scope="col" className="text-center">
                    Suntancia
                  </th>
                  <th scope="col" className="text-center">
                    Primaria
                  </th>
                  <th scope="col" className="text-center">
                    Producto Terminado
                  </th>
                  <th scope="col" className="text-center">
                    Porcentaje
                  </th>
                  <th scope="col" className="text-center">
                    Cantidad
                  </th>
                  <th scope="col" className="text-center">
                    Unidad Kg/Lt
                  </th>
                  <th scope="col" className="text-center">
                    Tipo
                  </th>
                  <th scope="col" className="text-center">
                    Cantidad
                  </th>
                  <th scope="col" className="text-center">
                    Nombre
                  </th>
                </tr>
              </thead>
              <tbody>
                {roadmap.products.map((item, i) => {
                  return (
                    <tr key={i}>
                      <td className="text-center">{item.substance}</td>
                      <td className="text-center">{item.types.primary}</td>
                      <td className="text-center">{item.types.product}</td>
                      <td className="text-center">{item.types.percentage}</td>
                      <td className="text-center">{item.amount}</td>
                      <td className="text-center">{item.unit}</td>
                      <td className="text-center">{item.container.type}</td>
                      <td className="text-center">{item.container.amount}</td>
                      <td className="text-center">{item.name}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Row>
          <hr className="my-4" />
          <h6 className="heading-small text-muted mb-4">
            Información Itinerario
          </h6>
          <Row>
            <div className="d-flex col">
              <label className="mr-3 font-weight-bold">
                Lugar de despacho (Origen):
              </label>
              <p className="d-inline">{roadmap.itinerary.origin.address}</p>
            </div>
            <div className="d-flex col">
              <label className="mr-3 font-weight-bold">Departamento:</label>
              <p className="d-inline">{roadmap.itinerary.origin.departament}</p>
            </div>
          </Row>

          <Row>
            <div className="d-flex col">
              <label className="mr-3 font-weight-bold">Provincia:</label>
              <p className="d-inline">{roadmap.itinerary.origin.province}</p>
            </div>
            <div className="d-flex col">
              <label className="mr-3 font-weight-bold">Municipio:</label>
              <p className="d-inline">
                {roadmap.itinerary.origin.municipality}
              </p>
            </div>
          </Row>
          <Row>
            <div className="d-flex col">
              <label className="mr-3 font-weight-bold">
                Lugar de despacho (Destino):
              </label>
              <p className="d-inline">
                {roadmap.itinerary.destination.address}
              </p>
            </div>
            <div className="d-flex col">
              <label className="mr-3 font-weight-bold">Departamento:</label>
              <p className="d-inline">
                {roadmap.itinerary.destination.departament}
              </p>
            </div>
          </Row>
          <Row>
            <div className="d-flex col">
              <label className="mr-3 font-weight-bold">Provincia:</label>
              <p className="d-inline">
                {roadmap.itinerary.destination.province}
              </p>
            </div>
            <div className="d-flex col">
              <label className="mr-3 font-weight-bold">Municipio:</label>
              <p className="d-inline">
                {roadmap.itinerary.destination.municipality}
              </p>
            </div>
          </Row>
          <Row>
            <div className="d-flex col">
              <label className="mr-3 font-weight-bold">Ruta a seguir:</label>
              <p className="d-inline">{roadmap.route}</p>
            </div>
          </Row>
          <Row>
            <div className="d-flex col">
              <label className="mr-3 font-weight-bold">
                Plazo validez de la Hoja de Ruta:
              </label>
              <p className="d-inline">{roadmap.validity}</p>
            </div>
            <div className="d-flex col">
              <label className="mr-3 font-weight-bold">
                Autorización para la compra local:
              </label>
              <p className="d-inline">{roadmap.authorization}</p>
            </div>
          </Row>

          <Row>
            <div className="d-flex col">
              <label className="mr-3 font-weight-bold">Desde el dia:</label>
              <p className="d-inline">
                {" "}
                {moment(roadmap.begin).format("DD MMMM YYYY, h:mm:ss a")}
              </p>
            </div>
            <div className="d-flex col">
              <label className="mr-3 font-weight-bold">Hasta el dia:</label>
              <p className="d-inline">
                {" "}
                {moment(roadmap.finish).format("DD MMMM YYYY, h:mm:ss a")}
              </p>
            </div>
          </Row>
          <hr className="my-4" />
          <h6 className="heading-small text-muted mb-4">
            Información Adicional
          </h6>
          <div className="d-flex col">
            <label className="mr-3 font-weight-bold">Estado:</label>
            <p
              className={classnames("d-inline", {
                "text-success": roadmap.state,
                "text-danger": !roadmap.state
              })}
            >
              {roadmap.state ? "Activo" : "Inactivo"}
            </p>
          </div>
          <div className="d-flex col font-weight-bold">
            <label className="mr-3 font-weight-bold">Ultimo Registro:</label>
            <p className="d-inline">
              {moment(roadmap.createdAt).format("DD MMMM YYYY, h:mm:ss a")}
            </p>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default withParamsState(DetailsRoadmap);
