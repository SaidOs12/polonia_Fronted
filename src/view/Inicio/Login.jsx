// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroup,
  InputGroupText,
  Row,
  Col,
} from "reactstrap";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { iniciarSesion } from "../../api/LoginApi";
import { useState } from "react";
import "../../assets/css/spinner.css";
const Login = () => {

  const navigate = useNavigate();
  // Usa useLocation para obtener la ubicación actual
  const location = useLocation();
  // Analiza los parámetros de búsqueda (query string) de la URL
  const searchParams = new URLSearchParams(location.search);
  const moduloUser = searchParams.get("modulo");
  const [contraseñaIncorrecta, setContraseñaIncorrecta] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [downloading, setDownloading] = useState(false);
  const handelSubmit = (e) => {
    //setDownloading(true);
    //setContraseñaIncorrecta(false);
    e.preventDefault();

    const formData = new FormData(e.target);
    const email = formData.get("email").toUpperCase();
    const password = formData.get("password");

    const usuario = {
      email,
      password,
    };
    //Realizo peticion para iniciar sesion
    setDownloading(true)
    iniciarSesion(usuario)
      .then((response) => response)
      .then((JWT) => {
        console.log(JWT)
        if (JWT.status === 200 && JWT.headers.has("Authorization")) {
          setContraseñaIncorrecta(false);
          const bearerToken = JWT.headers.get("Authorization");
          const token = bearerToken.replace("Bearer ", "");

          const usuario = JSON.parse(JSON.stringify(parseJwt(token)));
          const rol = usuario?.roles[0].nombre?.split("_")[1].toLowerCase();
         // if (moduloUser === rol) {
            localStorage.setItem("token", token);
            localStorage.setItem("data", JSON.stringify(parseJwt(token)));

            localStorage.setItem("modulo", rol);
            navigate("/" + rol + "/index");
            setDownloading(false);
          // } else {
          //   setDownloading(false)
          //   alert("Usuario no autorizado");
          // }
        } else {
          setDownloading(false);
          setContraseñaIncorrecta(true);
          setMensaje("Contraseña o Email incorrecto");

          //eliminarToken();
        }
      })
      .catch((err) => {
        setDownloading(false);
        console.log(err);
      })
      .finally(f=>{
        setDownloading(false)
      })

  };
  function parseJwt(token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  }
  const eliminarToken = () => {
    // Tiempo de expiración del token en milisegundos (1800000 ms = 30 minutos)
    const tiempoExpiracionToken = 1800000;
    setTimeout(() => {
      alert("se acabo su tiempo");
      localStorage.clear();
    }, tiempoExpiracionToken);
  };

  return (
    <>
      <Col lg="5" md="7">
        {downloading && (
          <div className="overlay">
            <div className="spinner " aria-hidden="true"></div>
          </div>
        )}
        <Card className="bg-white shadow  border my-2" color="primary" outline>
          <CardBody className="px-lg-5 py-lg-5">
         
          <h1 className="text-center text-dark">Login</h1>

            <br />
            <Form role="form" onSubmit={handelSubmit}>
              <h3 className="text-center text-dark">Ingrese sus datos para iniciar sesión</h3>
              <FormGroup className="mb-3 mt-3">
                {/* <label
                  className="form-control-label text-dark"
                  htmlFor="nombre"
                >
                  Correo Electronico
                </label> */}
                <InputGroup className="input-group-alternative">
                  <InputGroupText>
                    <i
                      className="fa fa-envelope text-primary"
                      aria-hidden="true"
                    />
                  </InputGroupText>
                  <Input
                    className="text-dark border"
                    placeholder="Correo Electronico"
                    type="text"
                    name="email"
                    required
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                {/* <label
                  className="form-control-label text-dark"
                  htmlFor="nombre"
                >
                  Contraseña
                </label> */}
                <InputGroup className="input-group-alternative">
                  <InputGroupText>
                    <i className="fa fa-lock text-primary" aria-hidden="true" />
                  </InputGroupText>
                  <Input
                    className="text-dark border "
                    placeholder="Contraseña"
                    type="password"
                    autoComplete="new-password"
                    name="password"
                    required
                  />
                </InputGroup>
              </FormGroup>
              {contraseñaIncorrecta && (
                <div
                  className=" text-danger font-bold text-center"
                 
                >
                  {mensaje}
                </div>
              )}
              <div className="text-center">
                <Button
                  className="my-4 text-white fw-bold bg-primary"
                  type="submit"
                >
                  Iniciar sesión
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <Link className="text-dark" to={`/auth/recuperar`}>
              <small className="text-dark h5">¿Olvidaste tu contraseña?</small>
            </Link>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default Login;
{ /* <Nav fill className="text-center align-items-center ">
<NavItem style={{ flex: 1 }}>
  <NavLink active title="CLIENTE">
    <Link to="?modulo=cliente">
      <i className="fa fa-user text-primary" aria-hidden="true" />
      <p className=" h6">CLIENTE</p>
    </Link>

    {moduloUser === "cliente" && (
      <div
        style={{
          position: "relative",
          transform: "translateY(3px)",
        }}
      >
        <MagicTabSelect
          id="underline"
          transition={{ type: "spring", bounce: 0.3 }}
        >
          <div
            style={{
              width: "100%",
              height: "0.15rem",
              backgroundColor: "black",
              position: "absolute",
            }}
          />
        </MagicTabSelect>
      </div>
    )}
  </NavLink>
</NavItem>

<NavItem style={{ flex: 1 }}>
  <NavLink title="ADMINISTRADOR">
    <Link to="?modulo=admin">
      <i
        className="fa fa-id-card text-danger"
        aria-hidden="true"
      />
      <p className=" h6">ADMIN </p>
    </Link>

    {moduloUser === "admin" && (
      <div
        style={{
          position: "relative",
          transform: "translateY(3px)",
        }}
      >
        <MagicTabSelect
          id="underline"
          transition={{ type: "spring", bounce: 0.3 }}
        >
          <div
            style={{
              width: "100%",
              height: "0.15rem",
              backgroundColor: "black",
              position: "absolute",
            }}
          />
        </MagicTabSelect>
      </div>
    )}
  </NavLink>
</NavItem>
<NavItem style={{ flex: 1 }}>
  <NavLink title="MECANICO">
    <Link to="?modulo=mecanico">
      <i className="fa fa-bolt text-yellow" aria-hidden="true" />
      <p className=" h6">MECANICO</p>
    </Link>

    {moduloUser === "mecanico" && (
      <div
        style={{
          position: "relative",
          transform: "translateY(3px)",
        }}
      >
        <MagicTabSelect
          id="underline"
          transition={{ type: "spring", bounce: 0.3 }}
        >
          <div
            style={{
              width: "100%",
              height: "0.15rem",
              backgroundColor: "black",
              position: "absolute",
            }}
          />
        </MagicTabSelect>
      </div>
    )}
  </NavLink>
</NavItem>
<NavItem style={{ flex: 1 }}>
  <NavLink title="OPERADOR">
    <Link to="?modulo=operador">
      <i
        className="fa fa-address-book text-success"
        aria-hidden="true"
      />
      <p className=" h6">OPERADOR</p>
    </Link>

    {moduloUser === "operador" && (
      <div
        style={{
          position: "relative",
          transform: "translateY(3px)",
        }}
      >
        <MagicTabSelect
          id="underline"
          transition={{ type: "spring", bounce: 0.3 }}
        >
          <div
            style={{
              width: "100%",
              height: "0.15rem",
              backgroundColor: "black",
              position: "absolute",
            }}
          />
        </MagicTabSelect>
      </div>
    )}
  </NavLink>
</NavItem>
</Nav> */}