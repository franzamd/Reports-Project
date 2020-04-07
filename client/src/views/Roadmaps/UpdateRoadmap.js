import React, { useState, useContext, useEffect } from "react";
import jsreport from "jsreport-browser-client-dist";
import "moment/locale/es";
import moment from "moment";
import { Col, Card, CardHeader, CardBody, Row, Button, Form } from "reactstrap";

import InputGroup from "../../components/common/InputGroup";
import ConfirmButton from "../../components/common/ConfirmButton";
import SelectListGroup from "../../components/common/SelectListGroup";
import DateFieldGroup from "../../components/common/DateFieldGroup";
import ModalConfirmation from "../../components/common/ModalConfirmation";

import BusinessContext from "../../context/business/businessContext";
import ChauffeurContext from "../../context/chauffeur/chauffeurContext";
import VehicleContext from "../../context/vehicle/vehicleContext";
import RoadmapContext from "../../context/roadmap/roadmapContext";

import withParamsState from "../../HOC/withParamsState";

moment().locale("es");

const UpdateRoadmap = (props) => {
  // Roadmap id
  const { _id } = props.location.state;

  const roadmapContext = useContext(RoadmapContext);
  const businessContext = useContext(BusinessContext);
  const vehicleContext = useContext(VehicleContext);
  const chauffeurContext = useContext(ChauffeurContext);

  const {
    error,
    loading,
    getRoadmapByPopulate,
    updateRoadmap,
    resetRoadmaps,
  } = roadmapContext;
  const { getBusinessByState, resetBusiness } = businessContext;
  const { getVehiclesByState, resetVehicles } = vehicleContext;
  const { getChauffeursByState, resetChauffeurs } = chauffeurContext;

  const [roadmap, setRoadmap] = useState({
    products: [
      {
        substance: "",
        types: {
          primary: "",
          product: "",
          percentage: "",
        },
        amount: "",
        unit: "",
        container: {
          type: "",
          amount: "",
        },
        name: "",
      },
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
        address: "",
      },
      origin: {
        municipality: "",
        province: "",
        departament: "",
        address: "",
      },
    },
    route: "",
    tramit: "",
    city: "",
    state: "",
    createdAt: "",
    delivered: "",
  });

  const [dataManagers, setDataManagers] = useState([]);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    getInitialFunctions();
  }, []);

  const getInitialFunctions = async () => {
    await getBusinessByState(true);
    await getVehiclesByState(true);
    await getChauffeursByState(true);
    await getRoadmapByPopulate(_id);
  };

  useEffect(() => {
    if (!loading && roadmapContext.roadmap && roadmapContext.roadmap.data) {
      roadmapContext.roadmap.data.begin = roadmapContext.roadmap.data.begin.slice(
        0,
        10
      );
      roadmapContext.roadmap.data.finish = roadmapContext.roadmap.data.finish.slice(
        0,
        10
      );

      setRoadmap(roadmapContext.roadmap.data);
    }
  }, [loading]);

  // Load managers when the business is selected
  useEffect(() => {
    if (roadmap.business) {
      getManagersArray(roadmap.business);
    }
  }, [roadmap.business]);

  useEffect(
    () => () => {
      resetBusiness();
      resetChauffeurs();
      resetVehicles();
      resetRoadmaps();
    },
    []
  );

  const toggleModal = () => {
    setModal(!modal);
  };

  const getManagersArray = (businessId) => {
    const object = business.find((business) => business._id === businessId);

    const data = [];

    if (object && object.managers.length > 0) {
      object.managers.map((manager) => {
        if (manager.state) {
          return data.push({
            _id: manager._id,
            label: `C.I.: ${manager.ci} - ${manager.name} ${manager.lastname} - ${manager.role}`,
            value: manager._id,
          });
        } else return null;
      });
    }

    data.unshift({
      _id: "1",
      label: "* Seleccione una opción",
      value: 0,
    });

    setDataManagers(data);
  };

  const handleInput = (e) => {
    setRoadmap({
      ...roadmap,
      [e.target.name]: e.target.value,
    });
  };

  const addProduct = () => {
    setRoadmap({
      ...roadmap,
      products: [
        ...roadmap.products,
        {
          substance: "",
          types: {
            primary: "",
            product: "",
            percentage: "",
          },
          amount: "",
          unit: "",
          container: {
            type: "",
            amount: "",
          },
          name: "",
        },
      ],
    });
  };

  const removeProduct = (index) => {
    setRoadmap({
      ...roadmap,
      products: roadmap.products.filter((p, i) => i !== index),
    });
  };

  const handleInputProducts = (e, index) => {
    setRoadmap({
      ...roadmap,
      products: roadmap.products.map((product, i) => {
        if (index !== i) return product;
        return { ...product, [e.target.name]: e.target.value };
      }),
    });
  };

  const handleInputProductPath = (e, index, path) => {
    setRoadmap({
      ...roadmap,
      products: roadmap.products.map((product, i) => {
        if (index !== i) return product;
        return {
          ...product,
          [path]: { ...product[path], [e.target.name]: e.target.value },
        };
      }),
    });
  };

  const handleInputItinerary = (e, path, path2) => {
    setRoadmap({
      ...roadmap,
      [path]: {
        ...roadmap.itinerary,
        [path2]: {
          ...roadmap.itinerary[path2],
          [e.target.name]: e.target.value,
        },
      },
    });
  };

  const getChauffeur = (id) => {
    return chauffeurContext.chauffeurs.data.find(
      (chauffeur) => chauffeur._id.toString() === id
    );
  };

  const getVehicle = (id) => {
    return vehicleContext.vehicles.data.find(
      (vehicle) => vehicle._id.toString() === id
    );
  };

  const getBusiness = (id) => {
    return businessContext.business.data.find(
      (business) => business._id.toString() === id
    );
  };

  const getManager = (business, managerId) => {
    return business.managers.find(
      (manager) => manager._id.toString() === managerId
    );
  };

  const printPDF = () => {
    const formData = buildData();

    formData.createdAt = moment().format("DD MMMM YYYY, h:mm:ss a");
    formData.begin = moment(formData.begin).format("L");
    formData.finish = moment(formData.finish).format("L");

    formData.chauffeur = getChauffeur(formData.chauffeur);
    formData.vehicle = getVehicle(formData.vehicle);
    formData.business = getBusiness(formData.business);
    formData.manager = getManager(formData.business, formData.manager);

    jsreport.serverUrl = "http://localhost:5488";

    let reportRequest = {
      template: { shortid: "rkJTnK2ce" },
      data: formData,
    };

    jsreport.render(reportRequest);

    return props.history.goBack();
  };

  const buildData = () => {
    const formData = {
      products: roadmap.products,
      chauffeur: roadmap.chauffeur ? roadmap.chauffeur : null,
      vehicle: roadmap.vehicle ? roadmap.vehicle : null,
      business:
        roadmap.business && roadmap.business !== "0" ? roadmap.business : null,
      manager:
        dataManagers.length > 1 && roadmap.manager && roadmap.manager !== "0"
          ? roadmap.manager
          : null,
      authorization: roadmap.authorization,
      finish: roadmap.finish,
      begin: roadmap.begin,
      validity: roadmap.validity,
      itinerary: {
        destination: {
          municipality: roadmap.itinerary.destination.municipality,
          province: roadmap.itinerary.destination.province,
          departament: roadmap.itinerary.destination.departament,
          address: roadmap.itinerary.destination.address,
        },
        origin: {
          municipality: roadmap.itinerary.origin.municipality,
          province: roadmap.itinerary.origin.province,
          departament: roadmap.itinerary.origin.departament,
          address: roadmap.itinerary.origin.address,
        },
      },
      route: roadmap.route,
      tramit: roadmap.tramit,
      city: roadmap.city,
      state: roadmap.state,
      delivered: roadmap.delivered,
    };

    return formData;
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = buildData();

    const res = await updateRoadmap(_id, formData);

    if (res) {
      toggleModal();
    }
  };

  // Data
  const business =
    businessContext.business && businessContext.business.data
      ? businessContext.business.data
      : [];

  const vehicles =
    vehicleContext.vehicles && vehicleContext.vehicles.data
      ? vehicleContext.vehicles.data
      : [];

  const chauffeurs =
    chauffeurContext.chauffeurs && chauffeurContext.chauffeurs.data
      ? chauffeurContext.chauffeurs.data
      : [];

  const errorChauffeur = error && error.chauffeur ? error.chauffeur : null;
  const errorVehicle = error && error.vehicle ? error.vehicle : null;
  const errorBusiness = error && error.business ? error.business : null;
  const errorManager = error && error.manager ? error.manager : null;
  const errorAutorization =
    error && error.authorization ? error.authorization : null;
  const errorFinish = error && error.finish ? error.finish : null;
  const errorBegin = error && error.begin ? error.begin : null;
  const errorRoute = error && error.route ? error.route : null;
  const errorValidty = error && error.validity ? error.validity : null;
  const errorTramit = error && error.tramit ? error.tramit : null;
  const errorCity = error && error.city ? error.city : null;
  const errorGlobal = typeof error === "string" ? error : null;

  let errorItineraryDestinationMunicipality;
  let errorItineraryDestinationDepartament;
  let errorItineraryDestinationProvince;
  let errorItineraryDestinationAddress;
  let errorItineraryOriginMunicipality;
  let errorItineraryOriginDepartament;
  let errorItineraryOriginProvince;
  let errorItineraryOriginAddress;

  // Options Select
  const optionsCity = [
    { _id: "1", label: "* Seleccione una opción", value: 0 },
    { _id: "2", label: "Tarija", value: "Tarija" },
    { _id: "3", label: "Santa Cruz", value: "Santa Cruz" },
    { _id: "4", label: "La Paz", value: "La Paz" },
    { _id: "5", label: "Cochabamba", value: "Cochabamba" },
    { _id: "6", label: "Oruro", value: "Oruro" },
    { _id: "7", label: "Potosi", value: "Potosi" },
    { _id: "8", label: "Chuquisaca", value: "Chuquisaca" },
    { _id: "9", label: "Beni", value: "Beni" },
    { _id: "10", label: "Pando", value: "Pando" },
  ];
  const optionsState = [
    { _id: "1", label: "* Seleccione una opción", value: 0 },
    { _id: "2", label: "Activo", value: true },
    { _id: "3", label: "Inactivo", value: false },
  ];

  const optionsBusiness = business.map((item) => {
    return {
      _id: item._id,
      label: `REGISTRO: ${item.nit} - ${item.name}`,
      value: item._id,
    };
  });

  optionsBusiness.unshift({
    _id: "1",
    label: "* Seleccione una opción",
    value: 0,
  });

  const optionsVehicles = vehicles.map((item) => {
    return {
      _id: item._id,
      label: `Placa: ${item.number} - ${item.brand} - ${item.color}`,
      value: item._id,
    };
  });

  optionsVehicles.unshift({
    _id: "1",
    label: "* Seleccione una opción",
    value: 0,
  });

  const optionsChauffeurs = chauffeurs.map((item) => {
    return {
      _id: item._id,
      label: `C.I.: ${item.ci} - ${item.name} ${item.lastname}`,
      value: item._id,
    };
  });

  optionsChauffeurs.unshift({
    _id: "1",
    label: "* Seleccione una opción",
    value: 0,
  });

  if (error && typeof error === "object") {
    const {
      "itinerary.destination.municipality": errorDestinationMunicipality,
      "itinerary.destination.departament": errorDestinationDepartament,
      "itinerary.destination.province": errorDestinationProvince,
      "itinerary.destination.address": errorDestinationAddress,
      "itinerary.origin.municipality": errorOriginMunicipality,
      "itinerary.origin.departament": errorOriginDepartament,
      "itinerary.origin.province": errorOriginProvince,
      "itinerary.origin.address": errorOriginAddress,
    } = error;

    errorItineraryDestinationMunicipality = errorDestinationMunicipality;
    errorItineraryDestinationDepartament = errorDestinationDepartament;
    errorItineraryDestinationProvince = errorDestinationProvince;
    errorItineraryDestinationAddress = errorDestinationAddress;
    errorItineraryOriginMunicipality = errorOriginMunicipality;
    errorItineraryOriginDepartament = errorOriginDepartament;
    errorItineraryOriginProvince = errorOriginProvince;
    errorItineraryOriginAddress = errorOriginAddress;
  }

  return (
    <Col>
      <Card>
        <Form onSubmit={onSubmit}>
          <CardHeader className="bg-white border-0">
            <Row>
              <Col>
                <h3 className="mb-0">Actualizar Hoja de Ruta</h3>
              </Col>
              <Col
                className="d-flex justify-content-end flex-wrap align-items-baseline"
                xs="4"
              >
                <ConfirmButton onClick={onSubmit} loading={loading} />
                <Button
                  onClick={() =>
                    props.history.push({
                      pathname: "/admin/roadmaps",
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
                  label="Nº de tramite *"
                  placeholder="Ej. HOJ-001231"
                  name="tramit"
                  value={roadmap.tramit}
                  error={errorTramit}
                  onChange={handleInput}
                />
              </Col>
              <Col lg="6">
                <SelectListGroup
                  label="Ciudad de emision *"
                  name="city"
                  onChange={handleInput}
                  error={errorCity}
                  options={optionsCity}
                  value={roadmap.city}
                />
              </Col>
            </Row>
            <hr className="my-4" />
            <h6 className="heading-small text-muted mb-4">
              Información Empresa
            </h6>
            <Row>
              <Col lg="12">
                <SelectListGroup
                  label="Empresa *"
                  name="business"
                  onChange={handleInput}
                  error={errorBusiness}
                  options={optionsBusiness}
                  value={roadmap.business}
                />
              </Col>
            </Row>
            <Row>
              <Col lg="12">
                <SelectListGroup
                  disabled={dataManagers.length === 0}
                  label="Encargado de Empresa *"
                  name="manager"
                  onChange={handleInput}
                  error={errorManager}
                  options={dataManagers}
                  value={roadmap.manager}
                />
              </Col>
            </Row>
            <hr className="my-4" />
            <h6 className="heading-small text-muted mb-4">
              Información Chofer
            </h6>
            <Row>
              <Col lg="12">
                <SelectListGroup
                  label="Chofer"
                  name="chauffeur"
                  onChange={handleInput}
                  error={errorChauffeur}
                  options={optionsChauffeurs}
                  value={roadmap.chauffeur}
                />
              </Col>
            </Row>
            <hr className="my-4" />
            <h6 className="heading-small text-muted mb-4">
              Información Vehiculo
            </h6>
            <Row>
              <Col lg="12">
                <SelectListGroup
                  label="Vehiculo"
                  name="vehicle"
                  onChange={handleInput}
                  error={errorVehicle}
                  options={optionsVehicles}
                  value={roadmap.vehicle}
                />
              </Col>
            </Row>
            <hr className="my-4" />
            <h6 className="heading-small text-muted mb-4">
              Información Productos
            </h6>
            {roadmap.products.map((product, i) => {
              return (
                <div key={i}>
                  <Row>
                    <Col>
                      <InputGroup
                        isLabelSmall={true}
                        label="Sunstancia"
                        placeholder="Ej. Gasolina"
                        name="substance"
                        value={product.substance}
                        onChange={(e) => handleInputProducts(e, i)}
                      />
                    </Col>
                    <Col lg={1} md={1} xs={1}>
                      <InputGroup
                        isLabelSmall={true}
                        label="Primaria"
                        placeholder="Ej. N"
                        name="primary"
                        value={product.types.primary}
                        onChange={(e) => handleInputProductPath(e, i, "types")}
                      />
                    </Col>
                    <Col>
                      <InputGroup
                        isLabelSmall={true}
                        label="P. terminado"
                        placeholder="Ej. S"
                        name="product"
                        value={product.types.product}
                        onChange={(e) => handleInputProductPath(e, i, "types")}
                      />
                    </Col>
                    <Col lg={1} md={1} xs={1}>
                      <InputGroup
                        isLabelSmall={true}
                        label="%"
                        placeholder="Ej. 50,00"
                        name="percentage"
                        value={product.types.percentage}
                        onChange={(e) => handleInputProductPath(e, i, "types")}
                      />
                    </Col>
                    <Col>
                      <InputGroup
                        isLabelSmall={true}
                        label="Cantidad"
                        placeholder="Ej. 22000"
                        name="amount"
                        value={product.amount}
                        onChange={(e) => handleInputProducts(e, i)}
                      />
                    </Col>
                    <Col>
                      <InputGroup
                        isLabelSmall={true}
                        label="Unidad  Kg/Lt."
                        placeholder="Ej. lit"
                        name="unit"
                        value={product.unit}
                        onChange={(e) => handleInputProducts(e, i)}
                      />
                    </Col>
                    <Col>
                      <InputGroup
                        isLabelSmall={true}
                        label="Tipo"
                        placeholder="Ej. Acto Camion"
                        name="type"
                        value={product.container.type}
                        onChange={(e) =>
                          handleInputProductPath(e, i, "container")
                        }
                      />
                    </Col>
                    <Col lg={1} md={1} xs={1}>
                      <InputGroup
                        isLabelSmall={true}
                        label="Cantidad"
                        placeholder="Ej. 1"
                        name="amount"
                        value={product.container.amount}
                        onChange={(e) =>
                          handleInputProductPath(e, i, "container")
                        }
                      />
                    </Col>
                    <Col>
                      <InputGroup
                        isLabelSmall={true}
                        label="Nombre"
                        placeholder="Ej. Condensado"
                        name="name"
                        value={product.name}
                        onChange={(e) => handleInputProducts(e, i)}
                      />
                    </Col>
                    <button
                      type="button"
                      onClick={() => removeProduct(i)}
                      className="my-2 mr-3 btn btn-danger"
                    >
                      -
                    </button>
                  </Row>
                </div>
              );
            })}
            <Row>
              <Col lg="12" className="d-flex justify-content-center my-3">
                <button
                  type="button"
                  onClick={addProduct}
                  className="btn btn-success"
                >
                  Añadir Producto
                </button>
              </Col>
            </Row>
            <hr className="my-4" />
            <h6 className="heading-small text-muted mb-4">
              Información Itinerario
            </h6>
            <Row>
              <Col lg="6">
                <InputGroup
                  label="Lugar de despacho (Origen) *"
                  placeholder="Ej. Bermejo (B. Petrolero)"
                  name="address"
                  value={roadmap.itinerary.origin.address}
                  error={errorItineraryOriginAddress}
                  onChange={(e) =>
                    handleInputItinerary(e, "itinerary", "origin")
                  }
                />
              </Col>
              <Col lg="6">
                <InputGroup
                  label="Departamento *"
                  placeholder="Ej. Tarija"
                  name="departament"
                  value={roadmap.itinerary.origin.departament}
                  error={errorItineraryOriginDepartament}
                  onChange={(e) =>
                    handleInputItinerary(e, "itinerary", "origin")
                  }
                />
              </Col>
            </Row>
            <Row>
              <Col lg="6">
                <InputGroup
                  label="Provincia *"
                  placeholder="Ej. Cercado"
                  name="province"
                  value={roadmap.itinerary.origin.province}
                  error={errorItineraryOriginProvince}
                  onChange={(e) =>
                    handleInputItinerary(e, "itinerary", "origin")
                  }
                />
              </Col>
              <Col lg="6">
                <InputGroup
                  label="Municipio *"
                  placeholder="Ej. Tarija"
                  name="municipality"
                  value={roadmap.itinerary.origin.municipality}
                  error={errorItineraryOriginMunicipality}
                  onChange={(e) =>
                    handleInputItinerary(e, "itinerary", "origin")
                  }
                />
              </Col>
            </Row>
            <Row>
              <Col lg="6">
                <InputGroup
                  label="Lugar de despacho (Destino) *"
                  placeholder="Ej. Tiguipa"
                  name="address"
                  value={roadmap.itinerary.destination.address}
                  error={errorItineraryDestinationAddress}
                  onChange={(e) =>
                    handleInputItinerary(e, "itinerary", "destination")
                  }
                />
              </Col>
              <Col lg="6">
                <InputGroup
                  label="Departamento *"
                  placeholder="Ej. Tarija"
                  name="departament"
                  value={roadmap.itinerary.destination.departament}
                  error={errorItineraryDestinationDepartament}
                  onChange={(e) =>
                    handleInputItinerary(e, "itinerary", "destination")
                  }
                />
              </Col>
            </Row>
            <Row>
              <Col lg="6">
                <InputGroup
                  label="Provincia *"
                  placeholder="Ej. Cercado"
                  name="province"
                  value={roadmap.itinerary.destination.province}
                  error={errorItineraryDestinationProvince}
                  onChange={(e) =>
                    handleInputItinerary(e, "itinerary", "destination")
                  }
                />
              </Col>
              <Col lg="6">
                <InputGroup
                  label="Municipio *"
                  placeholder="Ej. Tarija"
                  name="municipality"
                  value={roadmap.itinerary.destination.municipality}
                  error={errorItineraryDestinationMunicipality}
                  onChange={(e) =>
                    handleInputItinerary(e, "itinerary", "destination")
                  }
                />
              </Col>
            </Row>
            <Row>
              <Col lg="12">
                <InputGroup
                  label="Ruta a seguir *"
                  placeholder="Ej. BERMEJO-PADCAYA-TARIJA"
                  name="route"
                  value={roadmap.route}
                  error={errorRoute}
                  onChange={handleInput}
                />
              </Col>
            </Row>
            <Row>
              <Col lg="6">
                <InputGroup
                  label="Plazo validez de la Hoja de Ruta *"
                  placeholder="Ej. 3"
                  name="validity"
                  value={roadmap.validity}
                  error={errorValidty}
                  onChange={handleInput}
                />
              </Col>
              <Col lg="6">
                <InputGroup
                  label="Autorización para la compra local *"
                  placeholder="Ej. Cambio"
                  name="authorization"
                  value={roadmap.authorization}
                  error={errorAutorization}
                  onChange={handleInput}
                />
              </Col>
            </Row>
            <Row>
              <Col lg="6">
                <InputGroup
                  label="Desde el dia *"
                  name="begin"
                  type="date"
                  value={roadmap.begin}
                  error={errorBegin}
                  onChange={handleInput}
                />
              </Col>
              <Col lg="6">
                <InputGroup
                  label="Hasta el dia *"
                  name="finish"
                  type="date"
                  value={roadmap.finish}
                  error={errorFinish}
                  onChange={handleInput}
                />
              </Col>
            </Row>
            <Row>
              <Col lg="6">
                <SelectListGroup
                  label="Estado de Registro"
                  name="state"
                  onChange={handleInput}
                  options={optionsState}
                  value={roadmap.state}
                />
              </Col>
              <Col lg="6">
                <DateFieldGroup
                  label="Fecha de Registro"
                  name="date"
                  value={roadmap.createdAt}
                />
              </Col>
            </Row>
            <Row>
              <Col lg="12">
                <InputGroup
                  disabled={true}
                  name="delivered"
                  label="Estado de Entrega"
                  value={roadmap.delivered ? "Entregado" : "Pendiente"}
                />
              </Col>
            </Row>
          </CardBody>
        </Form>
      </Card>
      <ModalConfirmation
        title="Imprimir"
        modal={modal}
        toggle={toggleModal}
        onConfirm={(e) => {
          e.preventDefault();

          printPDF();
        }}
        onClose={() => {
          toggleModal();

          props.history.goBack();
        }}
        description="Hoja de ruta actualizada exitosamente. Desea imprimirlo?"
        className="bg-primary"
      />
    </Col>
  );
};

export default withParamsState(UpdateRoadmap);
