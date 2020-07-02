import React from "react";
import { Link, useHistory } from "react-router-dom";
import "bulma/css/bulma.css";
import AuthService from "../services/auth-services";

const NavBar = (props) => {
  const service = new AuthService();
  const history = useHistory();

  const logoutUser = () => {
    service.logout().then(() => {
      props.getUser(null);
      history.push("/");
    });
  };

  if (props.userInSession) {
    return (
      <div className="container">
        <nav className="navbar" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <a className="navbar-item" href="/">
              <img src="./logo512.png" alt="Prueba" />
            </a>
          </div>

          <div className="navbar-menu">
            <div className="navbar-end">
              <div className="navbar-item">
                <div className="buttons">
                  <button className="button is-danger" onClick={logoutUser}>
                    Cerrar Sesión
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  } else {
    return (
      <div className="container">
        <nav className="navbar" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <a className="navbar-item" href="/">
              <img src="./logo512.png" alt="Ironhack Point of Sale" />
            </a>
          </div>

          <div className="navbar-menu">
            <div className="navbar-end">
              <div className="navbar-item">
                <span className="title is-6">Prestadores de servicios:</span>
              </div>
              <div className="navbar-item">
                <div className="buttons">
                  <Link
                    className="button is-link is-inverted"
                    to="/workers/login"
                  >
                    Iniciar Sesión
                  </Link>
                  <Link className="button is-link" to="/workers/signup">
                    Registro
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
};
export default NavBar;
