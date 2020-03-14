import React, { useState, useContext, useEffect } from "react";
import {
  Container,
  Col,
  Card,
  CardHeader,
  CardBody,
  Row,
  Button,
  Form
} from "reactstrap";

import withParamsState from "../../HOC/withParamsState";

import InputGroup from "../../components/common/InputGroup";
import ConfirmButton from "../../components/common/ConfirmButton";
import ModalConfirmation from "../../components/common/ModalConfirmation";

import UserContext from "../../context/user/userContext";

const UpdateAuth = props => {
  // user Id
  const { _id } = props.location.state;

  const userContext = useContext(UserContext);
  const { error, loading, updateAuthUser, getUser, resetUsers } = userContext;

  const [user, setUser] = useState({
    email: "",
    oldPassword: "",
    password: ""
  });
  const [modal, setModal] = useState(false);

  useEffect(() => {
    getUser(_id);
  }, []);

  useEffect(() => {
    if (!loading && userContext.user && userContext.user.data) {
      setUser({
        ...user,
        email: userContext.user.data.email
      });
    }
  }, [loading]);

  useEffect(() => () => resetUsers(), []);

  const toggleModal = e => {
    e.preventDefault();

    setModal(!modal);
  };

  const handleInput = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = async e => {
    e.preventDefault();

    const formData = {
      email: user.email,
      oldPassword: user.oldPassword,
      password: user.password
    };

    await updateAuthUser(_id, formData, props.history);
  };

  const errorPassword = error && error.password ? error.password : null;
  const errorGlobal = typeof error === "string" ? error : null;

  return (
    <Container className="d-flex justify-content-center">
      <Col xl="8">
        <Card>
          <Form onSubmit={toggleModal}>
            <CardHeader className="bg-white border-0">
              <Row>
                <Col xs="8">
                  <h3 className="mb-0">Actualizar Acceso del Usuario</h3>
                </Col>
                <Col
                  className="d-flex justify-content-end flex-wrap align-items-baseline"
                  xs="4"
                >
                  <ConfirmButton onClick={toggleModal} loading={loading} />
                  <Button
                    onClick={e =>
                      props.history.push({
                        pathname: "/admin/users"
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
                <Col lg="12">
                  <InputGroup
                    disabled={true}
                    label="Email"
                    placeholder=""
                    name="email"
                    value={user.email}
                    onChange={handleInput}
                  />
                </Col>
              </Row>
              <Row>
                <Col lg="6">
                  <InputGroup
                    label="Actual Password *"
                    placeholder=""
                    type="password"
                    name="oldPassword"
                    value={user.oldPassword}
                    onChange={handleInput}
                    error={errorPassword}
                  />
                </Col>
                <Col lg="6">
                  <InputGroup
                    label="Nuevo Password *"
                    placeholder=""
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={handleInput}
                  />
                </Col>
              </Row>
            </CardBody>
          </Form>
        </Card>
      </Col>
      <ModalConfirmation
        title="Confirmar"
        modal={modal}
        toggle={toggleModal}
        onConfirm={onSubmit}
        onClose={toggleModal}
        description="Esta seguro de modificar los datos de autenticación?"
        className="bg-primary"
      />
    </Container>
  );
};

export default withParamsState(UpdateAuth);
