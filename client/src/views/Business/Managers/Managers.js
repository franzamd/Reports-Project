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

import BusinessContext from "../../../context/business/businessContext";

import withParamsState from "../../../HOC/withParamsState";
import CardHeaderTable from "../../../components/common/CardHeaderTable";
import NotFoundItems from "../../../components/common/NotFoundItems";
import LoadingItems from "../../../components/common/LoadingItems";
import PaginationFooter from "../../../components/common/PaginationFooter";

moment().locale("es");

const Managers = props => {
  // business
  const { _id } = props.location.state;

  const businessContext = useContext(BusinessContext);
  const {
    loading,
    businessSelected,
    getBusinessById,
    resetBusiness
  } = businessContext;

  const [dropdownOpen, setDropDown] = useState(false);
  const [currentItem, setCurrentItem] = useState({
    name: "name",
    value: "Nombres"
  });

  const [managers, setManagers] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    getBusinessById(_id);
  }, []);

  useEffect(() => {
    if (!loading && businessSelected.data && businessSelected.data.managers) {
      setManagers(businessSelected.data.managers);
    }
  }, [loading]);

  useEffect(() => () => resetBusiness(), []);

  const toggleDropDown = () => {
    setDropDown(!dropdownOpen);
  };

  const onCaptureItem = e => {
    setCurrentItem({ name: e.target.name, value: e.target.value });
  };

  const handleSearchText = e => {
    const value =
      e.target.value.length > 0 && typeof e.target.value === "string"
        ? e.target.value.toLowerCase()
        : e.target.value.length > 0 && typeof e.target.value === "number"
        ? e.target.value
        : "";

    let filtered;

    if (currentItem.name === "name") {
      filtered = businessSelected.data.managers.filter(item => {
        return item.name.toLowerCase().includes(value);
      });
    }

    if (currentItem.name === "lastname") {
      filtered = businessSelected.data.managers.filter(item => {
        return item.lastname.toLowerCase().includes(value);
      });
    }

    if (currentItem.name === "ci") {
      filtered = businessSelected.data.managers.filter(item => {
        return item.ci.toLowerCase().includes(value);
      });
    }

    setManagers(filtered);
  };

  const onRefreshItems = () => {
    getBusinessById(_id);
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems =
    managers.length > 0
      ? managers.slice(indexOfFirstItem, indexOfLastItem)
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
            title="Administración de Encargados"
            description={`Listado actual de todas los encargados en ${
              businessSelected.data ? businessSelected.data.name : ""
            } registrados`}
            currentItem={currentItem.value}
            dropdownOpen={dropdownOpen}
            onRefreshItems={onRefreshItems}
            toggleDropDown={toggleDropDown}
            onCaptureItem={onCaptureItem}
            handleSearchText={handleSearchText}
            // Add Item
            link="/admin/business/managers/create"
            // id
            state={businessSelected.data ? businessSelected.data._id : null}
          >
            <DropdownMenu>
              <DropdownItem name="name" value="Nombres" onClick={onCaptureItem}>
                Nombres
              </DropdownItem>
              <DropdownItem
                name="lastname"
                value="Apellidos"
                onClick={onCaptureItem}
              >
                Apellidos
              </DropdownItem>
              <DropdownItem name="ci" value="C.I." onClick={onCaptureItem}>
                C.I.
              </DropdownItem>
            </DropdownMenu>
          </CardHeaderTable>
          {loading ? (
            <LoadingItems />
          ) : currentItems.length === 0 ? (
            <NotFoundItems />
          ) : (
            <div>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col" className="text-center">
                      Nombres
                    </th>
                    <th scope="col" className="text-center">
                      Apellidos
                    </th>
                    <th scope="col" className="text-center">
                      C.I.
                    </th>
                    <th scope="col" className="text-center">
                      Rol
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
                  {currentItems.map(manager => {
                    return (
                      <tr key={manager._id}>
                        <td className="text-center">{manager.name}</td>
                        <td className="text-center">{manager.lastname}</td>
                        <td className="text-center">{manager.ci}</td>
                        <td className="text-center">{manager.role}</td>
                        <td className="text-center">
                          {manager.state ? (
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
                          {moment(manager.createdAt).format("L")}
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
                                  pathname: "/admin/business/managers/update",
                                  state: {
                                    _id: businessSelected.data
                                      ? businessSelected.data._id
                                      : null,
                                    manager: manager
                                  }
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
                  totalItems={managers ? managers : 0}
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

export default withParamsState(Managers);
