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

import ChauffeurContext from "../../context/chauffeur/chauffeurContext";

import CardHeaderTable from "../../components/common/CardHeaderTable";
import NotFoundItems from "../../components/common/NotFoundItems";
import LoadingItems from "../../components/common/LoadingItems";
import PaginationFooter from "../../components/common/PaginationFooter";

moment().locale("es");

const Chauffeurs = props => {
  const chauffeurContext = useContext(ChauffeurContext);
  const {
    chauffeurs,
    loading,
    getChauffeurs,
    getChauffeursByRegex,
    resetChauffeurs
  } = chauffeurContext;

  const [dropdownOpen, setDropDown] = useState(false);
  const [currentItem, setCurrentItem] = useState({
    name: "name",
    value: "Nombres"
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    getChauffeurs();
  }, []);

  useEffect(() => () => resetChauffeurs(), []);

  const toggleDropDown = () => {
    setDropDown(!dropdownOpen);
  };

  const onCaptureItem = e => {
    setCurrentItem({ name: e.target.name, value: e.target.value });
  };

  const handleSearchText = e => {
    if (
      currentItem.name === "name" ||
      currentItem.name === "ci" ||
      currentItem.name === "lastname"
    ) {
      getChauffeursByRegex(e.target.value, currentItem.name);
    }
  };

  const onRefreshItems = () => {
    getChauffeurs();
  };

  const addItem = e => {
    props.history.push("/admin/chauffeurs/create");
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems =
    chauffeurs && chauffeurs.data
      ? chauffeurs.data.slice(indexOfFirstItem, indexOfLastItem)
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
            title="Administración de Choferes"
            description="Listado actual de todos los choferes registrados en el sistema"
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
          ) : chauffeurs && chauffeurs.data && chauffeurs.data.length === 0 ? (
            <NotFoundItems />
          ) : (
            <div>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col" className="text-center">
                      C.I.
                    </th>
                    <th scope="col" className="text-center">
                      Nombres
                    </th>
                    <th scope="col" className="text-center">
                      Apellidos
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
                  {currentItems.map(chauffeur => {
                    return (
                      <tr key={chauffeur._id}>
                        <td className="text-center">{chauffeur.ci}</td>
                        <td className="text-center">{chauffeur.name}</td>
                        <td className="text-center">{chauffeur.lastname}</td>
                        <td className="text-center">
                          {chauffeur.state ? (
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
                          {moment(chauffeur.createdAt).format("L")}
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
                                  pathname: "/admin/chauffeurs/details",
                                  state: { chauffeur }
                                }}
                              >
                                Ver Detalles
                              </Link>
                              <Link
                                className="dropdown-item"
                                to={{
                                  pathname: "/admin/chauffeurs/update",
                                  state: { _id: chauffeur._id }
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
                    chauffeurs && chauffeurs.data ? chauffeurs.data.length : 0
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

export default Chauffeurs;
