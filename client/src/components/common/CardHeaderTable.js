import React from "react";
import { Link } from "react-router-dom";
import {
  CardHeader,
  DropdownToggle,
  InputGroupAddon,
  ButtonDropdown,
  Button,
  Input,
  FormGroup,
  InputGroup
} from "reactstrap";

const CardHeaderTable = props => {
  return (
    <CardHeader className="border-0 d-flex flex-wrap flex-row justify-content-start align-items-center">
      <div className="col d-flex flex-column align-items-center">
        <h3 className="text-center">{props.title}</h3>
        {props.onAddItem instanceof Function && (
          <Button size="sm" color="primary" outline onClick={props.onAddItem}>
            <i className="mdi mdi-shape-square-plus"></i> Nuevo Registro
          </Button>
        )}
        {props.link && props.state && (
          <Link
            className="btn btn-sm btn-outline-primary"
            to={{
              pathname: props.link,
              state: { _id: props.state }
            }}
          >
            <i className="mdi mdi-shape-square-plus"></i> Nuevo Registro
          </Link>
        )}
      </div>
      <h5 className="col text-center">{props.description}</h5>
      <div className="col row justify-content-center m-2">
        <FormGroup className="m-1">
          <Button
            size="sm"
            color="primary"
            outline
            onClick={props.onRefreshItems}
          >
            <i className="mdi mdi-reload"></i>
          </Button>
        </FormGroup>

        <FormGroup className="m-1">
          <InputGroupAddon addonType="prepend">
            <ButtonDropdown
              isOpen={props.dropdownOpen}
              toggle={props.toggleDropDown}
            >
              <DropdownToggle caret color="primary" size="sm">
                <i className="mdi mdi-search-web"></i> {props.currentItem}
              </DropdownToggle>
              {props.children}
            </ButtonDropdown>
          </InputGroupAddon>
        </FormGroup>

        <FormGroup className="m-1">
          <InputGroup className="input-group-alternative">
            <Input
              bsSize="sm"
              type="text"
              placeholder="Buscar"
              onChange={props.handleSearchText}
            />
          </InputGroup>
        </FormGroup>
      </div>
    </CardHeader>
  );
};

export default CardHeaderTable;
