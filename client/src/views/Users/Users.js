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

import UserContext from "../../context/user/userContext";

import CardHeaderTable from "../../components/common/CardHeaderTable";
import NotFoundItems from "../../components/common/NotFoundItems";
import LoadingItems from "../../components/common/LoadingItems";
import PaginationFooter from "../../components/common/PaginationFooter";

moment().locale("es");

const Users = props => {
  const userContext = useContext(UserContext);
  const { users, loading, getUsers, getUsersByRegex, resetUsers } = userContext;

  const [dropdownOpen, setDropDown] = useState(false);
  const [currentItem, setCurrentItem] = useState({
    name: "email",
    value: "Email"
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => () => resetUsers(), []);

  const toggleDropDown = () => {
    setDropDown(!dropdownOpen);
  };

  const onCaptureItem = e => {
    setCurrentItem({ name: e.target.name, value: e.target.value });
  };

  const handleSearchText = e => {
    if (currentItem.name === "email" || currentItem.name === "username") {
      getUsersByRegex(e.target.value, currentItem.name);
    }
  };

  const onRefreshItems = () => {
    getUsers();
  };

  const addItem = e => {
    props.history.push("/admin/users/create");
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems =
    users && users.data
      ? users.data.slice(indexOfFirstItem, indexOfLastItem)
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
            title="Administración de Usuarios"
            description="Listado actual de todos los usuarios con authenticación registrados en el sistema"
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
                name="email"
                value="Nombres"
                onClick={onCaptureItem}
              >
                Email
              </DropdownItem>
              <DropdownItem
                name="username"
                value="Username"
                onClick={onCaptureItem}
              >
                Username
              </DropdownItem>
            </DropdownMenu>
          </CardHeaderTable>
          {loading ? (
            <LoadingItems />
          ) : users && users.data && users.data.length === 0 ? (
            <NotFoundItems />
          ) : (
            <div>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col" className="text-center">
                      Email
                    </th>
                    <th scope="col" className="text-center">
                      Username
                    </th>
                    <th scope="col" className="text-center">
                      Role
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
                  {currentItems.map(user => {
                    return (
                      <tr key={user._id}>
                        <td className="text-center">{user.email}</td>
                        <td className="text-center">{user.username}</td>
                        <td className="text-center">{user.role}</td>
                        <td className="text-center">
                          {user.state ? (
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
                          {moment(user.createdAt).format("L")}
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
                                  pathname: "/admin/users/auth",
                                  state: { _id: user._id }
                                }}
                              >
                                Actualizar Acceso
                              </Link>
                              <Link
                                className="dropdown-item"
                                to={{
                                  pathname: "/admin/users/update",
                                  state: { _id: user._id }
                                }}
                              >
                                Actualizar Datos
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
                  totalItems={users && users.data ? users.data.length : 0}
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

export default Users;
