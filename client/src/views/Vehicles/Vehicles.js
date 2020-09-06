import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import {
  Container,
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

import VehicleContext from "../../context/vehicle/vehicleContext";

import CardHeaderTable from "../../components/common/CardHeaderTable";
import NotFoundItems from "../../components/common/NotFoundItems";
import LoadingItems from "../../components/common/LoadingItems";
import PaginationFooter from "../../components/common/PaginationFooter";

moment().locale("es");

const Vehicles = props => {
  const vehicleContext = useContext(VehicleContext);
  const {
    vehicles,
    loading,
    getVehicles,
    getVehiclesByRegex,
    resetVehicles
  } = vehicleContext;

  const [dropdownOpen, setDropDown] = useState(false);
  const [currentItem, setCurrentItem] = useState({
    name: "number",
    value: "Placa"
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    getVehicles();
  }, []);

  useEffect(() => () => resetVehicles(), []);

  const toggleDropDown = () => {
    setDropDown(!dropdownOpen);
  };

  const onCaptureItem = e => {
    setCurrentItem({ name: e.target.name, value: e.target.value });
  };

  const handleSearchText = e => {
    if (currentItem.name === "number" || currentItem.name === "brand") {
      getVehiclesByRegex(e.target.value, currentItem.name);
    }
  };

  const onRefreshItems = () => {
    getVehicles();
  };

  const addItem = () => {
    props.history.push("/admin/vehicles/create");
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems =
    vehicles && vehicles.data
      ? vehicles.data.slice(indexOfFirstItem, indexOfLastItem)
      : [];

  // Change page
  const paginate = (e, pageNumber) => {
    e.preventDefault();

    setCurrentPage(pageNumber);
  };

  return (
    <Container>
      <div className="col">
        <Card className="shadow">
          <CardHeaderTable
            title="Administración de Vehiculos"
            description="Listado actual de todos los vehiculos registrados en el sistema"
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
              <DropdownItem name="number" value="Placa" onClick={onCaptureItem}>
                Placa
              </DropdownItem>
              <DropdownItem name="brand" value="Marca" onClick={onCaptureItem}>
                Marca
              </DropdownItem>
            </DropdownMenu>
          </CardHeaderTable>
          {loading ? (
            <LoadingItems />
          ) : vehicles && vehicles.data && vehicles.data.length === 0 ? (
            <NotFoundItems />
          ) : (
            <div>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col" className="text-center">
                      Placa
                    </th>
                    <th scope="col" className="text-center">
                      Volumen
                    </th>
                    <th scope="col" className="text-center">
                      Marca
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
                  {currentItems.map(vehicle => {
                    return (
                      <tr key={vehicle._id}>
                        <td className="text-center">{vehicle.number}</td>
                        <td className="text-center">{vehicle.volume}</td>
                        <td className="text-center">{vehicle.brand}</td>
                        <td className="text-center">
                          {vehicle.state ? (
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
                          {moment(vehicle.createdAt).format("L")}
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
                                  pathname: "/admin/vehicles/details",
                                  state: { vehicle }
                                }}
                              >
                                Ver Detalles
                              </Link>
                              <Link
                                className="dropdown-item"
                                to={{
                                  pathname: "/admin/vehicles/update",
                                  state: { _id: vehicle._id }
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
                    vehicles && vehicles.data ? vehicles.data.length : 0
                  }
                  paginate={paginate}
                  index={currentPage}
                />
              </CardFooter>
            </div>
          )}
        </Card>
      </div>
    </Container>
  );
};

export default Vehicles;
