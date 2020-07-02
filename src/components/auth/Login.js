import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import AuthService from "../../services/auth-services";
import "bulma/css/bulma.css";
import Swal from "sweetalert2";

const Login = (props) => {
  const service = new AuthService();
  const history = useHistory();
  const { register, errors, handleSubmit } = useForm();

  const onSubmit = (data) => {
    const phoneNumber = data.phoneNumber;
    const password = data.password;
    service
      .login(phoneNumber, password)
      .then((response) => {
        props.getUser(response);
      })
      .then(() => history.push("/profile"))
      .catch((error) => {
        console.log(error);
        Swal.fire({
          title: "Can't login!",
          text: "Email or password incorrect",
          icon: "error",
          confirmButtonText: "Try again",
        });
      });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)} className="box">
        <div className="field">
          <label className="label">Teléfono</label>
          <div className="control">
            <input
              className="input"
              type="text"
              name="phoneNumber"
              placeholder="5512131415"
              ref={register({
                required: true,
              })}
            />
            {errors.username?.type === "required" && (
              <p className="error-form">Campo requerido</p>
            )}
          </div>
        </div>

        <div className="field">
          <label className="label">Contraseña</label>
          <div className="control">
            <input
              className="input"
              type="password"
              name="password"
              placeholder="***************"
              ref={register({ required: true })}
            />
            {errors.password && <p className="error-form">Campo requerido</p>}
          </div>
        </div>

        <div className="field">
          <div className="control">
            <button className="button is-link is-light" type="submit">
              Iniciar Sesión
            </button>
          </div>
        </div>

        <div className="field">
          <div className="control">
            <p>
              ¿No tienes cuenta?
              <Link to={"/workers/signup"}> Regístrate</Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
