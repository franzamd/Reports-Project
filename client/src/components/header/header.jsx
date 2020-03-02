import React, { useContext } from "react";
import {
  Nav,
  Navbar,
  NavbarBrand,
  Collapse,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu
} from "reactstrap";

import AuthContext from "../../context/auth/authContext";

import profilephoto from "../../assets/images/users/1.jpg";

/*--------------------------------------------------------------------------------*/
/* Import images which are need for the HEADER                                    */
/*--------------------------------------------------------------------------------*/
import logodarkicon from "../../assets/images/logo-icon.png";
import logolighticon from "../../assets/images/logo-light-icon.png";
import logodarktext from "../../assets/images/logo-text.png";
import logolighttext from "../../assets/images/logo-light-text.png";

const Header = () => {
  const authContext = useContext(AuthContext);
  const { user } = authContext;

  const showMobilemenu = () => {
    document.getElementById("main-wrapper").classList.toggle("show-sidebar");
  };

  const logout = e => {
    e.preventDefault();

    authContext.logout();
  };

  const username = user && user.data ? user.data.username : "";

  return (
    <header className="topbar navbarbg" data-navbarbg="skin6">
      <Navbar className="top-navbar" dark expand="md">
        <div className="navbar-header" id="logobg" data-logobg="skin6">
          {/*--------------------------------------------------------------------------------*/}
          {/* Logos Or Icon will be goes here for Light Layout && Dark Layout                */}
          {/*--------------------------------------------------------------------------------*/}
          <NavbarBrand href="/">
            <b className="logo-icon">
              <img src={logodarkicon} alt="homepage" className="dark-logo" />
              <img src={logolighticon} alt="homepage" className="light-logo" />
            </b>
            <span className="logo-text">
              <img src={logodarktext} alt="homepage" className="dark-logo" />
              <img src={logolighttext} className="light-logo" alt="homepage" />
            </span>
          </NavbarBrand>

          {window.innerWidth < 768 && (
            <Nav className="ml-auto float-right" navbar>
              <div className="d-flex align-items-center">{username}</div>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret className="pro-pic">
                  <img
                    src={profilephoto}
                    alt="user"
                    className="rounded-circle"
                    width="31"
                  />
                </DropdownToggle>
                <DropdownMenu right className="user-dd">
                  <DropdownItem href="/" onClick={logout} className="mt-2">
                    <i className="fa fa-power-off mr-1 ml-1" /> Logout
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          )}

          {/*--------------------------------------------------------------------------------*/}
          {/* Mobile View Toggler  [visible only after 768px screen]                         */}
          {/*--------------------------------------------------------------------------------*/}
          <a className="nav-toggler d-block d-md-none" onClick={showMobilemenu}>
            <i className="ti-menu ti-close" />
          </a>
        </div>
        <Collapse
          className="navbarbg"
          isOpen={false}
          navbar
          data-navbarbg="skin6"
        >
          <Nav className="ml-auto float-right" navbar>
            <div className="d-flex align-items-center">{username}</div>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret className="pro-pic">
                <img
                  src={profilephoto}
                  alt="user"
                  className="rounded-circle"
                  width="31"
                />
              </DropdownToggle>
              <DropdownMenu right className="user-dd">
                <DropdownItem href="/" onClick={logout} className="mt-2">
                  <i className="fa fa-power-off mr-1 ml-1" /> Logout
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    </header>
  );
};

export default Header;
