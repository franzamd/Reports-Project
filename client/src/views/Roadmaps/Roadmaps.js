import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import {
  Col,
  DropdownItem,
  Table,
  Card,
  Badge,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  CardFooter
} from "reactstrap";
import "moment/locale/es";
import moment from "moment";

import RoadmapsContext from "../../context/roadmap/roadmapContext";

import CardHeaderTable from "../../components/common/CardHeaderTable";
import NotFoundItems from "../../components/common/NotFoundItems";
import LoadingItems from "../../components/common/LoadingItems";
import PaginationFooter from "../../components/common/PaginationFooter";

moment().locale("es");

const Roadmaps = props => {
  const roadmapContext = useContext(RoadmapsContext);
  const {
    roadmaps,
    loading,
    getRoadmaps,
    getRoadmapsByRegex,
    resetRoadmaps
  } = roadmapContext;

  const [dropdownOpen, setDropDown] = useState(false);
  const [currentItem, setCurrentItem] = useState({
    name: "tramit",
    value: "Nº Tramite"
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    getRoadmaps();
  }, []);

  useEffect(() => () => resetRoadmaps(), []);

  const toggleDropDown = () => {
    setDropDown(!dropdownOpen);
  };

  const onCaptureItem = e => {
    setCurrentItem({ name: e.target.name, value: e.target.value });
  };

  const handleSearchText = e => {
    if (currentItem.name === "tramit") {
      getRoadmapsByRegex(e.target.value, currentItem.name);
    }
  };

  const onRefreshItems = () => {
    getRoadmaps();
  };

  const addItem = () => {
    props.history.push("/admin/roadmaps/create");
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems =
    roadmaps && roadmaps.data
      ? roadmaps.data.slice(indexOfFirstItem, indexOfLastItem)
      : [];

  // Change page
  const paginate = (e, pageNumber) => {
    e.preventDefault();

    setCurrentPage(pageNumber);
  };

  return (
    <Col>
      <div className="col">
        <Card className="shadow">
          <CardHeaderTable
            title="Administración de Hojas de Ruta"
            description="Listado actual de todas las rutas realizara por empresas, choferes, vehiculos registrados en el sistema"
            currentItem={currentItem.value}
            dropdownOpen={dropdownOpen}
            onRefreshItems={onRefreshItems}
            toggleDropDown={toggleDropDown}
            onCaptureItem={onCaptureItem}
            handleSearchText={handleSearchText}
            // Add Item
            onAddItem={addItem}
          >
            <DropdownMenu>
              <DropdownItem
                name="tramit"
                value="Nº tramite"
                onClick={onCaptureItem}
              >
                Nº de tramite
              </DropdownItem>
            </DropdownMenu>
          </CardHeaderTable>
          {loading ? (
            <LoadingItems />
          ) : roadmaps && roadmaps.data && roadmaps.data.length === 0 ? (
            <NotFoundItems />
          ) : (
            <div>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col" className="text-center">
                      Nº de tramite
                    </th>
                    <th scope="col" className="text-center">
                      Origen
                    </th>
                    <th scope="col" className="text-center">
                      Destino
                    </th>
                    <th scope="col" className="text-center">
                      Chofer
                    </th>
                    <th scope="col" className="text-center">
                      Vehiculo
                    </th>
                    <th scope="col" className="text-center">
                      Empresa
                    </th>

                    <th scope="col" className="text-center">
                      Estado
                    </th>
                    <th scope="col" className="text-center">
                      Registro
                    </th>
                    <th scope="col" className="text-center">
                      Opciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map(item => {
                    return (
                      <tr key={item._id}>
                        <td className="text-center">{item.tramit}</td>
                        <td className="text-center">
                          {item.itinerary.origin.address}
                        </td>
                        <td className="text-center">
                          {item.itinerary.destination.address}
                        </td>
                        <td className="text-center">{`${item.chauffeur.name} ${item.chauffeur.lastname}`}</td>
                        <td className="text-center">{item.vehicle.number}</td>
                        <td className="text-center">{item.business.name}</td>
                        <td className="text-center">
                          {item.state ? (
                            <Badge color="success" className="badge-dot">
                              <i className="bg-success" />
                              Activo
                            </Badge>
                          ) : (
                            <Badge color="danger" className="badge-dot">
                              <i className="bg-danger" />
                              Inactivo
                            </Badge>
                          )}
                        </td>
                        <td className="text-center">
                          {moment(item.createdAt).format("L")}
                        </td>
                        <td className="text-center">
                          <UncontrolledDropdown>
                            <DropdownToggle
                              className="btn-icon-only text-light"
                              href="/"
                              role="button"
                              size="sm"
                              onClick={e => e.preventDefault()}
                            >
                              <i className="fas fa-ellipsis-v" />
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-arrow" right>
                              <Link
                                className="dropdown-item"
                                to={{
                                  pathname: "/admin/roadmaps/details",
                                  state: { _id: item._id }
                                }}
                              >
                                Ver Detalles
                              </Link>
                              <Link
                                className="dropdown-item"
                                to={{
                                  pathname: "/admin/roadmaps/update",
                                  state: { _id: item._id }
                                }}
                              >
                                Actualizar
                              </Link>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
              <CardFooter className="py-4">
                <PaginationFooter
                  itemsPerPage={itemsPerPage}
                  totalItems={
                    roadmaps && roadmaps.data ? roadmaps.data.length : 0
                  }
                  paginate={paginate}
                  index={currentPage}
                />
              </CardFooter>
            </div>
          )}
        </Card>
      </div>
    </Col>
  );
};

export default Roadmaps;
