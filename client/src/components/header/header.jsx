import React from "react";
import {
  Nav,
  Navbar,
  NavbarBrand,
  Collapse,
  UncontrolledDropdown,
  DropdownToggle
} from "reactstrap";

import profilephoto from "../../assets/images/users/1.jpg";

/*--------------------------------------------------------------------------------*/
/* Import images which are need for the HEADER                                    */
/*--------------------------------------------------------------------------------*/
import logodarkicon from "../../assets/images/logo-icon.png";
import logolighticon from "../../assets/images/logo-light-icon.png";
import logodarktext from "../../assets/images/logo-text.png";
import logolighttext from "../../assets/images/logo-light-text.png";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.showMobilemenu = this.showMobilemenu.bind(this);
    this.state = {
      isOpen: false
    };
  }
  /*--------------------------------------------------------------------------------*/
  /*To open NAVBAR in MOBILE VIEW                                                   */
  /*--------------------------------------------------------------------------------*/
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  /*--------------------------------------------------------------------------------*/
  /*To open SIDEBAR-MENU in MOBILE VIEW                                             */
  /*--------------------------------------------------------------------------------*/
  showMobilemenu() {
    document.getElementById("main-wrapper").classList.toggle("show-sidebar");
  }

  render() {
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
                <img
                  src={logolighticon}
                  alt="homepage"
                  className="light-logo"
                />
              </b>
              <span className="logo-text">
                <img src={logodarktext} alt="homepage" className="dark-logo" />
                <img
                  src={logolighttext}
                  className="light-logo"
                  alt="homepage"
                />
              </span>
            </NavbarBrand>
            {/*--------------------------------------------------------------------------------*/}
            {/* Mobile View Toggler  [visible only after 768px screen]                         */}
            {/*--------------------------------------------------------------------------------*/}
            <a
              className="nav-toggler d-block d-md-none"
              onClick={this.showMobilemenu}
            >
              <i className="ti-menu ti-close" />
            </a>
          </div>
          <Collapse
            className="navbarbg"
            isOpen={this.state.isOpen}
            navbar
            data-navbarbg="skin6"
          >
            <Nav className="ml-auto float-right" navbar>
              {/*--------------------------------------------------------------------------------*/}
              {/* Start Profile Dropdown                                                         */}
              {/*--------------------------------------------------------------------------------*/}
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret className="pro-pic">
                  <img
                    src={profilephoto}
                    alt="user"
                    className="rounded-circle"
                    width="31"
                  />
                </DropdownToggle>
              </UncontrolledDropdown>
              {/*--------------------------------------------------------------------------------*/}
              {/* End Profile Dropdown                                                           */}
              {/*--------------------------------------------------------------------------------*/}
            </Nav>
          </Collapse>
        </Navbar>
      </header>
    );
  }
}
export default Header;
