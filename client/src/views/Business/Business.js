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

import BusinessContext from "../../context/business/businessContext";

import CardHeaderTable from "../../components/common/CardHeaderTable";
import NotFoundItems from "../../components/common/NotFoundItems";
import LoadingItems from "../../components/common/LoadingItems";
import PaginationFooter from "../../components/common/PaginationFooter";

moment().locale("es");

const Business = props => {
  const businessContext = useContext(BusinessContext);
  const {
    business,
    loading,
    getBusiness,
    getBusinessByRegex,
    resetBusiness
  } = businessContext;

  const [dropdownOpen, setDropDown] = useState(false);
  const [currentItem, setCurrentItem] = useState({
    name: "name",
    value: "Nombres"
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    getBusiness();
  }, []);

  useEffect(() => () => resetBusiness(), []);

  const toggleDropDown = () => {
    setDropDown(!dropdownOpen);
  };

  const onCaptureItem = e => {
    setCurrentItem({ name: e.target.name, value: e.target.value });
  };

  const handleSearchText = e => {
    if (currentItem.name === "name") {
      getBusinessByRegex(e.target.value, currentItem.name);
    }
  };

  const onRefreshItems = () => {
    getBusiness();
  };

  const addItem = () => {
    props.history.push("/admin/business/create");
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems =
    business && business.data
      ? business.data.slice(indexOfFirstItem, indexOfLastItem)
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
            title="Administración de Empresas"
            description="Listado actual de todas las empresas registrados en el sistema"
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
              <DropdownItem name="name" value="Nombres" onClick={onCaptureItem}>
                Nombres
              </DropdownItem>
            </DropdownMenu>
          </CardHeaderTable>
          {loading ? (
            <LoadingItems />
          ) : business && business.data && business.data.length === 0 ? (
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
                        <td className="text-center">{item.name}</td>
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
                                  pathname: "/admin/business/managers",
                                  state: { _id: item._id }
                                }}
                              >
                                Ver Trabajadores
                              </Link>
                              <Link
                                className="dropdown-item"
                                to={{
                                  pathname: "/admin/business/update",
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
                    business && business.data ? business.data.length : 0
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

export default Business;
